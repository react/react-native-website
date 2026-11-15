/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Forked from: https://github.com/davidtheclark/remark-lint-no-dead-urls

import {type Method, RequestError} from 'got';
import {URL} from 'node:url';
import {lintRule} from 'unified-lint-rule';
import {visit} from 'unist-util-visit';
import {type VFile} from 'vfile';

import {fetch} from './lib.ts';
import type {MDASTNode} from './types.d.ts';

export type Options = {
  baseUrl?: string;
  skipUrlPatterns?: RegExp[];
  headers?: Record<string, string>;
};

const linkCache = new Map();

const HTTP = {
  OK: 200,
  FOUND: 302,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
};

const uri = {
  isLocalhost: (url: string) =>
    /^(https?:\/\/)(localhost|127\.0\.0\.1)(:\d+)?/.test(url),
  isExternal: (url: string) => /(https?:\/\/)/.test(url),
  isPath: (url: string) => /^\/.*/.test(url),
};

async function cacheFetch(urlOrPath: string, method: Method, options: Options) {
  if (linkCache.has(urlOrPath)) {
    return [urlOrPath, linkCache.get(urlOrPath)];
  }

  const {baseUrl, ...other} = options;
  const url = new URL(urlOrPath, baseUrl).toString();

  const code = await fetch(url, method, other);

  linkCache.set(urlOrPath, code);
  return [urlOrPath, code];
}

async function naiveLinkCheck(urls: string[], options: Options) {
  return Promise.allSettled(
    urls.map(async url => {
      try {
        return await cacheFetch(url, 'HEAD', options);
      } catch {
        try {
          // Fallback, some endpoints don't support HEAD requests
          return await cacheFetch(url, 'GET', options);
        } catch (err) {
          if (!(err instanceof RequestError)) {
            throw err;
          }
          const code = err.response?.statusCode ?? err.code;
          linkCache.set(url, code);
          return [url, code];
        }
      }
    })
  );
}

async function noDeadUrls(ast: MDASTNode, file: VFile, options: Options) {
  const urlToNodes = new Map();

  const {skipUrlPatterns, ...clientOptions} = options;

  // Grab all possible urls from the markdown
  visit(ast, ['link', 'image', 'definition'], node => {
    const {url} = node as {url?: string};
    if (
      !url ||
      uri.isLocalhost(url) ||
      skipUrlPatterns?.some(skipPattern => new RegExp(skipPattern).test(url))
    ) {
      return;
    }

    // It only makes sense to consider paths when we know the base url. This is useful for images, or cross
    // references. There might be false positives when adding new pages that aren't already live.
    const isGoodRelativePath = clientOptions.baseUrl && uri.isPath(url);
    const isExternalURL = uri.isExternal(url);
    if (!isExternalURL && !isGoodRelativePath) {
      return;
    }

    if (!urlToNodes.has(url)) {
      urlToNodes.set(url, []);
    }

    urlToNodes.get(url).push(node);
  });

  const results = await naiveLinkCheck([...urlToNodes.keys()], clientOptions);

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const [url, statusCode] = result.value;
      const nodes = urlToNodes.get(url) ?? [];

      if (statusCode === HTTP.OK || statusCode === HTTP.FOUND) {
        continue;
      }

      for (const node of nodes) {
        switch (statusCode) {
          case 'ENOTFOUND':
            file.message(`Link to ${url} is broken, domain not found`, node);
            break;
          case HTTP.TOO_MANY_REQUESTS:
            file.message(`Link to ${url} is being rate limited`, node);
            break;
          case HTTP.NOT_FOUND:
          default:
            file.message(`Link to ${url} is broken`, node);
            break;
        }
      }
    }
  }
}

export default lintRule('remark-lint:no-broken-external-links', noDeadUrls);

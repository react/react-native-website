/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import visit from 'unist-util-visit-parents';
import type {Code} from 'mdast';
import type {Node} from 'unist';

function parseParams(paramString = '') {
  const params = Object.fromEntries(new URLSearchParams(paramString).entries());

  if (!params.platform) {
    params.platform = 'web';
  }

  return params;
}

function attr(name: string, value: string) {
  return {
    type: 'mdxJsxAttribute',
    name,
    value,
  };
}

async function toJsxNode(node: Code) {
  const params = parseParams(node.meta ?? undefined);

  // Gather necessary Params
  const name = params.name || 'Example';
  const description = params.description || 'Example usage';
  const ext = params.ext || 'tsx';
  const filename = `App.${ext}`;
  const files = encodeURIComponent(
    JSON.stringify({
      [filename]: {
        type: 'CODE',
        contents: node.value,
      },
    })
  );
  const dependencies =
    'react-native-safe-area-context' +
    (params.dependencies ? `,${params.dependencies}` : '');
  const platform = params.platform ?? 'web';
  const supportedPlatforms = params.supportedPlatforms ?? 'ios,android,web';
  const theme = params.theme ?? 'light';
  const preview = params.preview ?? 'true';
  const loading = params.loading ?? 'lazy';
  const deviceAppearance = params.deviceAppearance ?? 'light';

  // Need help constructing this AST node?
  // Use the MDX Playground and explore what your output mdast should look like
  // https://mdxjs.com/playground/
  const jsxNode = {
    type: 'mdxJsxTextElement',
    name: 'div',
    attributes: [
      attr('className', 'snack-player'),
      attr('data-snack-name', name),
      attr('data-snack-description', description),
      attr('data-snack-files', files),
      attr('data-snack-dependencies', dependencies),
      attr('data-snack-platform', platform),
      attr('data-snack-supported-platforms', supportedPlatforms),
      attr('data-snack-theme', theme),
      attr('data-snack-preview', preview),
      attr('data-snack-loading', loading),
      attr('data-snack-device-appearance', deviceAppearance),
      attr('data-snack-device-frame', 'false'),
    ],
    children: [],
  };

  // We "replace" the current node by a JSX node
  Object.assign(node, jsxNode as Node);
}

export default function SnackPlayer() {
  return async (tree: Node) => {
    const nodesToProcess: Promise<void>[] = [];
    visit(tree, 'code', (node: Node) => {
      if ('lang' in node && node.lang === 'SnackPlayer') {
        nodesToProcess.push(toJsxNode(node as unknown as Code));
      }
    });
    await Promise.all(nodesToProcess);
  };
}

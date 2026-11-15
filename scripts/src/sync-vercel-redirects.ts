/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dirname, '../..');
const REDIRECTS_PATH = path.join(REPO_ROOT, 'website/static/_redirects');
const VERSIONS_PATH = path.join(REPO_ROOT, 'website/versions.json');
const VERCEL_JSON_PATH = path.join(REPO_ROOT, 'vercel.json');

interface VercelRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

function isPartialSegmentWildcard(source: string): boolean {
  return source.split('/').some(seg => seg.includes('*') && seg !== '*');
}

function expandPartialWildcard(
  source: string,
  destination: string
): VercelRedirect[] {
  const segments = source.split('/');
  const wildcardSeg = segments.find(seg => seg.includes('*') && seg !== '*')!;
  const prefix = wildcardSeg.replaceAll('*', '');

  // Infer docs directory from destination path
  // e.g. /docs/next/legacy/native-modules-:splat → docs/legacy/
  const destDir = destination
    .replace(/^\/docs\/next\//, '')
    .replace(/\/[^/]*$/, '');
  const searchDir = path.join(REPO_ROOT, 'docs', destDir);

  let files: string[];
  try {
    files = fs
      .readdirSync(searchDir)
      .filter(f => f.startsWith(prefix) && /\.mdx?$/.test(f))
      .map(f => f.replace(/\.mdx?$/, ''));
  } catch {
    console.warn(
      `Warning: Could not read ${searchDir} for expanding ${source}`
    );
    return [];
  }

  return files.map(filename => {
    const suffix = filename.slice(prefix.length);
    return {
      source: source.replace(`${prefix}*`, filename),
      destination: destination.replace(':splat', suffix),
      permanent: true,
    };
  });
}

function syncRedirects(): void {
  const latestVersion: string = JSON.parse(
    fs.readFileSync(VERSIONS_PATH, 'utf8')
  )[0];

  const lines = fs.readFileSync(REDIRECTS_PATH, 'utf8').split('\n');
  const redirects: VercelRedirect[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;

    let [source, destination] = parts;

    // Strip full URL sources to path only
    if (source.startsWith('http://') || source.startsWith('https://')) {
      try {
        source = new URL(source).pathname;
      } catch {
        continue;
      }
    }

    // Convert same-domain full URL destinations to relative paths
    if (destination.startsWith('https://reactnative.dev/')) {
      destination = destination.replace('https://reactnative.dev', '');
    }

    // Replace $LATEST_VERSION$ placeholder with actual version
    source = source.replaceAll('$LATEST_VERSION$', latestVersion);
    destination = destination.replaceAll('$LATEST_VERSION$', latestVersion);

    // Handle partial-segment wildcards (e.g., native-modules-*)
    // Vercel doesn't support wildcards within a path segment, so enumerate
    if (isPartialSegmentWildcard(source)) {
      redirects.push(...expandPartialWildcard(source, destination));
      continue;
    }

    // Convert Netlify wildcard syntax to Vercel format
    // Netlify: /* and :splat → Vercel: /:path*
    source = source.replace(/\*$/, ':path*');
    destination = destination.replace(':splat', ':path*');

    redirects.push({source, destination, permanent: true});
  }

  const vercelJson = JSON.parse(fs.readFileSync(VERCEL_JSON_PATH, 'utf8'));
  vercelJson.redirects = redirects;
  fs.writeFileSync(
    VERCEL_JSON_PATH,
    JSON.stringify(vercelJson, null, 2) + '\n'
  );

  console.log(`Synced ${redirects.length} redirects to vercel.json`);
}

syncRedirects();

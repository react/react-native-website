/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Root} from 'mdast';

const LANGUAGES_MAP: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  json: 'JSON',
  objc: 'Objective-C',
  objectivec: 'Objective-C',
  xml: 'XML',
  css: 'CSS',
  cpp: 'C++',
};

const HIDDEN_TITLES = ['zsh', 'sh', 'shell', 'bash', 'powershell'];

function capitalizeFirstLetter(str: string | null) {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

export default function codeblockLanguageAsTitleRemarkPlugin() {
  return async (root: Root) => {
    const {visit} = await import('unist-util-visit');
    visit(root, 'code', node => {
      if (node.lang && !HIDDEN_TITLES.includes(node.lang)) {
        const formattedTitle =
          LANGUAGES_MAP[node.lang] ?? capitalizeFirstLetter(node.lang);
        if (node.meta) {
          if (node.meta.includes('title=')) {
            return;
          }
          node.meta = `title="${formattedTitle}" ${node.meta}`;
        } else {
          node.meta = `title="${formattedTitle}"`;
        }
      }
    });
  };
}

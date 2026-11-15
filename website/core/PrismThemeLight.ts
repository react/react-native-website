/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ThemeConfig} from '@docusaurus/preset-classic';

const theme: ThemeConfig['prism']['theme'] = {
  plain: {
    color: '#24292e',
    backgroundColor: '#f6f8fa',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6a737d',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#24292e',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['keyword', 'attr-name'],
      style: {
        color: '#d73a49',
      },
    },
    {
      types: ['tag', 'operator'],
      style: {
        color: '#22863a',
      },
    },
    {
      types: ['function', 'class-name'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['property', 'selector', 'char', 'builtin', 'url', 'entity'],
      style: {
        color: '#005cc5',
      },
    },
    {
      types: ['number', 'constant', 'symbol', 'boolean'],
      style: {
        color: '#032f62',
      },
    },
    {
      types: ['string', 'regex', 'attr-value'],
      style: {
        color: '#032f62',
      },
    },
    {
      types: ['atrule', 'inserted'],
      style: {
        color: '#22863a',
      },
    },
    {
      types: ['important', 'variable', 'deleted'],
      style: {
        color: '#d73a49',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
  ],
};

export default theme;

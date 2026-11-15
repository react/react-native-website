/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';

import eslintCss from '@eslint/css';
import eslintJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintPluginCasePolice from 'eslint-plugin-case-police';
import * as eslintPluginMdx from 'eslint-plugin-mdx';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginYml from 'eslint-plugin-yml';
import eslintTs from 'typescript-eslint';
import eslintPluginAlex from 'eslint-plugin-alex';

export default defineConfig([
  globalIgnores([
    '**/.yarn',
    '**/node_modules',
    'packages/lint-examples/out',
    'plugins/remark-snackplayer/tests/(markdown|output)',
    'website/.docusaurus',
    'website/build',
    'website/static',
    'README.md',
  ]),

  eslintTs.configs.recommended,
  ...eslintPluginYml.configs['flat/standard'],
  eslintPluginPrettier,

  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        MutationObserver: 'readonly',
      },
    },
  },

  {
    files: ['**/*.{js,mjs,cjs}'],
    ...eslintJs.configs.recommended,
    rules: {
      'no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.{ts,tsx,d.ts}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: 'website/tsconfig.json',
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'es2023',
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    // TODO(simek): figure out SCSS linting, since `@eslint/css` does not support it yet
    // @see https://github.com/eslint/css/issues/90
    files: ['**/*.css'],
    ...eslintCss.configs.recommended,
    language: 'css/css',
    plugins: {
      css: eslintCss,
    },
    rules: {
      'css/no-invalid-properties': [
        'error',
        {
          allowUnknownVariables: true,
        },
      ],
    },
  },

  {
    files: ['**/*.{md,mdx}'],
    ...eslintPluginMdx.flat,
    processor: eslintPluginMdx.createRemarkProcessor({
      lintCodeBlocks: false,
      remarkConfigPath: 'website/.remarkrc.mjs',
    }),
    plugins: {
      alex: eslintPluginAlex,
      'case-police': eslintPluginCasePolice,
    },
    rules: {
      'alex/no-problematic-language': [
        'warn',
        {
          ignore: [
            'CODE_OF_CONDUCT.md',
            // skip older blog posts
            'website/blog/201*',
          ],
          alexOptions: {
            // use a "maybe" level of profanity instead of the default "unlikely"
            profanitySureness: 1,
            allow: [
              // we frequently refer to form props by their name "disabled"
              'invalid',
              // unfortunately "watchman" is a library name that we depend on
              'watchman-watchwoman',
              // ignore rehab rule, Detox is an e2e testing library
              'rehab',
              // host refers to host objects in native code
              'host-hostess',
              // allowing this term to prevent reporting "primitive", which is a programming term
              'savage',
              // allowing this term, since it seems to be used not in insensitive cases
              'straightforward',
              // allowing those terms, since they refer to colors and the surname of one of core contributors
              'black',
              'white',
              // allowing this term, since we use it for expressing gratitude for certain contributors
              'special',
            ],
          },
        },
      ],
      'case-police/string-check': [
        'warn',
        {
          ignore: ['sdk', 'uri'],
          dict: {
            'android studio': 'Android Studio',
            'apple developer': 'Apple Developer',
            avd: 'AVD',
            cocoapods: 'CocoaPods',
            codegen: 'Codegen',
            facebook: 'Facebook',
            hermes: 'Hermes',
            logcat: 'Logcat',
            meta: 'Meta',
            xcode: 'Xcode',
          },
        },
      ],
      // causes false-positive warnings in files with MDX extension
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]);

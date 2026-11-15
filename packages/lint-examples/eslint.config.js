/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import {fixupPluginRules} from '@eslint/compat';
import commentsPlugin from 'eslint-plugin-eslint-comments';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from '@react-native/eslint-plugin';
import reactNativeConfig from '@react-native/eslint-config';
import eslintJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import tsParser from '@typescript-eslint/parser';
import jestPlugin from 'eslint-plugin-jest';

export default defineConfig([
  globalIgnores(['node_modules']),

  eslintPluginPrettier,

  {
    plugins: {
      'eslint-comments': fixupPluginRules(commentsPlugin),
      jest: fixupPluginRules(jestPlugin),
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': fixupPluginRules(reactNativePlugin),
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...reactNativeConfig.globals,
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
    files: ['**/*.{js,jsx}'],
    ...eslintJs.configs.recommended,
    rules: {
      ...reactNativeConfig.rules,
      // Many existing inline styles in examples
      'react-native/no-inline-styles': 'off',
      'no-alert': 'off',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'es2023',
        ecmaFeatures: {
          modules: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);

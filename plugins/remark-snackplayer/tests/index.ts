/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'node:path';
import fs from 'node:fs';
import {remark} from 'remark';
import remarkMdx from 'remark-mdx';
import test from 'tape';

import SnackPlayer from '../src/index.ts';

function read(name: string) {
  return fs.readFileSync(path.join(import.meta.dirname, name), 'utf8');
}

function cleanupStringContent(content: string) {
  return content.replaceAll('\r\n', '\n').trim().replace(/\s+/g, '');
}

test('remark-snackplayer', async t => {
  const processor = remark().use(remarkMdx).use(SnackPlayer);

  const in1 = read('markdown/test1.md');
  const out1 = read('output/output1.html');
  const file1 = await processor.process(in1);
  t.equal(
    cleanupStringContent(String(file1)),
    cleanupStringContent(out1),
    'With 1 Code Block'
  );

  const in2 = read('markdown/test2.md');
  const out2 = read('output/output2.html');
  const file2 = await processor.process(in2);
  t.equal(
    cleanupStringContent(String(file2)),
    cleanupStringContent(out2),
    'With 2 Code Blocks'
  );

  t.end();
});

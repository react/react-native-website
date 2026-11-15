/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import got, {type Method} from 'got';

export async function fetch(url: string, method: Method, options = {}) {
  const {statusCode} = await got(url, {
    ...options,
    method,
    methodRewriting: true,
  });
  return statusCode;
}

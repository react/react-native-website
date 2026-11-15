/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Props} from '@theme/DocRoot/Layout';

import React from 'react';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import OriginalDocRootLayout from '@theme-original/DocRoot/Layout';
import DocsSecondaryNav from '@site/src/components/DocsSecondaryNav';

// Renders a full-width secondary nav above every docs-plugin layout (docs,
// architecture, community, contributing). The sidebar name drives which section
// the nav shows as active.
export default function DocRootLayout(props: Props) {
  const sidebar = useDocsSidebar();
  return (
    <>
      <DocsSecondaryNav sidebarName={sidebar?.name} />
      <OriginalDocRootLayout {...props} />
    </>
  );
}

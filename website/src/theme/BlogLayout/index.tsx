/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Props} from '@theme/BlogLayout';

import React from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import DocsSecondaryNav from '@site/src/components/DocsSecondaryNav';

import styles from './styles.module.css';

// Individual posts live under a dated path; the index, pagination, tags,
// archive and authors routes are the list-style pages that keep the sidebar.
function useIsBlogPost() {
  const {pathname} = useLocation();
  return (
    pathname !== '/blog' &&
    pathname !== '/blog/' &&
    !pathname.startsWith('/blog/page/') &&
    !pathname.startsWith('/blog/tags') &&
    !pathname.startsWith('/blog/archive') &&
    !pathname.startsWith('/blog/authors')
  );
}

// Ejected from @docusaurus/theme-classic to render the shared secondary nav
// full-width below the main navbar, above the blog content.
export default function BlogLayout(props: Props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const isBlogPost = useIsBlogPost();
  // Individual posts drop the recent-posts sidebar and center their content.
  const showSidebar = !isBlogPost && sidebar && sidebar.items.length > 0;

  let mainClassName;
  if (isBlogPost) {
    mainClassName = clsx('col', styles.blogPostMain);
  } else if (showSidebar) {
    mainClassName = clsx('col', 'col--7');
  } else {
    mainClassName = clsx('col', 'col--9', 'col--offset-1');
  }

  return (
    <Layout {...layoutProps}>
      <DocsSecondaryNav />
      <div className="container margin-vert--lg">
        <div className="row">
          {showSidebar && <BlogSidebar sidebar={sidebar} />}
          <main className={mainClassName}>{children}</main>
          {toc && <div className={clsx('col', styles.tocColumn)}>{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}

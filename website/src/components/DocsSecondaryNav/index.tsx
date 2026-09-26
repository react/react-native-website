/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import DocsVersionDropdownNavbarItem from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import CopyPageButton from 'docusaurus-plugin-copy-page-button/react';

import styles from './styles.module.css';

type SectionLink = {label: string; to: string};

// The section dropdown mirrors the navbar "Docs" dropdown; read its entries from
// the site config so the two can't drift.
function useSectionLinks(): readonly SectionLink[] {
  const {siteConfig} = useDocusaurusContext();
  const navbar = siteConfig.themeConfig.navbar as {
    items?: ReadonlyArray<{
      type?: string;
      label?: string;
      items?: SectionLink[];
    }>;
  };
  return (
    navbar.items?.find(
      item => item.type === 'dropdown' && item.label === 'Docs'
    )?.items ?? []
  );
}

// Guides, Components and APIs all share the /docs/ URL space, so the active
// section is read from the current doc's sidebar rather than the pathname.
const SECTION_BY_SIDEBAR: Record<string, string> = {
  docs: 'Guides',
  components: 'Components',
  api: 'APIs',
  architecture: 'Architecture',
};

type Section = {
  title: string;
  // The active entry to show on the dropdown toggle, or null to hide the
  // dropdown entirely (sections outside the Docs area).
  activeSectionLink: string | null;
  // A "return to index" link shown to the right of the heading, or null.
  backLink: {label: string; href: string} | null;
  showCopyButton: boolean;
};

function getSection(
  pathname: string,
  sidebarName: string | undefined
): Section {
  if (pathname.startsWith('/blog')) {
    // The index and pagination are the blog listing itself; tags, archive,
    // authors and individual posts all link back to it via "All posts".
    const isBlogIndex =
      pathname === '/blog' ||
      pathname === '/blog/' ||
      pathname.startsWith('/blog/page/');
    // Copy page is only meaningful on an individual post, not on the listing or
    // the other list-style blog routes (tags, archive, authors).
    const isBlogPost =
      !isBlogIndex &&
      !pathname.startsWith('/blog/tags') &&
      !pathname.startsWith('/blog/archive') &&
      !pathname.startsWith('/blog/authors');
    return {
      title: 'Blog',
      activeSectionLink: null,
      backLink: isBlogIndex ? null : {label: 'All posts', href: '/blog'},
      showCopyButton: isBlogPost,
    };
  }
  if (pathname.startsWith('/community')) {
    return {
      title: 'Community',
      activeSectionLink: null,
      backLink: null,
      showCopyButton: true,
    };
  }
  if (pathname.startsWith('/contributing')) {
    return {
      title: 'Contributing',
      activeSectionLink: null,
      backLink: null,
      showCopyButton: true,
    };
  }
  if (pathname.startsWith('/releases') || pathname.startsWith('/versions')) {
    // The releases docs and the standalone /versions listing share a "Releases"
    // heading. Copy page applies to the releases docs, not the versions list.
    return {
      title: 'Releases',
      activeSectionLink: null,
      backLink: null,
      showCopyButton: pathname.startsWith('/releases'),
    };
  }
  // Docs area (main docs + architecture): the active section follows the doc's
  // sidebar (Guides / Components / APIs / Architecture).
  return {
    title: 'Docs',
    activeSectionLink: sidebarName
      ? (SECTION_BY_SIDEBAR[sidebarName] ?? null)
      : null,
    backLink: null,
    showCopyButton: true,
  };
}

function SectionDropdown({
  activeLabel,
  links,
}: {
  activeLabel: string;
  links: readonly SectionLink[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onDocumentClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        'dropdown',
        'dropdown--hoverable',
        styles.dropdown,
        open && 'dropdown--show'
      )}>
      <button
        type="button"
        className={styles.dropdownToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}>
        {activeLabel}
      </button>
      <ul className="dropdown__menu">
        {links.map(link => (
          <li key={link.to}>
            <Link
              className={clsx(
                'dropdown__link',
                link.label === activeLabel && 'dropdown__link--active'
              )}
              to={link.to}
              onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DocsSecondaryNav({
  sidebarName,
}: {
  sidebarName?: string;
}) {
  const {pathname} = useLocation();
  const sectionLinks = useSectionLinks();
  const {title, activeSectionLink, backLink, showCopyButton} = getSection(
    pathname,
    sidebarName
  );
  // The docs version dropdown belongs to the main docs; it self-hides elsewhere.
  const {activeVersion, activeDoc} = useActiveDocContext('default');
  const showVersionDropdown = Boolean(activeDoc);
  const isNextVersion = activeVersion?.name === 'current';

  return (
    <nav className={styles.secondaryNav} aria-label="Documentation sections">
      <div className={styles.start}>
        <span className={styles.title}>{title}</span>
        {activeSectionLink && (
          <SectionDropdown
            activeLabel={activeSectionLink}
            links={sectionLinks}
          />
        )}
        {showVersionDropdown && (
          <div
            className={styles.versionDropdown}
            data-version-next={isNextVersion || undefined}>
            <DocsVersionDropdownNavbarItem
              docsPluginId="default"
              mobile={false}
              dropdownActiveClassDisabled
              dropdownItemsBefore={[]}
              dropdownItemsAfter={[{to: '/versions', label: 'All versions'}]}
            />
          </div>
        )}
        {backLink && (
          <Link className={styles.backLink} to={backLink.href}>
            <svg
              className={styles.backChevron}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {backLink.label}
          </Link>
        )}
      </div>
      <div className={styles.end}>
        {showCopyButton && (
          <CopyPageButton
            customStyles={{
              container: {className: styles.copyPageContainer},
              button: {className: styles.copyPageButton},
              dropdown: {className: styles.copyPageDropdown},
            }}
          />
        )}
      </div>
      <div className={styles.secondaryNavDivider} />
    </nav>
  );
}

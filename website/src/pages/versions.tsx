/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {PropSidebar} from '@docusaurus/plugin-content-docs';

import {DocsSidebarProvider} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocRootLayout from '@theme/DocRoot/Layout';
import Layout from '@theme/Layout';

import versions from '../../versions.json';
// The versionsArchived mapping is a custom feature, NOT a Docusaurus feature
import versionsArchived from '../../versionsArchived.json';

const VersionItem = ({
  version,
  archivedDocumentationUrl,
  currentVersion,
}: {
  version: string;
  currentVersion: string;
  archivedDocumentationUrl?: string;
}) => {
  const versionName = version === 'next' ? 'main' : version;

  const isCurrentVersion = currentVersion === version;
  const isNext = version === 'next';
  const isRC = version.toUpperCase().indexOf('-RC') !== -1;

  const latestMajorVersion = versions[0].toUpperCase().replace('-RC', '');

  const documentationUrl = useBaseUrl(
    archivedDocumentationUrl ??
      `/docs/${isCurrentVersion ? '' : version + '/'}getting-started`
  );
  const documentationLink = <a href={documentationUrl}>Documentation</a>;

  let releaseNotesURL = 'https://github.com/react/react-native/releases';
  let releaseNotesTitle = 'Changelog';
  if (isNext) {
    releaseNotesURL = `https://github.com/react/react-native/compare/${latestMajorVersion}-stable...main`;
    releaseNotesTitle = 'Commits since ' + latestMajorVersion;
  } else if (!isRC) {
    releaseNotesURL = `https://github.com/react/react-native/releases/tag/v${version}.0`;
  }

  const releaseNotesLink = <a href={releaseNotesURL}>{releaseNotesTitle}</a>;

  return (
    <tr>
      <th>{versionName}</th>
      <td>{documentationLink}</td>
      <td>{releaseNotesLink}</td>
    </tr>
  );
};

// Mirrors the `releases` sidebar in sidebarsReleases.ts so the /versions page
// (a standalone React page, not a doc) renders the same sidebar. Keep in sync.
const releasesSidebar: PropSidebar = [
  {type: 'link', href: '/releases/overview', label: 'Overview'},
  {type: 'link', href: '/releases/branches', label: 'Branches'},
  {
    type: 'link',
    href: '/releases/versioning-policy',
    label: 'Versioning Policy',
  },
  {type: 'link', href: '/versions', label: 'Docs Versions'},
];

const Versions = () => {
  const currentVersion = versions.length > 0 ? versions[0] : null;
  const latestVersions = ['next'].concat(
    versions.filter(version => version.indexOf('-RC') !== -1)
  );
  const stableVersions = versions.filter(
    version => version.indexOf('-RC') === -1 && version !== currentVersion
  );

  return (
    <Layout title="Versions">
      <DocsSidebarProvider name="releases" items={releasesSidebar}>
        <DocRootLayout>
          <div className="versions-page">
            <h1>Docs Versions</h1>
            <h2>Next version (Unreleased)</h2>
            <p>
              Ahead of each stable release, React Native publishes a series of
              release candidates. Learn more about the{' '}
              <a href="/releases/overview#release-channels">release channels</a>
              .
            </p>
            <div className="table-wrapper">
              <table className="versions">
                <tbody>
                  {latestVersions.map(version => (
                    <VersionItem
                      key={'version_' + version}
                      version={version}
                      currentVersion={currentVersion}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <h2>Latest version</h2>
            <div className="table-wrapper">
              <table className="versions">
                <tbody>
                  <VersionItem
                    key={'version_' + currentVersion}
                    version={currentVersion}
                    currentVersion={currentVersion}
                  />
                </tbody>
              </table>
            </div>
            <h2>Previous versions</h2>
            <div className="table-wrapper">
              <table className="versions">
                <tbody>
                  {stableVersions.map(version => (
                    <VersionItem
                      key={'version_' + version}
                      version={version}
                      currentVersion={currentVersion}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <h3>Archived versions</h3>
            <p>
              The documentation for unmaintained versions can be found on
              website archive snapshots, hosted as separate sites.
            </p>
            <div className="table-wrapper">
              <table className="versions">
                <tbody>
                  {Object.entries(versionsArchived).map(
                    ([version, archivedDocumentationUrl]) => (
                      <VersionItem
                        key={'version_' + version}
                        version={version}
                        archivedDocumentationUrl={archivedDocumentationUrl}
                        currentVersion={currentVersion}
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>
            <p>
              The documentation for versions below <code>0.60</code> can be
              found on the separate website called{' '}
              <a href="https://archive.reactnative.dev/versions">
                React Native Archive
              </a>
              .
            </p>
          </div>
        </DocRootLayout>
      </DocsSidebarProvider>
    </Layout>
  );
};

export default Versions;

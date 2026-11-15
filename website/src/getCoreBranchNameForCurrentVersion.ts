import {useActiveVersion} from '@docusaurus/plugin-content-docs/client';

export function getCoreBranchNameForCurrentVersion() {
  const version = useActiveVersion(undefined);
  return version.label === 'Next' ? 'main' : `v${version.label}.0`;
}

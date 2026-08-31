import {useActiveVersion} from '@docusaurus/plugin-content-docs/client';

export function getCurrentVersion() {
  const version = useActiveVersion(undefined);
  if (!version || version.label === 'Next') {
    return 'latest';
  }
  return /^\d+\.\d+$/.test(version.label)
    ? `${version.label}.0`
    : version.label;
}

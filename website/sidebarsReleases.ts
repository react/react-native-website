import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

export default {
  releases: [
    'overview',
    'branches',
    'versioning-policy',
    {
      type: 'link',
      label: 'Docs Versions',
      href: '/versions',
    },
  ],
} satisfies SidebarsConfig;

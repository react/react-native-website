import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import type {Props} from '@theme/Icon/ExternalLink';

import styles from './styles.module.css';

export default function IconExternalLink({
  width = 13.5,
  height = 13.5,
}: Props): ReactNode {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 256 256"
      aria-label={translate({
        id: 'theme.IconExternalLink.ariaLabel',
        message: '(opens in new tab)',
        description: 'The ARIA label for the external link icon',
      })}
      className={styles.iconExternalLink}>
      <line
        x1="64"
        y1="192"
        x2="192"
        y2="64"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="88 64 192 64 192 168"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

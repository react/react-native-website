/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useEffect, useState} from 'react';

import CallstackWordmark from '@site/static/img/showcase/callstack_wordmark.svg';
import ExpoWordmark from '@site/static/img/showcase/expo-wordmark.svg';
import InfiniteRedWordmark from '@site/static/img/showcase/infinite-red-wordmark.svg';
import MicrosoftWordmark from '@site/static/img/showcase/microsoft-wordmark.svg';
import SWMWordmark from '@site/static/img/showcase/swm-wordmark.svg';
import {PartnerLink} from '@site/src/types';

import styles from './styles.module.css';

const PARTNERS = [
  {
    href: 'https://callstack.com/',
    name: 'Callstack',
    logo: <CallstackWordmark aria-hidden />,
  },
  {
    href: 'https://expo.dev/',
    name: 'Expo',
    className: styles.expo,
    logo: <ExpoWordmark aria-hidden />,
  },
  {
    href: 'https://infinite.red/',
    name: 'Infinite Red',
    logo: <InfiniteRedWordmark aria-hidden />,
  },
  {
    href: 'https://www.microsoft.com/',
    name: 'Microsoft',
    logo: <MicrosoftWordmark aria-hidden />,
  },
  {
    href: 'https://swmansion.com/',
    name: 'Software Mansion',
    logo: <SWMWordmark aria-hidden />,
  },
];

export default function PartnersShowcase() {
  const [partners, setPartners] = useState<PartnerLink[]>(PARTNERS);

  useEffect(() => {
    setPartners(currentCompanies => shuffleItems(currentCompanies));
  }, []);

  return (
    <div className={styles.partnersContainer}>
      {partners.map(({href, name, className, logo}) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          aria-label={name}>
          {logo}
        </a>
      ))}
    </div>
  );
}

function shuffleItems(apps: PartnerLink[]) {
  return [...apps].sort(() => 0.5 - Math.random());
}

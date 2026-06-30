/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Community() {
  const {siteConfig} = useDocusaurusContext();
  const apps = Object.values(siteConfig.customFields.users)
    .flat()
    .filter(app => app.pinned);

  return (
    <Section>
      <SectionTitle
        title="Meta supported. Community driven."
        description={
          <>
            React Native is being used in thousands of apps, but it's likely
            <br />
            you've already used it in one of these apps.
          </>
        }
      />
      <div className={styles.featureContainer}>
        <ul className={styles.appList}>
          {apps.map((app, i) => {
            const imgSource = !app.icon.startsWith('http')
              ? useBaseUrl('img/showcase/' + app.icon)
              : app.icon;
            return (
              <li key={i} className="item">
                {app.infoLink ? (
                  <a
                    href={app.infoLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={imgSource} alt={app.name} />
                  </a>
                ) : (
                  <img src={imgSource} alt={app.name} />
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <a href={useBaseUrl(`showcase`)} className={styles.secondaryButton}>
        See all featured apps
      </a>
      <div className={styles.communityNote}>
        <p>
          Meta released React Native in 2015 and has been maintaining it ever
          since. Today, React Native is supported by contributions from
          individuals and companies around the world including{' '}
          <span>
            <a
              href="https://callstack.com/"
              target="_blank"
              rel="noopener noreferrer">
              Callstack
            </a>
          </span>
          ,{' '}
          <span>
            <a
              href="https://expo.dev/"
              target="_blank"
              rel="noopener noreferrer">
              Expo
            </a>
          </span>
          ,{' '}
          <a
            href="https://infinite.red/"
            target="_blank"
            rel="noopener noreferrer">
            Infinite Red
          </a>
          ,{' '}
          <a
            href="https://www.microsoft.com/"
            target="_blank"
            rel="noopener noreferrer">
            Microsoft
          </a>{' '}
          and{' '}
          <a
            href="https://swmansion.com/"
            target="_blank"
            rel="noopener noreferrer">
            Software Mansion
          </a>
          . If you're interested in learning more, check out{' '}
          <a
            href="https://github.com/react/react-native/blob/main/ECOSYSTEM.md"
            target="_blank"
            rel="noopener noreferrer">
            how we have structured the ecosystem
          </a>
          .
        </p>
        <p>
          Our community is always shipping exciting new projects and expanding
          beyond Android and iOS with initiatives like{' '}
          <a
            href="https://microsoft.github.io/react-native-windows/"
            target="_blank"
            rel="noopener noreferrer">
            React Native Windows
          </a>
          ,{' '}
          <a
            href="https://microsoft.github.io/react-native-macos/"
            target="_blank"
            rel="noopener noreferrer">
            React Native macOS
          </a>{' '}
          and{' '}
          <a
            href="https://necolas.github.io/react-native-web/"
            target="_blank"
            rel="noopener noreferrer">
            React Native Web
          </a>
          .
        </p>
      </div>
    </Section>
  );
}

export default Community;

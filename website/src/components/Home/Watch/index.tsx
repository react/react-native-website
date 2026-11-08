/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useState} from 'react';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

enum VideoId {
  Why = 'wUDeLT6WXnQ',
  Keynote2025 = 'NiYwlvXsBKw',
  Keynote2024 = 'Q5SMmKb7qVI',
  FB2019 = 'NCAY0HIfrwc',
}

function Watch() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <Section>
      <SectionTitle
        title="Watch and learn"
        description={
          <>
            Watch talks by the React team and learn how to get the most out of
            React Native.
            <br />
            Find the latest on{' '}
            <a href="https://bsky.app/profile/reactnative.dev">
              Bluesky
            </a> and <a href="https://x.com/reactnative">X</a>.
          </>
        }
      />
      <div className={styles.videos}>
        <div
          role="button"
          aria-label="Play: Why React Native?"
          className={[
            styles.videoContainer,
            playingId === VideoId.Why
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.Why)}>
          {playingId === VideoId.Why ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.Why}?autoplay=1`}
              title="Explain Like I'm 5: React Native"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.Why}/maxresdefault.jpg`}
              alt="Explain Like I'm 5: React Native"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>Why React Native?</h4>
            <p>1:42</p>
          </div>
        </div>
        <div
          role="button"
          aria-label="Play: React Conf 2025 React Native Keynote"
          className={[
            styles.videoContainer,
            playingId === VideoId.Keynote2025
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.Keynote2025)}>
          {playingId === VideoId.Keynote2025 ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.Keynote2025}?autoplay=1`}
              title="React Conf 2025 React Native Keynote"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.Keynote2025}/maxresdefault.jpg`}
              alt="React Conf 2025 React Native Keynote"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>
              React Conf 2025
              <br />
              React Native Keynote
            </h4>
            <p>55:13</p>
          </div>
        </div>
        <div
          role="button"
          aria-label="Play: React Conf 2024 React Native Keynote"
          className={[
            styles.videoContainer,
            playingId === VideoId.Keynote2024
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.Keynote2024)}>
          {playingId === VideoId.Keynote2024 ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.Keynote2024}?autoplay=1`}
              title="React Conf 2024 React Native Keynote"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.Keynote2024}/maxresdefault.jpg`}
              alt="React Conf 2024 React Native Keynote"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>
              React Conf 2024
              <br />
              React Native Keynote
            </h4>
            <p>55:14</p>
          </div>
        </div>
        <div
          role="button"
          aria-label="Play: FB 2019: Mobile innovation with React Native"
          className={[
            styles.videoContainer,
            playingId === VideoId.FB2019
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.FB2019)}>
          {playingId === VideoId.FB2019 ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.FB2019}?autoplay=1`}
              title="Mobile Innovation with React Native, ComponentKit, and Litho"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.FB2019}/maxresdefault.jpg`}
              alt="Mobile Innovation with React Native, ComponentKit, and Litho"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>
              FB 2019
              <br />
              Mobile innovation with React Native
            </h4>
            <p>45:29</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Watch;

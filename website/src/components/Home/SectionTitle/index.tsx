/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ReactNode} from 'react';

import styles from './styles.module.css';

type Props = {
  title: string;
  description?: ReactNode;
};

function SectionTitle({title, description}: Props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}

export default SectionTitle;

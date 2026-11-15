import React from 'react';
import clsx from 'clsx';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import type {Props} from '@theme/Admonition';

const {info: Info} = DefaultAdmonitionTypes;

function ImportantAdmonition({className, ...rest}: Props) {
  return <Info className={clsx(className, 'alert--important')} {...rest} />;
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  important: ImportantAdmonition,
};

export default AdmonitionTypes;

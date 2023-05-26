import React, { ReactNode } from 'react';

import styles from './index.module.css';

type TextProps = {
  className?: string;
  children: ReactNode;
  classNameOverride?: string;
  style?: React.CSSProperties;
};

export const Text: React.FC<TextProps> = ({
  children,
  className = '',
  classNameOverride = undefined,
  style = {},
}) => {
  return (
    <span
      className={`${
        classNameOverride ? classNameOverride : styles.base
      } ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};

export const H2: React.FC<TextProps> = props => (
  <Text
    //@ts-ignore
    classNameOverride={styles.h2}
    {...props}
  />
);

export const H3: React.FC<TextProps> = props => (
  <Text
    //@ts-ignore
    classNameOverride={styles.h3}
    {...props}
  />
);

export const H4: React.FC<TextProps> = props => (
  <Text
    //@ts-ignore
    classNameOverride={styles.h4}
    {...props}
  />
);

export const Regular16: React.FC<TextProps> = props => (
  <Text
    //@ts-ignore
    classNameOverride={styles['regular-16']}
    {...props}
  />
);

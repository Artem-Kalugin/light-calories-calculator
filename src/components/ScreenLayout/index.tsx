import React from 'react';

import styles from './index.module.css';

const ScreenLayout: React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> = ({ children, className = '' }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${className}`}>{children}</div>
    </div>
  );
};

export default ScreenLayout;

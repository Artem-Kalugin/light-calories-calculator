import React from 'react';

import { Text } from '#ui-kit/Text';

import styles from './index.module.css';

const Input: React.FC<
  Partial<{
    className: string;
    classNameWrapper: string;
    label: string;
    value: string | number;
    onChange: (val: string) => void;
    iconLeftSource: string;
    iconLeft: React.ReactNode;
    iconRightSource: string;
    iconRight: React.ReactNode;
    placeholder: string;
  }>
> = ({
  placeholder,
  value,
  iconLeft,
  iconLeftSource,
  iconRight,
  onChange = () => {},
  iconRightSource,
  classNameWrapper = '',
  className = '',
  label = 'label',
}) => {
  return (
    <div className={`${styles.wrapper} ${classNameWrapper}`}>
      <Text>{label}</Text>
      <div className={`${styles.container} ${className}`}>
        {(iconLeftSource || iconLeft) && (
          <div className={styles.iconContainer}>
            {iconLeft}
            {iconLeftSource && (
              <img
                className={styles.icon}
                src={iconLeftSource}
              />
            )}
          </div>
        )}
        <input
          className={`${styles.input}`}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {(iconRightSource || iconRight) && (
          <div className={styles.iconContainerLeft}>
            {iconRight}
            {iconRightSource && (
              <img
                className={styles.icon}
                src={iconRightSource}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

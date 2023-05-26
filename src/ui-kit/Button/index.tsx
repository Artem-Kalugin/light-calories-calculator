import React from 'react';

import Icon, { IconNames } from '#ui-kit/Icon';
import { Text } from '#ui-kit/Text';

import styles from './index.module.css';

const Button: React.FC<
  React.PropsWithChildren<{
    className?: string;
    onPress?: () => void;
    label: string;
    iconName?: IconNames;
  }>
> = ({ onPress = () => {}, label = 'Добавить', iconName }) => {
  return (
    <div
      className={styles.add}
      onClick={onPress}
    >
      {iconName && (
        <Icon
          className={styles.plus}
          name={iconName}
        />
      )}
      <Text>{label}</Text>
    </div>
  );
};

export default Button;

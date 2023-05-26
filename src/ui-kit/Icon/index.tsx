import React from 'react';

const iconsFiles = {
  /* PLOP_INJECT_KEY */
  calories: require('../../assets/icons/calories.png'),
  list: require('../../assets/icons/clipboard.png'),
  carbs: require('../../assets/icons/carbs.png'),
  save: require('../../assets/icons/save.png'),
  eye: require('../../assets/icons/eye.png'),
  close: require('../../assets/icons/close.png'),
  fats: require('../../assets/icons/fats.png'),
  plus: require('../../assets/icons/plus.png'),
  proteins: require('../../assets/icons/proteins.png'),
};

export type IconNames = keyof typeof iconsFiles;

interface IIcon {
  size: number;
  width: number;
  height: number;
  color: string;
  className: string;
  style: React.CSSProperties;
  name: IconNames;
}

const Icon: React.FC<Partial<IIcon>> = ({
  size = 16,
  width = size,
  height = size,
  name = 'close',
  className = '',
  style = {},
}) => {
  return (
    <img
      className={className}
      src={iconsFiles[name]}
      style={{ ...style, width, height }}
    />
  );
};

export default React.memo(Icon);

import React from 'react';
import { SvgProps } from 'react-native-svg';
import { scale, verticalScale } from '../helpers/dimentions';
import { COLORS } from '../utils/colorConstant';
import { SVG_URL, IconName } from '../utils/imageUrl';

type SvgIconsProps = SvgProps & {
  name: IconName;
  width?: number;
  height?: number;
  fill?: string;
};

const SvgIcon: React.FC<SvgIconsProps> = ({
  name,
  width = verticalScale(100),
  height = scale(100),
  fill = COLORS.white,

  ...props
}) => {
  const IconComponent = SVG_URL[name];
  if (!IconComponent) {
    console.log(`No SVG icon found with name "${name}`);
    return null;
  }
  return <IconComponent width={width} height={height} fill={fill} {...props} />;
};

export type IconNameType = keyof typeof SVG_URL;
export default SvgIcon;

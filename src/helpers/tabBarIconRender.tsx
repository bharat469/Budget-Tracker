import { StyleSheet } from 'react-native';
import React from 'react';
import SvgIcon from '../components/svgComponent';
import { NavigationConstant } from '../utils/navConstant';
import { COLORS } from '../utils/colorConstant';
import { scale, verticalScale } from './dimentions';
import { BarChartIcon } from '../assets/svg/tabBar/barChart';

interface TabBarProps {
  isFocused: boolean;
  iconName: string;
}

const TabBarIconRender: React.FC<TabBarProps> = ({
  isFocused = false,
  iconName = '',
}) => {
  const commonProps = {
    width: scale(34),
    height: verticalScale(34),
  };

  const fillColor = isFocused
    ? COLORS.cardGreenColor
    : COLORS.shadesOfGrey.tabColor;

  switch (iconName) {
    case NavigationConstant.HOME_SCREEN:
      return <SvgIcon name="homeBarIcon" fill={fillColor} {...commonProps} />;

    case NavigationConstant.STATISTICS_SCREEN:
      return <BarChartIcon fillColor={fillColor} {...commonProps} />;

    case NavigationConstant.TRANSACTIONS_SCREEN:
      return <SvgIcon name="goalBarIcon" fill={fillColor} {...commonProps} />;

    case NavigationConstant.PROFILE_SCREEN:
      return (
        <SvgIcon name="profileBarIcon" fill={fillColor} {...commonProps} />
      );

    default:
      return null; // 👈 safe fallback
  }
};

export default TabBarIconRender;

const styles = StyleSheet.create({});

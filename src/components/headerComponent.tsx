import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import SvgIcon, { IconNameType } from './svgComponent';
import { moderateScale, scale, verticalScale } from '../helpers/dimentions';
import { COLORS } from '../utils/colorConstant';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resetAll } from '../helpers/redux/slice/authSlice';

interface HeaderComponentProps {
  headerTiltle: string;
  isShowRightIcon?: boolean;
  headerType?: 'default' | 'auth' | 'home';
  rightIconName?: IconNameType;
  onBackPress?: () => void;
  onRightPress?: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  headerTiltle = 'default',
  isShowRightIcon = false,
  headerType = 'default',
  rightIconName = 'downloadIcon',
  onBackPress,
  onRightPress,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
      dispatch(resetAll());
    }
  };

  return (
    <View style={styles.headerView}>
      {/* Left Chevron (Back Button) */}
      <TouchableOpacity onPress={handleBackPress} activeOpacity={0.7}>
        <SvgIcon
          name="leftChevronIcon"
          width={scale(28)}
          height={verticalScale(28)}
          fill={COLORS.primaryColor}
        />
      </TouchableOpacity>

      {/* Title (Always Centered) */}
      <Text style={styles.headerText}>{headerTiltle}</Text>

      {/* Right Icon Placeholder (Keeps Layout Balanced) */}
      <View style={styles.rightIconWrapper}>
        {isShowRightIcon && (
          <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
            <SvgIcon
              name={rightIconName}
              width={scale(32)}
              height={verticalScale(32)}
              fill={COLORS.primaryColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(22),
    marginVertical: verticalScale(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  headerText: {
    fontSize: moderateScale(18),
    color: COLORS.black,
    fontWeight: '600',
  },
  rightIconWrapper: {
    width: scale(28), // reserve space for icon even if hidden
    height: verticalScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

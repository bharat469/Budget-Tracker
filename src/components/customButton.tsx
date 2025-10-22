import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../helpers/dimentions';
import { COLORS } from '../utils/colorConstant';

interface buttonType {
  btnTitleName: string;
  onPress?: () => void;
  customStyle?: any;
  TextStyle?: any;
}

const CustomButton: React.FC<buttonType> = ({
  btnTitleName = 'Default',
  onPress,
  customStyle,
  TextStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btnContainer, customStyle]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#69AEA9', '#3F8782']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient}
      >
        <View style={styles.buttonStyle}>
          <Text style={[styles.btnTextStyle, TextStyle]}>{btnTitleName}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: moderateScale(32),
  },
  buttonStyle: {
    padding: moderateScale(16),
  },
  buttonGradient: {
    alignItems: 'center',
    borderRadius: moderateScale(22),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  btnTextStyle: {
    fontSize: moderateScale(18),
    color: COLORS.white,
    fontWeight: '600',
  },
});

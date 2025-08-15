import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { moderateScale, verticalScale } from './dimentions';
import { COLORS } from '../utils/colorConstant';

interface dividerWithTextProps {
  textTitle: string;
}

const DividerWithText: React.FC<dividerWithTextProps> = ({
  textTitle = '',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{textTitle}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default DividerWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(22),
  },
  line: {
    flex: 1,
    height: verticalScale(2),
    backgroundColor: COLORS.lightGreen,
  },
  text: {
    marginHorizontal: 10,
    color: COLORS.primaryColor,
    fontSize: moderateScale(14),
  },
});

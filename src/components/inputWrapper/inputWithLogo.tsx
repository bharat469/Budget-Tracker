import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import SvgIcon from '../svgComponent';
import { moderateScale } from '../../helpers/dimentions';
import { COLORS } from '../../utils/colorConstant';
import { scale, verticalScale } from '../../helpers/dimentions';
import { KeyboardType } from '../../utils/typeConfig';
import { IconName } from '../../utils/imageUrl';
import { EXPENSE_DETAIL } from '../../utils/staticArray';

interface InputWithLogo {
  placeHolder?: string;
  onChangeText: (text: string) => void;
  value: string;
  containerStyle?: any;
  placeHolderColor?: string;
  keyBoardType?: KeyboardType;
  inputStyle?: any;
  errorMessage?: string;
  svgSelectedName?: (text: IconName) => void;
}

const InputWithLogoScreen: React.FC<InputWithLogo> = ({
  placeHolder = 'Enter Expenses',
  onChangeText,
  value,
  containerStyle,
  keyBoardType = 'default',
  placeHolderColor = COLORS.black,
  inputStyle,
  errorMessage = '',
  svgSelectedName,
}) => {
  const [svgIconName, setsvgIconName] = useState<IconName>('defaultIcon');
  const _handleChangeText = (text: string) => {
    onChangeText(text);

    const lower = text.toLowerCase();
    let matched = EXPENSE_DETAIL.find(item =>
      item.keywords.some(k => lower.includes(k)),
    );

    const iconName = matched ? matched.icon : 'defaultIcon';

    if (svgSelectedName) {
      svgSelectedName(iconName);
    }

    setsvgIconName(iconName);
  };

  return (
    <View style={containerStyle}>
      <View style={styles.containerDefaultStyle}>
        <SvgIcon
          name={svgIconName}
          width={scale(30)}
          height={verticalScale(30)}
          style={{ flex: 0.2, marginHorizontal: 6 }}
        />
        <TextInput
          value={value}
          onChangeText={_handleChangeText}
          placeholder={placeHolder}
          placeholderTextColor={placeHolderColor}
          keyboardType={keyBoardType}
          style={[styles.inputDefaultStyle, inputStyle]}
        />
      </View>
      {errorMessage.length !== 0 && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputWithLogoScreen;

const styles = StyleSheet.create({
  containerDefaultStyle: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(22),
    borderColor: COLORS.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputDefaultStyle: {
    padding: moderateScale(12),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
  },
  errorMessage: {
    textAlign: 'center',
    paddingVertical: verticalScale(6),
    marginHorizontal: scale(22),
    fontSize: moderateScale(14),
    color: COLORS.red,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

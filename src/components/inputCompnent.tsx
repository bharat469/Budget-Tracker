import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../helpers/dimentions';
import { COLORS } from '../utils/colorConstant';
import { EyeIcon } from '../assets/svg/eyeOpen';
import { EyeOffIcon } from '../assets/svg/eyeClose';
import { KeyboardType } from '../utils/typeConfig';
import { formatCurrency } from '../utils/helperFunction';

interface InputProps {
  placeHolder?: string;
  onChangeText: (text: string) => void;
  value: string;
  inputStyle?: any;
  containerStyle?: any;
  secureEntry?: boolean;
  isShowLeftIcon?: boolean;
  placeHolderColor?: string;
  errorMessage?: string;
  inputView?: any;
  keyBoardType?: KeyboardType;
  isPhoneNumber?: boolean;
  countryCode?: string;
  isCurrencyUsed?: boolean;
}

const InputCompnent: React.FC<InputProps> = ({
  placeHolder,
  onChangeText,
  value,
  inputStyle,
  containerStyle,
  secureEntry = false,
  isShowLeftIcon = false,
  placeHolderColor = COLORS.black,
  errorMessage = '',
  inputView,
  keyBoardType = 'default',
  isPhoneNumber = false,
  countryCode = 'INR',
  isCurrencyUsed = false,
}) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const _handleEyeIcon = () => {
    setShow(!show);
    inputRef.current?.focus();
  };

  const handleChangeText = (text: string) => {
    if (isCurrencyUsed) {
      const formatted = formatCurrency(text, countryCode);
      onChangeText(formatted);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={inputView}>
      <View style={[styles.containerDefaultStyle, containerStyle]}>
        {isPhoneNumber && <Text style={styles.inititalText}>+91</Text>}
        <TextInput
          ref={inputRef}
          placeholder={placeHolder}
          value={value}
          onChangeText={handleChangeText}
          style={[styles.inputDefaultStyle, inputStyle]}
          secureTextEntry={secureEntry && !show}
          placeholderTextColor={placeHolderColor}
          keyboardType={keyBoardType}
        />
        {isShowLeftIcon && (
          <TouchableOpacity onPress={_handleEyeIcon} style={{ flex: 0.1 }}>
            {show ? (
              <EyeOffIcon
                size={moderateScale(22)}
                color={COLORS.primaryColor}
              />
            ) : (
              <EyeIcon size={moderateScale(22)} color={COLORS.primaryColor} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage.length !== 0 && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputCompnent;

const styles = StyleSheet.create({
  containerDefaultStyle: {
    borderWidth: 1,
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(22),
    borderColor: COLORS.primaryColor,
  },
  inputDefaultStyle: {
    padding: moderateScale(12),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.black,
  },
  errorMessage: {
    textAlign: 'center',
    paddingTop: verticalScale(6),
    marginHorizontal: scale(22),
    fontSize: moderateScale(14),
    color: COLORS.red,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  inititalText: {
    fontSize: moderateScale(18),
    marginHorizontal: scale(4),
    fontWeight: '700',
    color: COLORS.black,
  },
});

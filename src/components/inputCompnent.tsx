import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { moderateScale, SCREEN } from '../helpers/dimentions';
import { COLORS } from '../utils/colorConstant';
import { EyeIcon } from '../assets/svg/eyeOpen';
import { EyeOffIcon } from '../assets/svg/eyeClose';

interface InputProps {
  placeHolder?: string;
  onChangeText: (text: string) => void;
  value: string;
  inputStyle?: any;
  containerStyle?: any;
  secureEntry?: boolean;
  isShowLeftIcon?: boolean;
  placeHolderColor?: string;
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
}) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const _handleEyeIcon = () => {
    setShow(!show);
    inputRef.current?.focus();
  };
  return (
    <View style={[styles.containerDefaultStyle, containerStyle]}>
      <TextInput
        ref={inputRef}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.inputDefaultStyle, inputStyle]}
        secureTextEntry={secureEntry && !show}
        placeholderTextColor={placeHolderColor}
      />
      {isShowLeftIcon && (
        <TouchableOpacity onPress={_handleEyeIcon} style={{ flex: 0.1 }}>
          {show ? (
            <EyeOffIcon size={moderateScale(22)} color={COLORS.primaryColor} />
          ) : (
            <EyeIcon size={moderateScale(22)} color={COLORS.primaryColor} />
          )}
        </TouchableOpacity>
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
});

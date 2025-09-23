import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../utils/colorConstant';

interface OTPInputProps {
  length?: number;
  onChangeOTP?: (otp: string) => void;
}

export interface OTPInputRef {
  clear: () => void;
  focus: () => void;
}



const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(
  ({ length = 6, onChangeOTP }, ref) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputsRef = useRef<TextInput[]>([]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setOtp(Array(length).fill(''));
        inputsRef.current[0]?.focus();
      },
      focus: () => {
        inputsRef.current[0]?.focus();
      },
    }));

    const handleChange = (text: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      onChangeOTP?.(newOtp.join(''));

      // Move to next input if a digit is entered
      if (text && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    // This is the new function to handle backspace
    const handleKeyPress = ({ nativeEvent: { key } }: any, index: number) => {
      // If the pressed key is backspace and the current input is empty,
      // move the focus to the previous input.
      if (key === 'Backspace' && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    };

    return (
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={input => {
              if (input) inputsRef.current[index] = input;
            }}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            style={styles.input}
            maxLength={1}
            keyboardType="number-pad"
            textAlign="center"
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 10,
    fontSize: 18,
    color: COLORS.black,
  },
});

export default OTPInput;

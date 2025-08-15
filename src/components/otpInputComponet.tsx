import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

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

      // Move to next
      if (text && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      // Backspace to previous
      if (!text && index > 0) {
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
  },
});

export default OTPInput;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { COLORS } from '../../utils/colorConstant';
import OTPInput, { OTPInputRef } from '../../components/otpInputComponet';
import CustomButton from '../../components/customButton';

const ForgetPassword = () => {
  const [email, setEmail] = useState('joshibharat469@gmail.com');
  const otpRef = useRef<OTPInputRef>(null);
  const [otpTimer, setTimer] = useState(60);

  useEffect(() => {
    if (otpTimer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [otpTimer]);

  function handleResend(): void {
    otpRef.current?.clear(); // clear OTP and auto focus first input
    setTimer(60); // restart timer
  }

  return (
    <AuthWrappers
      isSvgShow={true}
      svgIconName="mailSentSvgIcon"
      isShowHeading={false}
      svgContainerStyle={styles.authWrapperCustomStyle}
      showHeader
    >
      <View style={styles.otpContainer}>
        <Text style={styles.headerText} numberOfLines={1}>
          {STRING_CONFIG.authScreenString.forgetPasswordHeaderText}
        </Text>
        <Text
          style={[styles.headerText, styles.subHeading]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {email}
        </Text>
        <OTPInput
          length={6}
          ref={otpRef}
          onChangeOTP={otp => console.log('Entered OTP:', otp)}
        />
        {/* Timer & Resend */}
        <View style={styles.timerWrapper}>
          {otpTimer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.counter}>{otpTimer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.timerText, { fontSize: moderateScale(16) }]}>
                if you didn't receive a code?
                <Text style={styles.resendText}> Resend OTP</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomButton
          btnTitleName="Verify Otp"
          customStyle={{ marginVertical: verticalScale(12) }}
        />
      </View>
    </AuthWrappers>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  authWrapperCustomStyle: {
    marginVertical: verticalScale(23),
  },
  headerText: {
    textAlign: 'center',
    marginHorizontal: scale(22),
    fontSize: moderateScale(16),
    color: COLORS.black,
    fontWeight: '600',
  },
  otpContainer: {
    marginTop: verticalScale(22),
  },
  subHeading: {
    color: COLORS.shadesOfGrey.greyOne,
  },
  timerWrapper: {
    alignItems: 'center',
    marginVertical: moderateScale(12),
  },
  timerText: {
    color: COLORS.black,
    fontSize: moderateScale(18),
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  counter: {
    color: COLORS.red,
    fontWeight: '700',
  },
  resendText: {
    color: COLORS.red,
    fontWeight: '700',
  },
});

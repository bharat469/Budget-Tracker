import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { COLORS } from '../../utils/colorConstant';
import OTPInput, { OTPInputRef } from '../../components/otpInputComponet';
import CustomButton from '../../components/customButton';

const ForgetPassword = () => {
  const [email, setEmail] = useState('joshibharat469@gmail.com');
  const otpRef = useRef<OTPInputRef>(null);
  return (
    <AuthWrappers
      isSvgShow={true}
      svgIconName="mailSentSvgIcon"
      isShowHeading={false}
      svgContainerStyle={styles.authWrapperCustomStyle}
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
});

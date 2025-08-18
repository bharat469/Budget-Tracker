import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { STRING_CONFIG } from '../../utils/stringConfig';
import InputCompnent from '../../components/inputCompnent';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import CustomButton from '../../components/customButton';
import { isValidEmail } from '../../helpers/validationsHook';
import { NavigationConstant } from '../../utils/navConstant';
import { COLORS } from '../../utils/colorConstant';

const ForgetPasswordEmail = (props: any) => {
  const [email, setEmail] = useState('');

  const _handleEmailClick = (email: string) => {
    let validateEmail = isValidEmail(email);
    if (validateEmail) {
      props.navigation.navigate(NavigationConstant.FORGOT_PASSWORD_SCREEN, {
        email: email,
      });
    } else {
      console.log('error');
    }
  };

  return (
    <AuthWrappers
      isSvgShow
      svgIconName="emailConfirmIcon"
      isShowHeading={false}
      showHeader
    >
      <View style={styles.forgetEmailView}>
        <View style={styles.otpContainer}>
          <Text style={styles.headerText} numberOfLines={1}>
            {STRING_CONFIG.forgetPasswordString.headerOne}
          </Text>
          <Text
            style={[styles.headerText, styles.subHeading]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {STRING_CONFIG.forgetPasswordString.headerTwo}
          </Text>
        </View>
        <InputCompnent
          value={email}
          onChangeText={text => setEmail(text)}
          placeHolder={STRING_CONFIG.basicInfoString.emailAddress}
        />
        <CustomButton
          btnTitleName={STRING_CONFIG.forgetPasswordString.mailSent}
          customStyle={{ marginTop: verticalScale(22) }}
          onPress={() => _handleEmailClick(email)}
        />
      </View>
    </AuthWrappers>
  );
};

export default ForgetPasswordEmail;

const styles = StyleSheet.create({
  forgetEmailView: {
    marginVertical: verticalScale(22),
  },
  headerText: {
    textAlign: 'center',
    marginHorizontal: scale(22),
    fontSize: moderateScale(16),
    color: COLORS.black,
    fontWeight: '600',
  },
  subHeading: {
    color: COLORS.shadesOfGrey.greyOne,
  },
  otpContainer: {
    marginBottom: verticalScale(22),
  },
});

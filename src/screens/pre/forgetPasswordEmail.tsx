import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { STRING_CONFIG } from '../../utils/stringConfig';
import InputCompnent from '../../components/inputCompnent';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import CustomButton from '../../components/customButton';
import {
  isEmptyCheck,
  isValidEmail,
  isValidPhoneNumber,
} from '../../helpers/validationsHook';
import { NavigationConstant } from '../../utils/navConstant';
import { COLORS } from '../../utils/colorConstant';
import { useFocusEffect } from '@react-navigation/native';

const ForgetPasswordEmail = (props: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      setError('');
      setPhoneNumber('');
      return () => {};
    }, []),
  );

  const _handlePhoneClick = (phoneNumber: string) => {
    if (isEmptyCheck(phoneNumber)) {
      setError(STRING_CONFIG.errorText.emptyError);
    } else if (isValidPhoneNumber(phoneNumber)) {
      props.navigation.navigate(NavigationConstant.FORGOT_PASSWORD_SCREEN, {
        phoneNumber: phoneNumber,
      });
    } else {
      setError(STRING_CONFIG.errorText.phoneError);
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
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          placeHolder={STRING_CONFIG.basicInfoString.phoneNumber}
          keyBoardType="phone-pad"
          errorMessage={error}
        />
        <CustomButton
          btnTitleName={STRING_CONFIG.forgetPasswordString.mailSent}
          customStyle={{ marginTop: verticalScale(22) }}
          onPress={() => _handlePhoneClick(phoneNumber)}
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

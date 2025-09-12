import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { STRING_CONFIG } from '../../utils/stringConfig';
import InputCompnent from '../../components/inputCompnent';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import CustomButton from '../../components/customButton';
import { PHONE_NUMBER_SCHEMA } from '../../helpers/validationsHook';
import { NavigationConstant } from '../../utils/navConstant';
import { COLORS } from '../../utils/colorConstant';

import { useValidation } from '../../helpers/yupAdapter';

const ForgetPasswordEmail = (props: any) => {
  const formik = useValidation({
    initialValues: { phoneNumber: '' },
    validationSchema: PHONE_NUMBER_SCHEMA,
    onSubmit: values => {
      // props.navigation.navigate(NavigationConstant.FORGOT_PASSWORD_SCREEN, {
      //   phoneNumber: values.phoneNumber,
      // });
    },
  });

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
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange('phoneNumber')}
          placeHolder={STRING_CONFIG.basicInfoString.phoneNumber}
          keyBoardType="phone-pad"
          errorMessage={
            formik.touched.phoneNumber ? formik.errors.phoneNumber || '' : ''
          }
        />
        <CustomButton
          btnTitleName={STRING_CONFIG.forgetPasswordString.mailSent}
          customStyle={{ marginTop: verticalScale(22) }}
          onPress={formik.handleSubmit}
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

import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { moderateScale, verticalScale } from '../../helpers/dimentions';
import { COLORS } from '../../utils/colorConstant';
import InputCompnent from '../../components/inputCompnent';
import CustomButton from '../../components/customButton';
import { useValidation } from '../../helpers/yupAdapter';
import { REGISTER_SCHEMA } from '../../helpers/validationsHook';
import { useDispatch, useSelector } from 'react-redux';
import { registerWithEmailPassword } from '../../helpers/redux/slice/authSlice';
import { NavigationConstant } from '../../utils/navConstant';
import { RootState } from '../../helpers/redux/store';
import { startUserData } from '../../helpers/redux/slice/userSlice';

const RegisterScreen = (props: any) => {
  const dispatch = useDispatch();
  const { imageUrl } = useSelector((state: RootState) => state.userData);
  const formik = useValidation({
    initialValues: { name: '', Email: '', password: '', confirmPassword: '' },
    validationSchema: REGISTER_SCHEMA,
    onSubmit: values => {
      if (values.password === values.confirmPassword) {
        const data = {
          name: values.name,
          email: values.Email,
          password: values.password,
          profilePic: imageUrl,
          isVerified: false,
          isFirstTime: false,
        };
        dispatch(startUserData(data));
        props.navigation.navigate(NavigationConstant.BLOCKED_SCREEN);
      } else {
        formik.setFieldError('confirmPassword', 'Passwords do not match');
      }
    },
  });

  return (
    <AuthWrappers
      isSvgShow={true}
      svgIconName="registerSvgIcon"
      headingText={STRING_CONFIG.RegisterScreenString.RegisterHeading}
      showHeader
      headerTitle="Register Screen"
    >
      <View style={styles.textView}>
        <Text style={styles.headerText}>
          {STRING_CONFIG.RegisterScreenString.RegisterSubHeading}
        </Text>
      </View>
      <InputCompnent
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        placeHolder={STRING_CONFIG.basicInfoString.fullName}
        errorMessage={formik.touched.name ? formik.errors.name : ''}
        containerStyle={{ marginTop: verticalScale(12) }}
      />
      <InputCompnent
        value={formik.values.Email}
        onChangeText={formik.handleChange('Email')}
        placeHolder={STRING_CONFIG.basicInfoString.emailAddress}
        errorMessage={formik.touched.Email ? formik.errors.Email : ''}
        containerStyle={{ marginTop: verticalScale(12) }}
      />
      <InputCompnent
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeHolder={STRING_CONFIG.basicInfoString.password}
        errorMessage={formik.touched.password ? formik.errors.password : ''}
        containerStyle={{ marginTop: verticalScale(12) }}
      />
      <InputCompnent
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        placeHolder={STRING_CONFIG.basicInfoString.confirmPassword}
        containerStyle={{ marginTop: verticalScale(12) }}
        errorMessage={
          formik.touched.confirmPassword ? formik.errors.confirmPassword : ''
        }
      />
      <CustomButton
        btnTitleName={STRING_CONFIG.RegisterScreenString.RegisterBtnText}
        customStyle={{ marginVertical: verticalScale(12) }}
        onPress={formik.handleSubmit}
      />
    </AuthWrappers>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  headerText: {
    fontSize: moderateScale(22),
    color: COLORS.black,
    fontWeight: '700',
    marginBottom: moderateScale(6),
    letterSpacing: 0.6,
  },
  textView: {
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
});

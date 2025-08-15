import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { moderateScale, verticalScale } from '../../helpers/dimentions';
import { COLORS } from '../../utils/colorConstant';
import InputCompnent from '../../components/inputCompnent';
import CustomButton from '../../components/customButton';

const RegisterScreen = (props: any) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    Email: '',
    password: '',
    confirmPassword: '',
  });
  return (
    <AuthWrappers
      isSvgShow={true}
      svgIconName="registerSvgIcon"
      headingText={STRING_CONFIG.RegisterScreenString.RegisterHeading}
    >
      <View style={styles.textView}>
        <Text style={styles.headerText}>
          {STRING_CONFIG.RegisterScreenString.RegisterSubHeading}
        </Text>
      </View>
      <InputCompnent
        value={registerData.name}
        onChangeText={text => setRegisterData({ ...registerData, name: text })}
        placeHolder={STRING_CONFIG.basicInfoString.fullName}
        containerStyle={{ marginVertical: moderateScale(12) }}
      />
      <InputCompnent
        value={registerData.name}
        onChangeText={text => setRegisterData({ ...registerData, name: text })}
        placeHolder={STRING_CONFIG.basicInfoString.emailAddress}
        containerStyle={{ marginVertical: moderateScale(12) }}
      />
      <InputCompnent
        value={registerData.name}
        onChangeText={text => setRegisterData({ ...registerData, name: text })}
        placeHolder={STRING_CONFIG.basicInfoString.password}
        containerStyle={{ marginVertical: moderateScale(12) }}
      />
      <InputCompnent
        value={registerData.name}
        onChangeText={text => setRegisterData({ ...registerData, name: text })}
        placeHolder={STRING_CONFIG.basicInfoString.confirmPassword}
        containerStyle={{ marginVertical: moderateScale(12) }}
      />
      <CustomButton
        btnTitleName={STRING_CONFIG.RegisterScreenString.RegisterBtnText}
        customStyle={{ marginVertical: verticalScale(12) }}
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

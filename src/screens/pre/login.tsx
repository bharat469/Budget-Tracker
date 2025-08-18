import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import InputCompnent from '../../components/inputCompnent';
import { moderateScale, verticalScale, scale } from '../../helpers/dimentions';
import CustomButton from '../../components/customButton';
import { COLORS } from '../../utils/colorConstant';
import { STRING_CONFIG } from '../../utils/stringConfig';
import DividerWithText from '../../helpers/dividerWithText';
import SvgIcon from '../../components/svgComponent';
import { NavigationConstant } from '../../utils/navConstant';

const Login = (props: any) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const _handleChangeText = () => {};

  return (
    <AuthWrappers isSvgShow={true}>
      <View style={styles.innerView}>
        <View style={styles.textView}>
          <Text style={styles.headerText}>
            {STRING_CONFIG.authScreenString.welcomeText}
          </Text>
          <Text style={styles.subText}>
            {STRING_CONFIG.authScreenString.welcomeSubText}
          </Text>
        </View>
        <InputCompnent
          placeHolder={STRING_CONFIG.basicInfoString.emailAddress}
          value={loginData.email}
          onChangeText={(data: string) =>
            setLoginData({ ...loginData, email: data })
          }
          containerStyle={styles.inputContainerStyle}
        />
        <InputCompnent
          placeHolder={STRING_CONFIG.basicInfoString.password}
          value={loginData.password}
          onChangeText={(data: string) =>
            setLoginData({ ...loginData, password: data })
          }
          secureEntry={true}
          isShowLeftIcon={true}
          containerStyle={styles.passwordContainer}
          inputStyle={{ flex: 1 }}
        />
        <CustomButton
          btnTitleName={STRING_CONFIG.authScreenString.siginBtnText}
          customStyle={styles.buttonStyle}
        />
        <View>
          <TouchableWithoutFeedback
            onPress={() =>
              props.navigation.navigate(
                NavigationConstant.FORGOT_PASSWORD_EMAIL_SCREEN,
              )
            }
          >
            <Text style={styles.forgetText}>
              {STRING_CONFIG.authScreenString.forgetPasswordText}
            </Text>
          </TouchableWithoutFeedback>

          <DividerWithText
            textTitle={STRING_CONFIG.authScreenString.footerText}
          />
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.socialContainer}>
              <SvgIcon
                name="goggleSvgIcon"
                width={scale(30)}
                height={verticalScale(30)}
              />
              <Text style={styles.socialText}>
                {STRING_CONFIG.authScreenString.goggleText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialContainer}>
              <SvgIcon
                name="facebookSvgIcon"
                width={scale(30)}
                height={verticalScale(30)}
              />
              <Text style={styles.socialText}>
                {STRING_CONFIG.authScreenString.FaceBookText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthWrappers>
  );
};

export default Login;

const styles = StyleSheet.create({
  innerView: {
    // alignItems: 'center',
  },
  inputContainerStyle: {
    marginVertical: moderateScale(22),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    marginVertical: moderateScale(22),
  },
  textView: {
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
  headerText: {
    fontSize: moderateScale(22),
    color: COLORS.black,
    fontWeight: '700',
    marginBottom: moderateScale(6),
    letterSpacing: 0.6,
  },
  subText: {
    fontSize: moderateScale(16),
    color: COLORS.shadesOfGrey.greyOne,
    fontWeight: '500',
    marginBottom: moderateScale(6),
    letterSpacing: 0.3,
  },
  forgetText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    marginBottom: verticalScale(12),
    color: COLORS.shadesOfGrey.greyOne,
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(12),
    borderColor: COLORS.lightGreen,
    marginTop: verticalScale(22),
  },
  socialText: {
    fontSize: moderateScale(16),
    marginLeft: moderateScale(6),
    color: COLORS.primaryColor,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});

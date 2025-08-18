import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import InputCompnent from '../../components/inputCompnent';
import { moderateScale, verticalScale, scale } from '../../helpers/dimentions';
import CustomButton from '../../components/customButton';
import { COLORS } from '../../utils/colorConstant';
import { STRING_CONFIG } from '../../utils/stringConfig';
import DividerWithText from '../../helpers/dividerWithText';
import SvgIcon from '../../components/svgComponent';
import { NavigationConstant } from '../../utils/navConstant';
import BottomSheetComponent from '../../components/bottomSheetComponent';
import {
  isEmptyCheck,
  isValidEmail,
  isValidPassword,
} from '../../helpers/validationsHook';
import { useFocusEffect } from '@react-navigation/native';

const Login = (props: any) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isShowModal, setShowModal] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: '',
    emptyError: '',
  });

  useFocusEffect(
    useCallback(() => {
      setError({
        email: '',
        password: '',
        emptyError: '',
      });

      setLoginData({
        email: '',
        password: '',
      });

      return () => {};
    }, []),
  );

  const _handleOnCancelModal = () => {
    setShowModal(!isShowModal);
  };
  const _handleOnSubmit = (loginData: any) => {
    let { email, password } = loginData;

    if (isEmptyCheck(email) || isEmptyCheck(password)) {
      setShowModal(true);
      return;
    }

    if (!isValidEmail(email)) {
      setError({
        email: STRING_CONFIG.errorText.emailError,
        password: '',
        emptyError: '',
      });
      return;
    }

    if (!isValidPassword(password)) {
      setError({
        email: '',
        password: STRING_CONFIG.errorText.passwordError,
        emptyError: '',
      });
      return;
    }

    // ✅ Clear all errors
    setError({
      email: '',
      password: '',
      emptyError: '',
    });

    console.log('Form submitted ✅', loginData);
  };

  return (
    <>
      <AuthWrappers isSvgShow={true}>
        <View>
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
            inputView={styles.inputContainerStyle}
            errorMessage={error.email}
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
            errorMessage={error.password}
          />
          <CustomButton
            btnTitleName={STRING_CONFIG.authScreenString.siginBtnText}
            customStyle={styles.buttonStyle}
            onPress={() => _handleOnSubmit(loginData)}
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
      <BottomSheetComponent
        isVisible={isShowModal}
        onBackdropPress={_handleOnCancelModal}
      >
        <View style={styles.bottomSheetView}>
          <TouchableWithoutFeedback onPress={_handleOnCancelModal}>
            <Text style={styles.closeText}>X</Text>
          </TouchableWithoutFeedback>
          <View style={styles.content}>
            <SvgIcon
              name="errorIcon"
              width={scale(200)}
              height={verticalScale(200)}
            />
            <View style={styles.contentView}>
              <Text style={styles.messageText}>
                {STRING_CONFIG.modalText.errorNetworkModal.headerOne}
              </Text>
              <Text style={styles.messageSubText}>
                {STRING_CONFIG.modalText.errorNetworkModal.headerTwo}
              </Text>
            </View>
          </View>
          <CustomButton
            btnTitleName={STRING_CONFIG.modalText.errorNetworkModal.btnText}
            customStyle={{ marginVertical: verticalScale(22) }}
            onPress={_handleOnCancelModal}
          />
        </View>
      </BottomSheetComponent>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
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
  bottomSheetView: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(20),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeText: {
    alignSelf: 'flex-end',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.primaryColor,
  },
  content: {
    alignItems: 'center',
  },
  messageText: {
    fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: '700',
    textAlign: 'center',
  },
  messageSubText: {
    fontSize: moderateScale(20),
    color: COLORS.shadesOfGrey.greyOne,
    fontWeight: '700',
    textAlign: 'center',
  },
  contentView: {
    marginVertical: verticalScale(16),
  },
});

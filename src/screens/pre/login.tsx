import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { LOGIN_SCHEMA } from '../../helpers/validationsHook';
import { useDispatch, useSelector } from 'react-redux';
import { useValidation } from '../../helpers/yupAdapter';
import {
  loginWithEmailPassword,
  resetAll,
} from '../../helpers/redux/slice/authSlice';
import { RootState } from '../../helpers/redux/store';

const Login = (props: any) => {
  const dispatch = useDispatch();
  const formik = useValidation({
    initialValues: { email: '', password: '' },
    validationSchema: LOGIN_SCHEMA,
    onSubmit: values => {
      dispatch(loginWithEmailPassword(values));
    },
  });

  const { error } = useSelector((state: RootState) => state.auth);

  const [isShowModal, setShowModal] = useState(false);

  const _handleOnCancelModal = () => {
    setShowModal(!isShowModal);
    dispatch(resetAll());
  };

  useEffect(() => {
    setShowModal(!!error); // will show modal if error is not null/empty
  }, [error]);

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
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            inputView={styles.inputContainerStyle}
            errorMessage={formik.touched.email ? formik.errors.email || '' : ''}
            keyBoardType="email-address"
          />

          <InputCompnent
            placeHolder={STRING_CONFIG.basicInfoString.password}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            secureEntry={true}
            isShowLeftIcon={true}
            containerStyle={styles.passwordContainer}
            inputStyle={{ flex: 1 }}
            errorMessage={
              formik.touched.password ? formik.errors.password || '' : ''
            }
          />
          <CustomButton
            btnTitleName={STRING_CONFIG.authScreenString.siginBtnText}
            customStyle={styles.buttonStyle}
            onPress={formik.handleSubmit as any}
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
            <Text
              style={[styles.forgetText, { marginVertical: verticalScale(12) }]}
            >
              {STRING_CONFIG.authScreenString.signUpText}
              <TouchableWithoutFeedback
                onPress={() =>
                  props.navigation.navigate(
                    NavigationConstant.PROFILE_PICTURE_SCREEN,
                  )
                }
              >
                <Text style={styles.siginUpView}>
                  {STRING_CONFIG.authScreenString.siginUpButton}
                </Text>
              </TouchableWithoutFeedback>
            </Text>
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
    marginVertical: moderateScale(12),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    marginVertical: moderateScale(12),
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
    textTransform: 'capitalize',
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
    fontSize: moderateScale(18),
    color: COLORS.red,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginVertical: verticalScale(8),
  },
  contentView: {
    marginVertical: verticalScale(16),
    marginHorizontal: scale(12),
  },
  siginUpView: {
    color: COLORS.primaryColor,
  },
});

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
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import CustomButton from '../../components/customButton';
import { COLORS } from '../../utils/colorConstant';
import { STRING_CONFIG } from '../../utils/stringConfig';
import DividerWithText from '../../helpers/dividerWithText';
import SvgIcon from '../../components/svgComponent';
import { NavigationConstant } from '../../utils/navConstant';
import BottomSheetComponent from '../../components/bottomSheetComponent';
import { PHONE_NUMBER_SCHEMA } from '../../helpers/validationsHook';
import { useDispatch, useSelector } from 'react-redux';
import { useValidation } from '../../helpers/yupAdapter';
import {
  FacebookSiginStart,
  googleSiginStart,
  loginWithPhoneNumber,
  resetAll,
} from '../../helpers/redux/slice/authSlice';
import { RootState } from '../../helpers/redux/store';
import { PhoneAuthentication } from '../../utils/typeConfig';
import ActivityIndicator from '../../helpers/activityIndicator';

const Login = (props: any) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const formik = useValidation({
    initialValues: { phoneNumber: '' },
    validationSchema: PHONE_NUMBER_SCHEMA,
    onSubmit: (values: PhoneAuthentication) => {
      const payload = {
        ...values,
        phoneNumber: `+91${values.phoneNumber}`, // prefix before sending
      };
      setPhoneNumber(payload.phoneNumber);
      dispatch(loginWithPhoneNumber(payload));
    },
  });

  const { error, loginData, isLoading, FacebookSiginError, googleSiginError } =
    useSelector((state: RootState) => state.auth);

  console.log('shdgksd', FacebookSiginError);

  const [isShowModal, setShowModal] = useState(false);

  const _handleOnCancelModal = () => {
    setShowModal(!isShowModal);
    dispatch(resetAll());
  };

  useEffect(() => {
    if (loginData) {
      props.navigation.navigate(NavigationConstant.VERIFY_OTP_SCREEN, {
        phoneNumber: phoneNumber,
      });
    }
  }, [loginData]);

  useEffect(() => {
    if (error || FacebookSiginError || googleSiginError) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [error, FacebookSiginError, googleSiginError]);

  const _showMessageError = () => {
    if (error) {
      return STRING_CONFIG.modalText.errorNetworkModal.headerTwo;
    } else if (FacebookSiginError) {
      return FacebookSiginError;
    } else if (googleSiginError) {
      return googleSiginError.slice(5);
    }
  };

  const _handleGoogleAUth = () => {
    dispatch(googleSiginStart());
  };

  const _handleFacebookAuth = () => {
    dispatch(FacebookSiginStart());
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

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
            placeHolder={STRING_CONFIG.basicInfoString.phoneNumber}
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            inputView={styles.inputContainerStyle}
            errorMessage={
              formik.touched.phoneNumber ? formik.errors.phoneNumber || '' : ''
            }
            keyBoardType="number-pad"
            isPhoneNumber={true}
            containerStyle={styles.otpContainer}
            inputStyle={styles.inputText}
          />

          <CustomButton
            btnTitleName={STRING_CONFIG.authScreenString.siginBtnText}
            customStyle={styles.buttonStyle}
            onPress={formik.handleSubmit as any}
          />
          <View>
            <DividerWithText
              textTitle={STRING_CONFIG.authScreenString.footerText}
            />
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.socialContainer}
                onPress={_handleGoogleAUth}
              >
                <SvgIcon
                  name="goggleSvgIcon"
                  width={scale(30)}
                  height={verticalScale(30)}
                />
                <Text style={styles.socialText}>
                  {STRING_CONFIG.authScreenString.goggleText}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialContainer}
                onPress={_handleFacebookAuth}
              >
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
              <Text style={styles.messageSubText}>{_showMessageError()}</Text>
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
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primaryColor,
  },
});

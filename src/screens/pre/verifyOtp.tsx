import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { COLORS } from '../../utils/colorConstant';
import OTPInput, { OTPInputRef } from '../../components/otpInputComponet';
import CustomButton from '../../components/customButton';

import BottomSheetComponent from '../../components/bottomSheetComponent';
import SvgIcon from '../../components/svgComponent';

import { useValidation } from '../../helpers/yupAdapter';
import { VALID_OTP } from '../../helpers/validationsHook';
import { useDispatch, useSelector } from 'react-redux';
import { SendOtpApi, VerifyOtpApi } from '../../helpers/redux/api/authApi';
import { VerifyAuthentication } from '../../utils/typeConfig';
import {
  loginWithPhoneNumber,
  resetAll,
  verifyOtpStart,
} from '../../helpers/redux/slice/authSlice';
import { RootState } from '../../helpers/redux/store';
import ActivityIndicator from '../../helpers/activityIndicator';

const VerifyOtpScreen = (props: any) => {
  let { phoneNumber } = props.route.params;
  const otpRef = useRef<OTPInputRef>(null);
  const dispatch = useDispatch();
  const { verifyError, loginData, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const [otpTimer, setTimer] = useState(60);

  const [showModal, setShowModal] = useState(false);

  const formik = useValidation({
    initialValues: { otpNumber: '', verificationId: '' },
    validationSchema: VALID_OTP,
    onSubmit: (values: VerifyAuthentication) => {
      const payload = {
        otpNumber: values.otpNumber,
        verificationId: `${loginData}`,
        phoneNumber: phoneNumber,
      };
      dispatch(verifyOtpStart(payload));
    },
  });

  useEffect(() => {
    setShowModal(!!verifyError);
  }, [verifyError]);

  useEffect(() => {
    if (!otpTimer) return;

    setTimer(otpTimer); // reset timer when new otpTimer comes

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpTimer]); // ✅ only resets when otpTimer resets

  function handleResend(): void {
    otpRef.current?.clear(); // clear OTP and auto focus first input
    setTimer(60); // restart timer
    const payload = { phoneNumber: phoneNumber };
    dispatch(loginWithPhoneNumber(payload));
  }
  const _handleOnCancelModal = () => {
    setShowModal(!showModal);
    dispatch(resetAll());
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <AuthWrappers
        isSvgShow={true}
        svgIconName="mailSentSvgIcon"
        isShowHeading={false}
        svgContainerStyle={styles.authWrapperCustomStyle}
        showHeader
        headerTitle={STRING_CONFIG.genricString.verifyOtpHeader}
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
            {phoneNumber}
          </Text>
          <OTPInput
            length={6}
            ref={otpRef}
            onChangeOTP={formik.handleChange('otpNumber')}
          />
          {formik.touched.otpNumber && (
            <Text style={styles.errorMessage}>{formik.errors.otpNumber}</Text>
          )}
          {/* Timer & Resend */}
          <View style={styles.timerWrapper}>
            {otpTimer > 0 ? (
              <Text style={styles.timerText}>
                {STRING_CONFIG.otpScreen.resendOtpText}{' '}
                <Text style={styles.counter}>{otpTimer}</Text>s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text
                  style={[styles.timerText, { fontSize: moderateScale(16) }]}
                >
                  {STRING_CONFIG.otpScreen.noOtpText}
                  <Text style={styles.resendText}>
                    {' '}
                    {STRING_CONFIG.otpScreen.resendOtp}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <CustomButton
            btnTitleName="Verify Otp"
            customStyle={{ marginVertical: verticalScale(12) }}
            onPress={formik.handleSubmit}
          />
        </View>
      </AuthWrappers>
      <BottomSheetComponent
        isVisible={showModal}
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
                {STRING_CONFIG.modalText.errorNetworkModal.otpHeader}
              </Text>
              <Text style={styles.messageSubText}>
                {STRING_CONFIG.modalText.errorNetworkModal.otpError}
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

export default VerifyOtpScreen;

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
    textTransform: 'capitalize',
  },
  otpContainer: {
    marginTop: verticalScale(22),
  },
  subHeading: {
    color: COLORS.shadesOfGrey.greyOne,
    marginTop: verticalScale(12),
  },
  timerWrapper: {
    alignItems: 'center',
    marginVertical: moderateScale(12),
  },
  timerText: {
    color: COLORS.black,
    fontSize: moderateScale(18),
    fontWeight: '500',
  },
  counter: {
    color: COLORS.red,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  resendText: {
    color: COLORS.red,
    fontWeight: '700',
    textTransform: 'capitalize',
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
    textTransform: 'capitalize',
  },
  content: {
    alignItems: 'center',
  },
  messageText: {
    fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  messageSubText: {
    fontSize: moderateScale(18),
    color: COLORS.red,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: verticalScale(12),
  },
  contentView: {
    marginVertical: verticalScale(16),
  },
  errorMessage: {
    textAlign: 'center',
    paddingTop: verticalScale(6),
    marginHorizontal: scale(22),
    fontSize: moderateScale(16),
    color: COLORS.red,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

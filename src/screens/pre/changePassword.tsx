import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import InputCompnent from '../../components/inputCompnent';
import { STRING_CONFIG } from '../../utils/stringConfig';
import CustomButton from '../../components/customButton';
import { verticalScale } from '../../helpers/dimentions';
import BottomSheetComponent from '../../components/bottomSheetComponent';
import SuccessBodySheet from '../../components/bottomSheetBody/successBodySheet';
import FailureBodySHeet from '../../components/bottomSheetBody/failureBodySHeet';
import { NavigationConstant } from '../../utils/navConstant';
import { useValidation } from '../../helpers/yupAdapter';
import { PASSWORD_SCHEMA } from '../../helpers/validationsHook';

const ChangePassword = (props: any) => {
  const [showModal, setShowModal] = useState({
    isSuccessModal: false,
    isFailure: false,
  });

  const formik = useValidation({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: PASSWORD_SCHEMA,
    onSubmit: values => {
      if (values.password === values.confirmPassword) {
        setShowModal({ ...showModal, isSuccessModal: true });
      } else {
        setShowModal({ ...showModal, isFailure: true });
      }
    },
  });

  const _handleOnCancelModal = () => {
    setShowModal({ ...showModal, isSuccessModal: false });
  };

  const _handleOnCancelFailure = () => {
    setShowModal({ ...showModal, isFailure: false });
  };

  const _handleLoginButton = () => {
    props.navigation.navigate(NavigationConstant.LOGIN_SCREEN);
    _handleOnCancelModal();
  };

  return (
    <>
      <AuthWrappers
        isSvgShow
        isShowHeading={false}
        showHeader
        svgIconName="confirmPassword"
      >
        <View>
          <InputCompnent
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            placeHolder={STRING_CONFIG.basicInfoString.password}
            inputView={{ marginVertical: verticalScale(22) }}
            errorMessage={
              formik.touched.password ? formik.errors.password || '' : ''
            }
          />
          <InputCompnent
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            placeHolder={STRING_CONFIG.basicInfoString.confirmPassword}
            errorMessage={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword || ''
                : ''
            }
          />
          <CustomButton
            btnTitleName="Confirm Password"
            customStyle={{ marginTop: verticalScale(22) }}
            onPress={formik.handleSubmit}
          />
        </View>
      </AuthWrappers>
      <BottomSheetComponent
        isVisible={showModal.isSuccessModal}
        onBackdropPress={_handleOnCancelModal}
      >
        <SuccessBodySheet _handleLoginButton={_handleLoginButton} />
      </BottomSheetComponent>
      <BottomSheetComponent
        isVisible={showModal.isFailure}
        onBackdropPress={_handleOnCancelModal}
      >
        <FailureBodySHeet _handleOnCancelModal={_handleOnCancelFailure} />
      </BottomSheetComponent>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});

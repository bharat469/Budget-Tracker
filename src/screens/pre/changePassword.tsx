import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import InputCompnent from '../../components/inputCompnent';
import { STRING_CONFIG } from '../../utils/stringConfig';
import CustomButton from '../../components/customButton';
import { verticalScale } from '../../helpers/dimentions';
import { isEmptyCheck } from '../../helpers/validationsHook';
import BottomSheetComponent from '../../components/bottomSheetComponent';
import SuccessBodySheet from '../../components/bottomSheetBody/successBodySheet';
import FailureBodySHeet from '../../components/bottomSheetBody/failureBodySHeet';
import { NavigationConstant } from '../../utils/navConstant';

const ChangePassword = (props: any) => {
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    error: '',
    emptyError: '',
  });
  const [showModal, setShowModal] = useState({
    isSuccessModal: false,
    isFailure: false,
  });

  const _handleOnCancelModal = () => {
    setShowModal({ ...showModal, isSuccessModal: false });
  };

  const _handleOnCancelFailure = () => {
    setShowModal({ ...showModal, isFailure: false });
  };

  const _handleConfirmPassword = (passwordData: any) => {
    if (
      isEmptyCheck(passwordData.password) ||
      isEmptyCheck(passwordData.confirmPassword)
    ) {
      setError({ ...error, emptyError: STRING_CONFIG.errorText.passwordError });
    } else if (passwordData.password === passwordData.confirmPassword) {
      setShowModal({ ...showModal, isSuccessModal: true });
    } else {
      setShowModal({ ...showModal, isFailure: true });
    }
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
            value={passwordData.password}
            onChangeText={text =>
              setPasswordData({ ...passwordData, password: text })
            }
            placeHolder={STRING_CONFIG.basicInfoString.password}
            inputView={{ marginVertical: verticalScale(22) }}
            errorMessage={error.emptyError}
          />
          <InputCompnent
            value={passwordData.confirmPassword}
            onChangeText={text =>
              setPasswordData({ ...passwordData, confirmPassword: text })
            }
            placeHolder={STRING_CONFIG.basicInfoString.confirmPassword}
            errorMessage={error.emptyError}
          />
          <CustomButton
            btnTitleName="Confirm Password"
            customStyle={{ marginTop: verticalScale(22) }}
            onPress={() => _handleConfirmPassword(passwordData)}
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

import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../utils/colorConstant';
import SvgIcon from '../../components/svgComponent';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import { STRING_CONFIG } from '../../utils/stringConfig';
import CustomButton from '../../components/customButton';
import { NavigationConstant } from '../../utils/navConstant';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheetComponent from '../../components/bottomSheetComponent';
import PickerBodySheet from '../../components/bottomSheetBody/pickerBodySheet';

import { useDispatch, useSelector } from 'react-redux';
import { startImageUpload } from '../../helpers/redux/slice/userSlice';
import { RootState } from '../../helpers/redux/store';
import ActivityIndicator from '../../helpers/activityIndicator';

const ProfilePictureScreen = (props: any) => {
  const [showModal, setShowModal] = useState({
    imagePicker: false,
    success: false,
  });
  const disptach = useDispatch();
  const [profilePic, setProfilePic] = useState('');
  const { imageUploadLoading } = useSelector(
    (state: RootState) => state.userData,
  );
  const { googleSiginData, FacebookSiginData } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (profilePic.length == 0 && googleSiginData?.photo) {
      setProfilePic(googleSiginData.photo);
    } else if (profilePic.length == 0 && FacebookSiginData?.photo) {
      setProfilePic(FacebookSiginData.photo);
    }
  }, [googleSiginData, profilePic]);

  const _handleCancelModal = () => {
    setShowModal(prev => ({ ...prev, imagePicker: false }));
  };

  const _openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      });
      setProfilePic(image.path);
      disptach(startImageUpload(image?.path));
      setShowModal({ ...showModal, imagePicker: false });
    } catch (e: any) {
      if (e.code !== 'E_PICKER_CANCELLED') console.log('Camera error:', e);
    }
  };

  const _openGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      setProfilePic(image.path);
      disptach(startImageUpload(image?.path));
      setShowModal({ ...showModal, imagePicker: false });
    } catch (e: any) {
      if (e.code !== 'E_PICKER_CANCELLED') console.log('Gallery error:', e);
    }
  };

  const _handleButtonClick = () => {
    setShowModal(prev => ({ ...prev, imagePicker: true }));
  };

  const _handleNavigation = () => {
    props.navigation.navigate(NavigationConstant.REGISTER_SCREEN);
  };
  if (imageUploadLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.onBoardingStyle}>
      <View style={styles.firstContainer}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePicStyle} />
        ) : (
          <SvgIcon
            name="getProfilePicIcon"
            width={scale(300)}
            height={verticalScale(300)}
          />
        )}
      </View>
      <View>
        <View style={styles.innerContainer}>
          <Text style={styles.headingText}>
            {STRING_CONFIG.RegisterScreenString.headerOne}
          </Text>
          <Text style={styles.subHeadingText}>
            {STRING_CONFIG.RegisterScreenString.subheadigTwo}
          </Text>
        </View>
        <CustomButton
          btnTitleName={STRING_CONFIG.RegisterScreenString.openCameraBtnText}
          customStyle={{ marginVertical: moderateScale(20) }}
          onPress={_handleButtonClick}
        />
        {profilePic && (
          <CustomButton
            btnTitleName={STRING_CONFIG.imagePickerText.ButtonText}
            onPress={_handleNavigation}
          />
        )}
      </View>
      <BottomSheetComponent
        isVisible={showModal.imagePicker}
        onBackButtonPress={_handleCancelModal}
        onBackdropPress={_handleCancelModal}
      >
        <PickerBodySheet
          _handleOnCancelModal={_handleCancelModal}
          _handleOpenCamera={_openCamera}
          _handleOpenGallery={_openGallery}
        />
      </BottomSheetComponent>
    </View>
  );
};

export default ProfilePictureScreen;

const styles = StyleSheet.create({
  onBoardingStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  firstContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(22),
  },
  innerContainer: {
    alignItems: 'center',
  },
  headingText: {
    fontSize: moderateScale(36),
    fontWeight: '600',
    color: COLORS.black,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  subHeadingText: {
    fontSize: moderateScale(22),
    textAlign: 'center',
    color: COLORS.shadesOfGrey.greyOne,
    marginHorizontal: scale(22),
    marginVertical: verticalScale(22),
  },
  forgetText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    marginBottom: verticalScale(12),
    color: COLORS.shadesOfGrey.greyOne,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  siginUpView: {
    color: COLORS.primaryColor,
  },
  profilePicStyle: {
    width: scale(200),
    height: verticalScale(200),
    borderRadius: moderateScale(100),
    borderWidth: 5,
    borderColor: COLORS.shadesOfGrey.greyOne,
  },
});

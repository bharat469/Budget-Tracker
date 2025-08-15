import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../utils/colorConstant';
import SvgIcon from '../../components/svgComponent';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../../helpers/dimentions';
import { STRING_CONFIG } from '../../utils/stringConfig';
import CustomButton from '../../components/customButton';
import { NavigationConstant } from '../../utils/navConstant';

const ProfilePictureScreen = (props: any) => {
  const _handleButtonClick = () => {
    props.navigation.navigate(NavigationConstant.REGISTER_SCREEN);
  };

  return (
    <View style={styles.onBoardingStyle}>
      <View style={styles.firstContainer}>
        <SvgIcon
          name="getProfilePicIcon"
          width={scale(300)}
          height={verticalScale(300)}
        />
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
      </View>
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
});

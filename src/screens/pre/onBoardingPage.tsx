import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { IMAGE_URL } from '../../utils/imageUrl';
import CustomButton from '../../components/customButton';
import {
  scale,
  verticalScale,
  SCREEN,
  moderateScale,
} from '../../helpers/dimentions';
import SvgIcon from '../../components/svgComponent';
import { COLORS } from '../../utils/colorConstant';
import { NavigationConstant } from '../../utils/navConstant';
import { STRING_CONFIG } from '../../utils/stringConfig';

const OnBoardingPage = (props: any) => {
  const _handleGetStarted = () => {
    props.navigation.navigate(NavigationConstant.PROFILE_PICTURE_SCREEN);
  };

  return (
    <View style={styles.onBoardingStyle}>
      <View style={styles.firstContainer}>
        <SvgIcon
          name="onboardingIcon"
          width={scale(300)}
          height={verticalScale(300)}
        />
      </View>
      <SvgIcon name="waveSvgIcon" width={SCREEN.WIDTH} />
      <View style={styles.secondContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.headingText}>
            {STRING_CONFIG.onboarding.headingOne}
          </Text>
          <Text style={styles.headingText}>
            {STRING_CONFIG.onboarding.HeadingTwo}
          </Text>
        </View>
        <CustomButton
          btnTitleName={STRING_CONFIG.genricString.getStartedText}
          onPress={_handleGetStarted}
          customStyle={{ marginVertical: verticalScale(12) }}
        />
        <Text style={styles.footerText}>
          {STRING_CONFIG.genricString.loginNavText}
          <TouchableWithoutFeedback
            onPress={() =>
              props.navigation.navigate(NavigationConstant.LOGIN_SCREEN)
            }
          >
            <Text style={styles.footerLinkText}>
              {' '}
              {STRING_CONFIG.genricString.login}
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </View>
  );
};

export default OnBoardingPage;

const styles = StyleSheet.create({
  onBoardingStyle: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  firstContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGreen,
    top: verticalScale(12),
  },
  secondContainer: {
    flex: 0.5,
    paddingVertical: moderateScale(22),
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    alignItems: 'center',
  },

  headingText: {
    fontSize: moderateScale(36),
    fontWeight: '600',
    color: COLORS.primaryColor,
  },
  footerText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginVertical: verticalScale(12),
    color: COLORS.shadesOfGrey.greyPrimary,
    fontWeight: '600',
  },
  footerLinkText: {
    fontSize: moderateScale(18),
    color: COLORS.primaryColor,
    fontWeight: '600',
  },
});

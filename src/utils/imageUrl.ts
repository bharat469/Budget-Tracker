export const IMAGE_URL = {
  onboardScreen: require('../assets/png/man.png'),
};

export const SVG_URL = {
  onboardingIcon: require('../assets/svg/onBoarding.svg').default,
  waveSvgIcon: require('../assets/svg/wave.svg').default,
  loginSvgIcon: require('../assets/svg/loginImage.svg').default,
  goggleSvgIcon: require('../assets/svg/goggle.svg').default,
  facebookSvgIcon: require('../assets/svg/facebook.svg').default,
  getProfilePicIcon: require('../assets/svg/picture.svg').default,
  registerSvgIcon: require('../assets/svg/register.svg').default,
  mailSentSvgIcon: require('../assets/svg/mailSent.svg').default,
  emailConfirmIcon: require('../assets/svg/email.svg').default,
  leftChevronIcon: require('../assets/svg/chevronLeft.svg').default,
  downloadIcon: require('../assets/svg/download.svg').default,
  errorIcon: require('../assets/svg/error.svg').default,
  confirmPassword: require('../assets/svg/password.svg').default,
  successIcon: require('../assets/svg/success.svg').default,
};

export type IconName = keyof typeof SVG_URL;

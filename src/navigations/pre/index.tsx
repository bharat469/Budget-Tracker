import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/pre/login';
import OnBoardingPage from '../../screens/pre/onBoardingPage';
import { NavigationConstant } from '../../utils/navConstant';
import RegisterScreen from '../../screens/pre/registerScreen';
import ProfilePictureScreen from '../../screens/pre/profilePictureScreen';

import ForgetPasswordEmail from '../../screens/pre/forgetPasswordEmail';
import ChangePassword from '../../screens/pre/changePassword';
import BlockedScreen from '../../screens/pre/blockedScreen';
import VerifyOtpScreen from '../../screens/pre/verifyOtp';

const PostStack = createNativeStackNavigator();

const PreNavigation = () => {
  return (
    <PostStack.Navigator screenOptions={{ headerShown: false }}>
      <PostStack.Screen
        name={NavigationConstant.ONBOARD_SCREEN}
        component={OnBoardingPage}
      />
      <PostStack.Screen
        name={NavigationConstant.LOGIN_SCREEN}
        component={Login}
      />
      <PostStack.Screen
        name={NavigationConstant.REGISTER_SCREEN}
        component={RegisterScreen}
      />
      <PostStack.Screen
        name={NavigationConstant.PROFILE_PICTURE_SCREEN}
        component={ProfilePictureScreen}
      />
      <PostStack.Screen
        name={NavigationConstant.VERIFY_OTP_SCREEN}
        component={VerifyOtpScreen}
      />
      <PostStack.Screen
        name={NavigationConstant.FORGOT_PASSWORD_EMAIL_SCREEN}
        component={ForgetPasswordEmail}
      />
      <PostStack.Screen
        name={NavigationConstant.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
      />
      <PostStack.Screen
        name={NavigationConstant.BLOCKED_SCREEN}
        component={BlockedScreen}
      />
    </PostStack.Navigator>
  );
};

export default PreNavigation;

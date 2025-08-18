import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/pre/login';
import OnBoardingPage from '../../screens/pre/onBoardingPage';
import { NavigationConstant } from '../../utils/navConstant';
import RegisterScreen from '../../screens/pre/registerScreen';
import ProfilePictureScreen from '../../screens/pre/profilePictureScreen';
import ForgetPassword from '../../screens/pre/forgetPassword';
import ForgetPasswordEmail from '../../screens/pre/forgetPasswordEmail';
import ChangePassword from '../../screens/pre/changePassword';


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
        name={NavigationConstant.FORGOT_PASSWORD_SCREEN}
        component={ForgetPassword}
      />
      <PostStack.Screen
        name={NavigationConstant.FORGOT_PASSWORD_EMAIL_SCREEN}
        component={ForgetPasswordEmail}
      />
      <PostStack.Screen
        name={NavigationConstant.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
      />
    </PostStack.Navigator>
  );
};

export default PreNavigation;

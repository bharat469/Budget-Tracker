import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationConstant } from '../../utils/navConstant';
import Home from '../../screens/post/home';

const PreStack = createNativeStackNavigator();

const PostNavigation = () => {
  return (
    <PreStack.Navigator>
      <PreStack.Screen name={NavigationConstant.HOME_SCREEN} component={Home} />
    </PreStack.Navigator>
  );
};

export default PostNavigation;

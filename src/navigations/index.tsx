import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreNavigation from './pre';
import PostNavigation from './post';

const Navigations = () => {
  const [userToken, setToken] = useState(false);
  return userToken ? <PostNavigation /> : <PreNavigation />;
};

export default Navigations;

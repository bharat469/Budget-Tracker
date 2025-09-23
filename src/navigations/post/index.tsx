import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationConstant } from '../../utils/navConstant';
import Home from '../../screens/post/home';
import ProfilePictureScreen from '../../screens/pre/profilePictureScreen';
import RegisterScreen from '../../screens/pre/registerScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startGetUserData } from '../../helpers/redux/slice/userSlice';
import { RootState } from '../../helpers/redux/store';
import ActivityIndicator from '../../helpers/activityIndicator';

const PreStack = createNativeStackNavigator();

const PostNavigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetUserData());
  }, []);
  const { userData = [], isLoading } = useSelector(
    (state: RootState) => state.userData,
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <PreStack.Navigator screenOptions={{ headerShown: false }}>
      {userData && userData.length !== 0 ? (
        <PreStack.Screen
          name={NavigationConstant.HOME_SCREEN}
          component={Home}
        />
      ) : (
        <>
          <PreStack.Screen
            name={NavigationConstant.PROFILE_PICTURE_SCREEN}
            component={ProfilePictureScreen}
          />
          <PreStack.Screen
            name={NavigationConstant.REGISTER_SCREEN}
            component={RegisterScreen}
          />
          <PreStack.Screen
            name={NavigationConstant.HOME_SCREEN}
            component={Home}
          />
        </>
      )}
    </PreStack.Navigator>
  );
};

export default PostNavigation;

import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../helpers/redux/store';
import { startGetUserData } from '../../helpers/redux/slice/userSlice';
import { NavigationConstant } from '../../utils/navConstant';
import ActivityIndicator from '../../helpers/activityIndicator';

// Screens
import Home from '../../screens/post/home';
import ProfilePictureScreen from '../../screens/pre/profilePictureScreen';
import RegisterScreen from '../../screens/pre/registerScreen';
import Statistics from '../../screens/post/statistics';

import ProfileScreen from '../../screens/post/profileScreen';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TabBarIconRender from '../../helpers/tabBarIconRender';
import { COLORS } from '../../utils/colorConstant';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../../helpers/dimentions';
import AddExpense from '../../screens/post/addExpense';
import TransactionsScreen from '../../screens/post/Transactions';

const PreStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

const PreDataSave = () => {
  return (
    <PreStack.Navigator screenOptions={{ headerShown: false }}>
      <PreStack.Screen
        name={NavigationConstant.PROFILE_PICTURE_SCREEN}
        component={ProfilePictureScreen}
      />
      <PreStack.Screen
        name={NavigationConstant.REGISTER_SCREEN}
        component={RegisterScreen}
      />
    </PreStack.Navigator>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const currentRoute = state.routes[state.index].name; // active route
  if (currentRoute === NavigationConstant.ADD_EXPENSE) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {/* Normal tab buttons */}
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        // Hide AddExpense from the tab row (we only use + button to open it)
        if (route.name === NavigationConstant.ADD_EXPENSE) {
          return null;
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
          >
            <TabBarIconRender isFocused={isFocused} iconName={route.name} />
            {/* <Text style={styles.tabText}>{label}</Text> */}
          </TouchableOpacity>
        );
      })}
      {/* Floating + button */}
      {currentRoute !== NavigationConstant.ADD_EXPENSE && (
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationConstant.ADD_EXPENSE)}
          style={styles.floatingButton}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const PostTabs = () => {
  return (
    <TabStack.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <TabStack.Screen
        name={NavigationConstant.HOME_SCREEN}
        component={Home}
        options={{ tabBarLabel: 'Home' }}
      />
      <TabStack.Screen
        name={NavigationConstant.STATISTICS_SCREEN}
        component={Statistics}
        options={{ tabBarLabel: 'Statistics' }}
      />
      <TabStack.Screen
        name={NavigationConstant.TRANSACTIONS_SCREEN}
        component={TransactionsScreen}
        options={{ tabBarLabel: 'Transaction' }}
      />
      <TabStack.Screen
        name={NavigationConstant.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
      <TabStack.Screen
        name={NavigationConstant.ADD_EXPENSE}
        component={AddExpense}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </TabStack.Navigator>
  );
};

const PostNavigation = () => {
  const dispatch = useDispatch();
  const { userData, isLoading } = useSelector(
    (state: RootState) => state.userData,
  );

  useEffect(() => {
    dispatch(startGetUserData());
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  // ✅ Show PreStack if no user data, else show TabStack
  return userData && userData.length !== 0 ? <PostTabs /> : <PreDataSave />;
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    padding: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    marginHorizontal: scale(12),
    marginBottom: verticalScale(22),
    borderRadius: moderateScale(12),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  floatingButton: {
    position: 'absolute',
    bottom: verticalScale(34),
    left: SCREEN.WIDTH / 2.6,
    width: scale(55),
    height: verticalScale(55),
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
  },
  addBtnText: {
    fontSize: moderateScale(30),
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default PostNavigation;

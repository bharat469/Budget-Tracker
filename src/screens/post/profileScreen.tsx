import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HomeWrappers from '../../components/wrappers/homeWrappers';
import HeaderComponent from '../../components/headerComponent';
import { STRING_CONFIG } from '../../utils/stringConfig';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../../helpers/dimentions';
import { COLORS } from '../../utils/colorConstant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../helpers/redux/store';
import CustomButton from '../../components/customButton';
import { logoutStart, resetAll } from '../../helpers/redux/slice/authSlice';
import { resetExpense } from '../../helpers/redux/slice/dataSlice';

const ProfileScreen = (props: any) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.userData);
  const _handleLogout = async () => {
    dispatch(logoutStart());
    dispatch(resetAll());
    dispatch(resetExpense());
  };

  const { updatedDataHome, getDataSuccess, getDataLoading } = useSelector(
    (state: RootState) => state.expenseData,
  );
  let userInfo =
    updatedDataHome && updatedDataHome
      ? updatedDataHome
      : userData && userData[0];
  let userDataDestructure = userInfo?.payload;

  return (
    <HomeWrappers>
      <View style={styles.headerComponent}>
        <HeaderComponent
          headerTiltle={STRING_CONFIG.profileScreen.headerTitle}
          headerType="home"
          onBackPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.otherHalfComponent}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: userDataDestructure?.profilePic }}
            style={styles.profilePicStyle}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.userNameText}>{userDataDestructure?.name}</Text>
            <Text style={styles.empStatusText}>
              {userDataDestructure?.emplomentStatus}
            </Text>
          </View>
        </View>
        <View>
          <CustomButton btnTitleName="Log out" onPress={_handleLogout} />
        </View>
      </View>
    </HomeWrappers>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerComponent: {
    flex: 0.3,
  },
  otherHalfComponent: {
    flex: 0.7,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  profilePicStyle: {
    width: scale(160),
    height: verticalScale(160),
    borderRadius: moderateScale(100),
    borderWidth: 5,
    borderColor: COLORS.lightGreen,
  },
  profilePictureContainer: {
    alignItems: 'center',
    bottom: SCREEN.HEIGHT / 8.6,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(22),
  },
  userNameText: {
    fontSize: moderateScale(22),
    color: COLORS.black,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  empStatusText: {
    fontSize: moderateScale(18),
    color: COLORS.cardGreenColor,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../../components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutStart, resetAll } from '../../helpers/redux/slice/authSlice';
import { storage } from '../../helpers/asyncStorageHelpers';
import { STORAGE_STRING } from '../../utils/storageConstant';
import HomeWrappers from '../../components/wrappers/homeWrappers';
import { RootState } from '../../helpers/redux/store';
import { COLORS } from '../../utils/colorConstant';
import SvgIcon from '../../components/svgComponent';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import { getGreeting } from '../../utils/helperFunction';
import { IMAGE_URL } from '../../utils/imageUrl';
import CardUi from '../../components/cardUi';

const Home = () => {
  const dispatch = useDispatch();
  const _handleLogout = async () => {
    dispatch(logoutStart());
  };

  const { userData } = useSelector((state: RootState) => state.userData);
  const greeting = getGreeting();
  let userDataDestructure = userData && userData[0]?.payload;
  console.log('user', userDataDestructure);

  return (
    <HomeWrappers>
      <View style={styles.headerComponent}>
        <View>
          <View style={styles.headerView}>
            <View>
              <Text style={styles.greetingText}>{greeting}</Text>
              <Text style={styles.nameText}>Hi {userDataDestructure.name}</Text>
            </View>
            <View>
              <Image
                source={
                  userDataDestructure?.profilePic
                    ? { uri: userDataDestructure?.profilePic }
                    : IMAGE_URL.avatarImage
                }
                style={{ height: 50, width: 50, borderRadius: 50 }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.otherHalfComponent}>
        <View style={{ marginTop: 22 }}>
          <CardUi
            totalBalance={userDataDestructure?.monthlyIncome}
            expense="2000"
            currencyType={userDataDestructure?.currency}
            Income={userDataDestructure?.monthlyIncome}
          />
          <CustomButton btnTitleName="Log out" onPress={_handleLogout} />
        </View>
      </View>
    </HomeWrappers>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerComponent: {
    flex: 0.3,
  },
  otherHalfComponent: {
    flex: 0.7,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(22),
    marginVertical: verticalScale(12),
  },
  greetingText: {
    fontSize: moderateScale(20),
    color: COLORS.white,
    fontWeight: '600',
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
  nameText: {
    fontSize: moderateScale(16),
    color: COLORS.white,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: verticalScale(4),
    letterSpacing: 0.2,
  },
});

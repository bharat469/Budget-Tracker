import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import CustomButton from '../../components/customButton';

import { useDispatch, useSelector } from 'react-redux';
import { logoutStart } from '../../helpers/redux/slice/authSlice';

import HomeWrappers from '../../components/wrappers/homeWrappers';
import { RootState } from '../../helpers/redux/store';
import { COLORS } from '../../utils/colorConstant';
import SvgIcon from '../../components/svgComponent';
import { moderateScale, scale, verticalScale } from '../../helpers/dimentions';
import {
  expenseTypeSigin,
  getGreeting,
  setCurrencySigin,
} from '../../utils/helperFunction';
import { IconName, IMAGE_URL } from '../../utils/imageUrl';
import CardUi from '../../components/cardUi';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { NavigationConstant } from '../../utils/navConstant';
import { startGetData } from '../../helpers/redux/slice/dataSlice';
import { ExpenseType } from '../../utils/typeConfig';
import ActivityIndicator from '../../helpers/activityIndicator';

const Home = (props: any) => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state: RootState) => state.userData);
  const { updatedDataHome, getDataSuccess, getDataLoading } = useSelector(
    (state: RootState) => state.expenseData,
  );

  const greeting = getGreeting();
  let userInfo =
    updatedDataHome && updatedDataHome
      ? updatedDataHome
      : userData && userData[0];
  let userDataDestructure = userInfo?.payload;

  useEffect(() => {
    dispatch(startGetData(userInfo.id));
  }, []);

  const _handleListView = ({ item }: { item: ExpenseType }) => {
    const iconName: IconName = item.expenseIcon || 'defaultIcon';
    const expenseCategories = expenseTypeSigin(item.expenseCategories);
    return (
      <View style={styles.containerList} key={item.id}>
        <View style={styles.leftView}>
          <SvgIcon
            name={iconName}
            width={scale(30)}
            height={verticalScale(30)}
          />

          <View style={styles.detailContainer}>
            <Text style={styles.expenseNameText}>{item.expenseName}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
        <View>
          <Text
            style={[
              styles.amountText,
              expenseCategories === '-'
                ? { color: COLORS.red }
                : { color: COLORS.greenColor.colorOne },
            ]}
          >
            {' '}
            {expenseCategories} {setCurrencySigin(userDataDestructure.currency)}
            {item.amount}
          </Text>
        </View>
      </View>
    );
  };

  if (getDataLoading) {
    return <ActivityIndicator />;
  }

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
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(NavigationConstant.PROFILE_SCREEN)
                }
                activeOpacity={0.8}
              >
                <Image
                  source={
                    userDataDestructure?.profilePic
                      ? { uri: userDataDestructure?.profilePic }
                      : IMAGE_URL.avatarImage
                  }
                  style={{ height: 50, width: 50, borderRadius: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.otherHalfComponent}>
        <View>
          <CardUi
            totalBalance={
              userInfo.total !== 0
                ? userInfo?.total?.toString()
                : userDataDestructure?.monthlyIncome
            }
            expense={userInfo.expense ? userInfo.expense?.toString() : '0'}
            currencyType={userDataDestructure?.currency}
            Income={userInfo?.income?.toString()}
            mainCardStyle={styles.cardUiStyle}
            salary={userDataDestructure?.monthlyIncome}
          />
        </View>
        <View style={styles.listView}>
          {getDataSuccess.length !== 0 ? (
            <>
              <View style={styles.footerHeaderStyle}>
                <Text style={styles.textFooter}>
                  {STRING_CONFIG.HomeString.transactionHeader}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() =>
                    props.navigation.navigate(
                      NavigationConstant.TRANSACTIONS_SCREEN,
                    )
                  }
                >
                  <Text style={styles.textBtnStyles}>
                    {STRING_CONFIG.HomeString.seeAll}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.flatListView}>
                {[...getDataSuccess]
                  .reverse()
                  .slice(0, 4)
                  .map(item => _handleListView({ item }))}
              </View>
            </>
          ) : (
            <View style={styles.noExpenseDataView}>
              <SvgIcon
                name="noTransactionSvg"
                height={verticalScale(160)}
                width={scale(160)}
              />
              <Text style={styles.headerText}>
                {STRING_CONFIG.HomeString.noTranactionString}
              </Text>
              <Text style={styles.subViewText}>
                {STRING_CONFIG.HomeString.subHeadingText}
              </Text>
            </View>
          )}
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
  cardUiStyle: {
    bottom: verticalScale(Platform.OS === 'android' ? 122 : 100),
  },
  listView: {
    bottom: verticalScale(72),
    marginHorizontal: scale(22),
  },
  footerHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textFooter: {
    fontSize: moderateScale(16),
    color: COLORS.black,
    fontWeight: '600',
  },
  textBtnStyles: {
    fontSize: moderateScale(16),
    color: COLORS.shadesOfGrey.greyOne,
    fontWeight: '500',
  },
  containerList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(8),
    borderWidth: 1,
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    borderColor: COLORS.cardGreenColor,
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailContainer: {
    marginLeft: scale(12),
  },
  expenseNameText: {
    fontSize: moderateScale(16),
    color: COLORS.primaryColor,
    fontWeight: '600',
  },
  dateText: {
    fontSize: moderateScale(14),
    color: COLORS.shadesOfGrey.greyPrimary,
    fontWeight: '500',
  },
  amountText: {
    fontSize: moderateScale(18),
    color: COLORS.red,
    fontWeight: '600',
  },
  flatListView: {
    paddingBottom: verticalScale(152),
    paddingTop: verticalScale(12),
  },
  noExpenseDataView: {
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    borderColor: COLORS.primaryColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  headerText: {
    fontSize: moderateScale(18),
    color: COLORS.red,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: verticalScale(12),
  },
  subViewText: {
    fontSize: moderateScale(16),
    color: COLORS.shadesOfGrey.greyPrimary,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: verticalScale(12),
  },
});

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../helpers/redux/store';
import ActivityIndicator from '../../helpers/activityIndicator';
import { ExpenseType } from '../../utils/typeConfig';
import { IconName } from '../../utils/imageUrl';
import SvgIcon from '../../components/svgComponent';
import {
  expenseTypeSigin,
  formatCurrency,
  setCurrencySigin,
} from '../../utils/helperFunction';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../../helpers/dimentions';
import HomeWrappers from '../../components/wrappers/homeWrappers';
import { COLORS } from '../../utils/colorConstant';
import HeaderComponent from '../../components/headerComponent';
import { STRING_CONFIG } from '../../utils/stringConfig';
import BottomSheetComponent from '../../components/bottomSheetComponent';
import { filterKeyword } from '../../utils/staticArray';
import DividerWithText from '../../helpers/dividerWithText';

const TransactionsScreen = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setIsSelected] = useState('');
  const { userData } = useSelector((state: RootState) => state.userData);
  const { updatedDataHome, getDataSuccess, getDataLoading, getDataError } =
    useSelector((state: RootState) => state.expenseData);
  let userInfo =
    updatedDataHome && updatedDataHome
      ? updatedDataHome
      : userData && userData[0];
  let userDataDestructure = userInfo?.payload;

  const [data, setData] = useState<ExpenseType[]>(getDataSuccess);

  useEffect(() => {
    setData(getDataSuccess);
  }, [getDataSuccess]);

  if (getDataLoading) {
    return <ActivityIndicator />;
  }

  const _handleListView = ({ item }: { item: ExpenseType }) => {
    const iconName: IconName = item?.expenseIcon || 'defaultIcon';
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

  const _handleOpenFilter = () => {
    setIsVisible(true);
  };

  const _handleOnCancelModal = () => {
    setIsVisible(false);
  };

  const _handleSelectFilter = (filterType: string) => {
    let sortedData: ExpenseType[] = [...getDataSuccess]; // create a new array

    switch (filterType) {
      case 'dateAscending':
        sortedData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case 'dateDescending':
        sortedData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case 'amountAscending':
        sortedData.sort(
          (a, b) =>
            parseFloat(a.amount.replace(/,/g, '')) -
            parseFloat(b.amount.replace(/,/g, '')),
        );
        break;
      case 'amountDescending':
        sortedData.sort(
          (a, b) =>
            parseFloat(b.amount.replace(/,/g, '')) -
            parseFloat(a.amount.replace(/,/g, '')),
        );
        break;
      default:
        return; // do nothing
    }
    setIsSelected(filterType);

    setData(sortedData); // update state
    setIsVisible(false); // hide filter modal
  };

  return (
    <HomeWrappers>
      <View style={styles.headerComponent}>
        <HeaderComponent
          headerTiltle={STRING_CONFIG.transactionScreen.Transaction}
          headerType="home"
          onBackPress={() => props.navigation.goBack()}
          isShowRightIcon
          onRightPress={_handleOpenFilter}
        />
      </View>
      <View style={styles.otherHalfComponent}>
        {data.length !== 0 ? (
          <>
            <View style={styles.headerView}>
              <Text style={styles.headerText}>
                {STRING_CONFIG.transactionScreen.headerText}
              </Text>
              <Text style={styles.totalAmountStyle}>
                {setCurrencySigin(userDataDestructure.currency)}
                {formatCurrency(
                  userInfo.total
                    ? userInfo?.total?.toString()
                    : userDataDestructure?.monthlyIncome,
                  userDataDestructure.currency,
                )}
              </Text>
            </View>
            <View style={styles.flatListView}>
              <FlatList
                data={[...data].reverse()}
                renderItem={_handleListView}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                showsVerticalScrollIndicator={false}
                initialNumToRender={4}
              />
            </View>
          </>
        ) : (
          <View style={styles.noExpenseDataView}>
            <SvgIcon
              name="noTransactionSvg"
              height={verticalScale(160)}
              width={scale(160)}
            />
            <Text style={styles.headerNoDataText}>
              {STRING_CONFIG.HomeString.noTranactionString}
            </Text>
            <Text style={styles.subViewText}>
              {STRING_CONFIG.HomeString.subHeadingText}
            </Text>
          </View>
        )}
      </View>
      <BottomSheetComponent
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      >
        <View style={styles.filterView}>
          <TouchableWithoutFeedback onPress={_handleOnCancelModal}>
            <View style={styles.crossBtn}>
              <Text style={styles.closeText}>X</Text>
            </View>
          </TouchableWithoutFeedback>

          <DividerWithText
            textTitle={STRING_CONFIG.transactionScreen.setFilter}
          />
          {filterKeyword.map(item => {
            return (
              <View style={styles.filterList} key={item.id}>
                <TouchableOpacity
                  style={styles.filterBtn}
                  onPress={() => _handleSelectFilter(item.value)}
                >
                  <Text style={styles.filterText}>{item.filterName}</Text>
                  {selectedFilter === item.value && (
                    <SvgIcon
                      name="checkSvg"
                      width={scale(20)}
                      height={verticalScale(20)}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: COLORS.primaryColor,
                    height: 0.5,
                  }}
                />
              </View>
            );
          })}
        </View>
      </BottomSheetComponent>
    </HomeWrappers>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  headerComponent: {
    flex: 0.1,
  },

  otherHalfComponent: {
    flex: 0.9,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(22),
    borderTopRightRadius: moderateScale(22),
  },
  headerView: {
    alignItems: 'center',
    marginVertical: verticalScale(22),
  },
  headerText: {
    fontSize: moderateScale(14),
    color: COLORS.shadesOfGrey.greyPrimary,
    fontWeight: '400',
  },
  totalAmountStyle: {
    fontSize: moderateScale(24),
    color: COLORS.primaryColor,
    fontWeight: '700',
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
    paddingBottom: verticalScale(102),
    marginHorizontal: scale(22),
  },
  filterList: {
    marginVertical: verticalScale(12),
  },

  filterView: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(20),
    height: SCREEN.HEIGHT / 2,
  },
  filterBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(22),
    paddingVertical: verticalScale(4),
  },
  crossBtn: {
    marginVertical: verticalScale(12),
    alignItems: 'flex-end',
  },
  closeText: {
    alignSelf: 'flex-end',
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.primaryColor,
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
    marginTop: verticalScale(32),
    marginHorizontal: scale(22),
  },
  headerNoDataText: {
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
  filterText: {
    fontSize: moderateScale(16),
    color: COLORS.black,
    padding: moderateScale(6),
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: '600',
  },
});

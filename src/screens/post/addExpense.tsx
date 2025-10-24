import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import HomeWrappers from '../../components/wrappers/homeWrappers';
import HeaderComponent from '../../components/headerComponent';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colorConstant';
import { useValidation } from '../../helpers/yupAdapter';
import { ADD_EXPENSE_SCHEMA } from '../../helpers/validationsHook';
import {
  AddExpenseType,
  ExpenseType,
  SaveExpensePayload,
} from '../../utils/typeConfig';
import InputCompnent from '../../components/inputCompnent';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../../helpers/dimentions';
import DateComponent from '../../components/dateComponent';
import InputWithLogoScreen from '../../components/inputWrapper/inputWithLogo';

import { RootState } from '../../helpers/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import SvgIcon from '../../components/svgComponent';
import CustomButton from '../../components/customButton';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { expenseTypeSigin, setCurrencySigin } from '../../utils/helperFunction';
import { IconName } from '../../utils/imageUrl';
import {
  startAddExpense,
  startGetData,
} from '../../helpers/redux/slice/dataSlice';
import ActivityIndicator from '../../helpers/activityIndicator';
import { NavigationConstant } from '../../utils/navConstant';
import LinearGradient from 'react-native-linear-gradient';

const AddExpense = (props: any) => {
  const { userData } = useSelector((state: RootState) => state.userData);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>(
    'income',
  );
  const { isLoadingExpenseSave, expenseSavedSuccess, expenseError } =
    useSelector((state: RootState) => state.expenseData);
  const dispatch = useDispatch();
  const [data, setData] = useState<ExpenseType[]>([]);
  let userDataDestructure = userData && userData[0]?.payload;
  let userInfo = userData && userData[0];
  let docUserId = userData && userData[0]?.id;

  const formik = useValidation({
    initialValues: {
      amount: '',
      date: new Date(),
      expenseName: '',
      expenseIcon: 'defaultIcon',
      id: '',
    },
    validationSchema: ADD_EXPENSE_SCHEMA,
    onSubmit: (values: AddExpenseType, { resetForm }) => {
      let finalValue: ExpenseType = {
        ...values,
        id: Date.now().toString(),
        date: values.date.toDateString(),
        expenseCategories: selectedType,
      };
      setData(prev => [...prev, finalValue]);
      resetForm();
      setSelectedType('income');
      Keyboard.dismiss();
    },
  });

  const _deleteEntry = (id: string) => {
    const filtered = data.filter(item => {
      return item.id !== id;
    });
    setData(filtered);
  };

  const _handleStoreBudget = (data: ExpenseType[], userId: string) => {
    let income = 0;
    let expense = 0;

    data.forEach(item => {
      const amount = parseFloat(item.amount.replace(/,/g, ''));
      if (item.expenseCategories === 'income') {
        income += amount;
      } else {
        expense += amount;
      }
    });

    const total = income - expense;

    const payloadData: SaveExpensePayload = {
      payload: data,
      userDocId: userId,
      income,
      expense,
      total,
    };

    dispatch(startAddExpense(payloadData));
    dispatch(startGetData(userId));
    setData([]);
    props.navigation.navigate(NavigationConstant.HOME_SCREEN);
  };

  const _handleAddExpense = ({ item }: { item: ExpenseType }) => {
    const iconName: IconName = item.expenseIcon || 'defaultIcon';
    const expenseCategories = expenseTypeSigin(item.expenseCategories);
    return (
      <View style={styles.entryView}>
        <View style={styles.firstView}>
          <SvgIcon
            name={iconName}
            width={scale(30)}
            height={verticalScale(30)}
          />
          <View style={styles.innerView}>
            <Text style={styles.textStyle}>{item.expenseName}</Text>
            <Text
              style={[
                styles.textStyle,
                expenseCategories === '-'
                  ? { color: COLORS.red }
                  : { color: COLORS.greenColor.colorOne },
              ]}
            >
              {expenseCategories}
              {setCurrencySigin(userDataDestructure.currency)} {item.amount}
            </Text>
          </View>
        </View>
        <View style={styles.SecondView}>
          <SvgIcon
            name="deleteIcon"
            width={scale(20)}
            height={verticalScale(20)}
            onPress={() => _deleteEntry(item.id!)}
          />
          <Text style={styles.textDateStyle}>{item.date}</Text>
        </View>
      </View>
    );
  };
  if (isLoadingExpenseSave) {
    return <ActivityIndicator />;
  }

  const _handleBackNavigation = () => {
    formik.setErrors({});
    formik.setTouched({});
    props.navigation.goBack();
  };

  return (
    <HomeWrappers>
      <View style={styles.headerComponent}>
        <HeaderComponent
          headerTiltle="Add Expense"
          headerType="home"
          onBackPress={_handleBackNavigation}
        />
      </View>
      <View style={styles.otherHalfComponent}>
        <View style={styles.expenseTypeView}>
          <TouchableOpacity
            onPress={() => setSelectedType('income')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedType === 'income'
                  ? ['#69AEA9', '#3F8782']
                  : ['#E0E0E0', '#BDBDBD']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text
                style={[
                  styles.typeBtn,
                  { color: selectedType === 'income' ? '#fff' : '#333' },
                ]}
              >
                {STRING_CONFIG.addExpense.incomeText}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Expense Button */}
          <TouchableOpacity
            onPress={() => setSelectedType('expense')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedType === 'expense'
                  ? ['#69AEA9', '#3F8782']
                  : ['#E0E0E0', '#BDBDBD']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text
                style={[
                  styles.typeBtn,
                  { color: selectedType === 'expense' ? '#fff' : '#333' },
                ]}
              >
                {STRING_CONFIG.addExpense.expenseText}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.formView}>
          <InputWithLogoScreen
            value={formik.values.expenseName}
            onChangeText={formik.handleChange('expenseName')}
            containerStyle={{ marginVertical: verticalScale(12) }}
            errorMessage={
              formik.touched.expenseName ? formik.errors.expenseName : ''
            }
            svgSelectedName={iconName =>
              formik.setFieldValue('expenseIcon', iconName)
            }
          />
          <InputCompnent
            value={formik.values.amount}
            onChangeText={formik.handleChange('amount')}
            placeHolder="Enter Amount"
            isCurrencyUsed={true}
            countryCode={userDataDestructure.currency}
            containerStyle={styles.amountContainer}
            inputStyle={styles.amountInputStyle}
            errorMessage={formik.touched.amount ? formik.errors.amount : ''}
            keyBoardType="number-pad"
          />

          <DateComponent
            value={formik.values.date}
            onPressIn={() => Keyboard.dismiss()}
            onChange={(date: Date) => {
              formik.setFieldValue('date', date);
            }}
            errorMessage={
              typeof formik.errors.date === 'string'
                ? formik.errors.date
                : undefined
            }
          />
        </View>
        <CustomButton
          btnTitleName="+ Add to List"
          onPress={formik.handleSubmit}
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            {STRING_CONFIG.addExpense.footerText}
          </Text>
          <View style={styles.listView}>
            {data.length !== 0 ? (
              <>
                <View style={styles.flatListView}>
                  <FlatList
                    data={data.reverse()}
                    renderItem={_handleAddExpense}
                    keyExtractor={(item, index) => item.id ?? index.toString()}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={4}
                  />
                </View>
              </>
            ) : (
              <View style={styles.noDataView}>
                <SvgIcon
                  name="noDataImage"
                  width={scale(200)}
                  height={verticalScale(200)}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.mainBtn}>
        {data.length !== 0 && (
          <CustomButton
            btnTitleName="Budget It"
            onPress={() => _handleStoreBudget(data, docUserId)}
          />
        )}
      </View>
    </HomeWrappers>
  );
};

export default AddExpense;

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
  formView: {
    backgroundColor: COLORS.white,
    padding: moderateScale(8),
    borderRadius: moderateScale(22),
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInputStyle: {
    flex: 1,
  },
  footerView: {
    marginVertical: verticalScale(22),
    marginHorizontal: scale(24),
  },
  listView: {
    marginTop: verticalScale(6),
  },
  entryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    marginVertical: verticalScale(6),
    padding: moderateScale(8),
    borderRadius: moderateScale(12),
    borderColor: COLORS.greenColor.colorOne,
  },
  firstView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  innerView: {
    marginHorizontal: verticalScale(12),
    alignItems: 'flex-start',
  },
  textStyle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: COLORS.black,
    textAlign: 'center',
    paddingVertical: verticalScale(2),
  },
  SecondView: {
    alignItems: 'flex-end',
  },
  textDateStyle: {
    paddingTop: verticalScale(4),
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLORS.shadesOfGrey.greyPrimary,
  },
  footerText: {
    fontSize: moderateScale(18),
    color: COLORS.black,
    fontWeight: '600',
  },
  noDataView: {
    alignItems: 'center',
    marginVertical: verticalScale(22),
  },
  expenseTypeView: {
    flexDirection: 'row',
    marginVertical: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonGradient: {
    alignItems: 'center',
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginHorizontal: scale(12),
  },
  typeBtn: {
    paddingVertical: verticalScale(22),
    paddingHorizontal: scale(32),
    color: COLORS.white,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  mainBtn: {
    backgroundColor: COLORS.white,
    paddingBottom: verticalScale(22),
  },
  flatListView: {
    paddingBottom: verticalScale(382),
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import SvgIcon from './svgComponent';
import { COLORS } from '../utils/colorConstant';
import { moderateScale, scale, verticalScale } from '../helpers/dimentions';
import { formatCurrency, setCurrencySigin } from '../utils/helperFunction';

interface cardDataProps {
  totalBalance: string;
  currencyType: string;
  Income: string;
  expense: string;
}

const CardUi: React.FC<cardDataProps> = ({
  totalBalance = '2000',
  currencyType = 'INR',
  Income = '2000',
  expense = '2000',
}) => {
  return (
    <TouchableOpacity style={styles.mainCardView}>
      <View style={styles.subView}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Total Balance</Text>
          <Text style={styles.totalBalance}>
            {setCurrencySigin(currencyType)}{' '}
            {formatCurrency(totalBalance, currencyType)}
          </Text>
        </View>
        <View style={styles.footerView}>
          <View style={styles.leftComponent}>
            <View style={styles.svgComponent}>
              <SvgIcon
                name="arrowDown"
                width={scale(26)}
                height={verticalScale(26)}
                style={{
                  backgroundColor: COLORS.primaryColor,
                  borderRadius: 50,
                }}
              />
              <Text style={styles.footerText}>Income</Text>
            </View>
            <Text style={[styles.secondaryText, { marginLeft: scale(12) }]}>
              {setCurrencySigin(currencyType)} {''}
              {formatCurrency(Income, currencyType)}
            </Text>
          </View>
          <View style={styles.rightComponent}>
            <View style={styles.svgComponent}>
              <SvgIcon
                name="arrowUp"
                width={scale(26)}
                height={verticalScale(26)}
                style={{
                  backgroundColor: COLORS.primaryColor,
                  borderRadius: 50,
                }}
              />
              <Text style={styles.footerText}>Expense</Text>
            </View>
            <Text style={styles.secondaryText}>
              {' '}
              {setCurrencySigin(currencyType)}{' '}
              {formatCurrency(expense, currencyType)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardUi;

const styles = StyleSheet.create({
  mainCardView: {
    backgroundColor: COLORS.cardGreenColor,
    marginHorizontal: scale(12),
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    bottom: verticalScale(132),
  },
  subView: {
    paddingVertical: verticalScale(12),
  },
  headerView: {
    marginBottom: verticalScale(6),
    alignItems: 'flex-start',
    paddingHorizontal: scale(12),
  },
  headerText: {
    fontSize: moderateScale(18),
    color: COLORS.white,
    fontWeight: '500',
    marginBottom: verticalScale(4),
    letterSpacing: 0.5,
  },
  totalBalance: {
    fontSize: moderateScale(24),
    color: COLORS.white,
    fontWeight: '600',
    marginBottom: verticalScale(4),
    letterSpacing: 0.5,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(12),
    paddingHorizontal: scale(12),
  },
  leftComponent: {
    flex: 0.5,
    alignItems: 'flex-start',
  },
  svgComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  footerText: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    marginHorizontal: scale(6),
    color: COLORS.white,
  },
  secondaryText: {
    fontSize: moderateScale(24),
    color: COLORS.white,
    fontWeight: '700',
  },
  rightComponent: {
    flex: 0.5,
    alignItems: 'center',
  },
});

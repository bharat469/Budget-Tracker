import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import SvgIcon from './svgComponent';
import { COLORS } from '../utils/colorConstant';
import { moderateScale, scale, verticalScale } from '../helpers/dimentions';
import { formatCurrency, setCurrencySigin } from '../utils/helperFunction';
import { STRING_CONFIG } from '../utils/stringConfig';

interface cardDataProps {
  totalBalance: string;
  currencyType: string;
  Income: string;
  expense: string;
  mainCardStyle: any;
  salary: string;
}

const CardUi: React.FC<cardDataProps> = ({
  totalBalance = '0',
  currencyType = 'INR',
  Income = '0',
  expense = '00',
  salary = '0',
  mainCardStyle,
}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.mainCardView, mainCardStyle]}>
        <View style={styles.headerComponent}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>
              {STRING_CONFIG.HomeString.totalBalance}
            </Text>
            <Text style={styles.totalBalance}>
              {setCurrencySigin(currencyType)}{' '}
              {formatCurrency(totalBalance, currencyType)}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>
              {STRING_CONFIG.HomeString.monthlySalary}
            </Text>
            <Text style={styles.totalBalance}>
              {setCurrencySigin(currencyType)}{' '}
              {formatCurrency(salary, currencyType)}
            </Text>
          </View>
        </View>
        <View style={styles.footerView}>
          <View style={styles.leftComponent}>
            <View style={styles.svgComponent}>
              <SvgIcon
                name="arrowDown"
                width={scale(26)}
                height={verticalScale(26)}
                style={styles.arrowStyle}
              />
              <Text style={styles.footerText}>
                {STRING_CONFIG.HomeString.Income}
              </Text>
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
                style={styles.arrowStyle}
              />
              <Text style={styles.footerText}>
                {STRING_CONFIG.HomeString.Expense}
              </Text>
            </View>
            <Text style={styles.secondaryText}>
              {' '}
              {setCurrencySigin(currencyType)}{' '}
              {formatCurrency(expense, currencyType)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    paddingVertical: verticalScale(12),
  },
  headerComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: verticalScale(12),
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
  arrowStyle: {
    backgroundColor: COLORS.greenColor.colorOne,
    borderRadius: 50,
  },
});

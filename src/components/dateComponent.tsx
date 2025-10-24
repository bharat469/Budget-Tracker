import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import SvgIcon from './svgComponent';
import { moderateScale, scale, verticalScale } from '../helpers/dimentions';
import { COLORS } from '../utils/colorConstant';
import { STRING_CONFIG } from '../utils/stringConfig';
import DatePicker from 'react-native-date-picker';

interface datePicker {
  value: Date;
  onChange: (selectedDate: Date) => void;
  errorMessage?: string;
  onPressIn?: () => void;
}

const DateComponent: React.FC<datePicker> = ({
  value,
  onChange,
  errorMessage = '',
  onPressIn,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const _handleDate = (date: string) => {
    setIsOpen(true);
    const currentlyFocusedInput = TextInput.State.currentlyFocusedInput?.();
    if (currentlyFocusedInput) {
      TextInput.State.blurTextInput(currentlyFocusedInput);
    }
    onPressIn;
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={3}
        style={styles.dateComponent}
        onPress={() => _handleDate('dd-mm-yyyy')}
      >
        <SvgIcon
          name="calenderIcon"
          width={scale(30)}
          height={verticalScale(30)}
        />
        <Text style={styles.textDate}>
          {!value ? STRING_CONFIG.addExpense.datePicker : value.toDateString()}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={isOpen}
        date={value}
        mode="date"
        onConfirm={selectedDate => {
          setIsOpen(false);
          onChange(selectedDate);
        }}
        maximumDate={value}
      />
      {errorMessage.length !== 0 && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default DateComponent;

const styles = StyleSheet.create({
  dateComponent: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(22),
    borderColor: COLORS.primaryColor,
    alignItems: 'center',
    marginVertical: verticalScale(12),
    padding: moderateScale(6),
  },
  textDate: {
    padding: moderateScale(12),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.black,
  },
  errorMessage: {
    textAlign: 'center',
    paddingTop: verticalScale(6),
    marginHorizontal: scale(22),
    fontSize: moderateScale(14),
    color: COLORS.red,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

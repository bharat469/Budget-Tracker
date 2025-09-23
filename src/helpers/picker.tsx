import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { STRING_CONFIG } from '../utils/stringConfig';
import { moderateScale, scale, verticalScale } from './dimentions';
import { COLORS } from '../utils/colorConstant';
import SvgIcon from '../components/svgComponent';
import BottomSheetComponent from '../components/bottomSheetComponent';
import { EmployeeStatus } from '../utils/typeConfig';

type EmploymentStatusDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  dataArray?: [];
};

const EmploymentStatusDropdown: React.FC<EmploymentStatusDropdownProps> = ({
  value,
  onChange,
  error,
  dataArray = STRING_CONFIG.employeeStatusArray,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const _handleOpenDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const _handleOnCancelDropdown = () => {
    setIsOpenDropdown(false);
  };

  const _handleSelection = (item: string) => {
    onChange(item);
    setIsOpenDropdown(false);
  };

  const _handleRenderItem: ListRenderItem<EmployeeStatus> = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.selectionContainer}
          onPress={() => _handleSelection(item.value)}
          activeOpacity={1}
        >
          <Text style={styles.labelText}>{item.label}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={_handleOpenDropdown}>
        <View>
          <View style={styles.container}>
            <Text style={styles.label}>
              {value
                ? dataArray.find(opt => opt.value === value)?.label
                : STRING_CONFIG.RegisterScreenString.PickerPlaceHolder}
            </Text>
            <SvgIcon
              name={isOpenDropdown ? 'dropdownClose' : 'dropdownOpen'}
              width={scale(26)}
              height={verticalScale(26)}
              style={{ marginRight: 12 }}
            />
          </View>
          {error?.length !== 0 && <Text style={styles.error}>{error}</Text>}
        </View>
      </TouchableWithoutFeedback>
      <BottomSheetComponent
        isVisible={isOpenDropdown}
        onBackdropPress={_handleOnCancelDropdown}
      >
        <View style={styles.bottomSheetView}>
          <FlatList
            data={dataArray}
            keyExtractor={item => item.value}
            renderItem={_handleRenderItem}
          />
        </View>
      </BottomSheetComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(12),
    borderWidth: 1,
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(22),
    borderColor: COLORS.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    padding: 12,
    color: '#333',
  },

  error: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
  bottomSheetView: {
    backgroundColor: COLORS.white,
    marginHorizontal: scale(12),
    borderRadius: moderateScale(8),
    padding: moderateScale(20),
  },
  selectionContainer: {
    marginVertical: verticalScale(22),
    backgroundColor: COLORS.primaryColor,
    padding: moderateScale(12),
  },
  labelText: {
    fontSize: moderateScale(18),
    color: COLORS.white,
  },
});

export default EmploymentStatusDropdown;

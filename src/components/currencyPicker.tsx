import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { CurrencyPickerType } from '../utils/typeConfig';
import { DEFAULT_CURRENCIES } from '../utils/staticArray';
import { STRING_CONFIG } from '../utils/stringConfig';
import BottomSheetComponent from './bottomSheetComponent';
import {
  moderateScale,
  scale,
  SCREEN,
  verticalScale,
} from '../helpers/dimentions';
import { COLORS } from '../utils/colorConstant';

type filteredType = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
};

const CurrencyPicker: React.FC<CurrencyPickerType> = ({
  value = 'INR',
  onChange = () => {},
  preferred = '',
  showFlags = true,
  currencies = DEFAULT_CURRENCIES,
  placeholder = STRING_CONFIG.RegisterScreenString.SelectCurrency,
  style = {},
  errors = '',
}) => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => {
    const pref = currencies.filter(c => c.code === preferred);
    const rest = currencies.filter(c => c.code !== preferred);
    return [...pref, ...rest];
  }, [currencies, preferred]);

  const filtered = useMemo(() => {
    if (!query) return sorted;
    const q = query.toLowerCase();
    return sorted.filter(
      c =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        (c.symbol && String(c.symbol).toLowerCase().includes(q)),
    );
  }, [query, sorted]);

  const _handleClose = () => {
    setQuery('');
    setVisible(false);
  };

  const _handleSelectedValue = (code: string) => {
    onChange(code);
    setVisible(false);
    setQuery('');
  };

  const _handleCurrencyData = ({ item }: { item: filteredType }) => {
    return (
      <TouchableOpacity
        style={styles.itemData}
        activeOpacity={0.7}
        onPress={() => _handleSelectedValue(item.code)}
      >
        <Text style={styles.itemText}>
          {showFlags ? item.flag + '' : ''}
          {'  '} {item.code}-{item.name}
          {item.symbol ? `(${item.symbol})` : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  const selected = currencies.find(c => c.code === value);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={styles.container}>
          <Text style={styles.selectedText}>
            {selected
              ? `${showFlags ? selected.flag + ' ' : ''}${selected.code} - ${
                  selected.name
                }`
              : placeholder}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {errors.length !== 0 && <Text style={styles.error}>{errors}</Text>}
      {visible && (
        <BottomSheetComponent
          isVisible={visible}
          onBackdropPress={_handleClose}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <TouchableOpacity onPress={_handleClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>X</Text>
              </TouchableOpacity>
              <View style={styles.header}>
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder={
                    STRING_CONFIG.RegisterScreenString.SearchCurrency
                  }
                  style={styles.searchTextInput}
                  autoFocus
                  placeholderTextColor={COLORS.black}
                />
              </View>
              <FlatList
                data={filtered}
                keyExtractor={item => item.code}
                keyboardShouldPersistTaps="handled"
                renderItem={_handleCurrencyData}
                style={{ marginBottom: verticalScale(22) }}
              />
            </View>
          </View>
        </BottomSheetComponent>
      )}
    </>
  );
};

export default CurrencyPicker;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(12),
    borderWidth: 1,
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(22),
    borderColor: COLORS.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    padding: moderateScale(12),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.black,
  },
  error: {
    textAlign: 'center',
    paddingTop: verticalScale(6),
    marginHorizontal: scale(22),
    fontSize: moderateScale(14),
    color: COLORS.red,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalCard: {
    height: SCREEN.HEIGHT / 2,
    backgroundColor: COLORS.lightGreen,
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
  },
  header: {
    marginHorizontal: scale(12),
    marginVertical: verticalScale(12),
  },
  searchTextInput: {
    borderWidth: 1,
    borderColor: COLORS.primaryColor,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    marginRight: 8,
    color: COLORS.black,
    fontSize: moderateScale(16),
  },
  closeBtn: {
    alignItems: 'flex-end',
    marginTop: verticalScale(12),
    marginHorizontal: scale(12),
  },
  closeText: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: COLORS.primaryColor,
  },
  itemData: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryColor,
    marginHorizontal: scale(12),
  },
  itemText: {
    fontSize: moderateScale(18),
    color: COLORS.black,
    fontWeight: '600',
  },
});

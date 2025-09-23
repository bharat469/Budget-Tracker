import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';
import { STRING_CONFIG } from '../../utils/stringConfig';
import { moderateScale, verticalScale } from '../../helpers/dimentions';
import { COLORS } from '../../utils/colorConstant';
import InputCompnent from '../../components/inputCompnent';
import CustomButton from '../../components/customButton';
import { useValidation } from '../../helpers/yupAdapter';
import { REGISTER_SCHEMA } from '../../helpers/validationsHook';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationConstant } from '../../utils/navConstant';
import { RootState } from '../../helpers/redux/store';
import { startUserData } from '../../helpers/redux/slice/userSlice';
import EmploymentStatusDropdown from '../../helpers/picker';
import CurrencyPicker from '../../components/currencyPicker';
import { storage } from '../../helpers/asyncStorageHelpers';
import { STORAGE_STRING } from '../../utils/storageConstant';

const RegisterScreen = (props: any) => {
  const dispatch = useDispatch();
  const { imageUrl } = useSelector((state: RootState) => state.userData);
  const { googleSiginData, FacebookSiginData } = useSelector(
    (state: RootState) => state.auth,
  );
  const [loginType, setLoginType] = useState({
    email: false,

    Phone: false,
  });

  const _checkWhichLoginMethod = async () => {
    const SavedEmail = await storage.get(STORAGE_STRING.EMAIL);
    const SavedPhone = await storage.get(STORAGE_STRING.PHONE_NUMBER);
    if (SavedEmail) {
      setLoginType({ ...loginType, email: true });
      formik.setFieldValue('email', SavedEmail);
    } else if (SavedPhone) {
      setLoginType({ ...loginType, Phone: true });
      formik.setFieldValue('phoneNumber', SavedPhone);
    }
  };

  useEffect(() => {
    _checkWhichLoginMethod();
  }, []);

  const _handleProfilePic = () => {
    if (googleSiginData?.photo) {
      return googleSiginData.photo;
    } else if (FacebookSiginData?.photo) {
      return FacebookSiginData.photo;
    } else {
      return imageUrl;
    }
  };

  const formatPhoneNumber = (number: string) => {
    if (!number) return '';

    let clean = number.trim();

    // Remove quotes if they exist
    clean = clean.replace(/"/g, '');

    // Remove non-digit characters except leading +
    if (clean.startsWith('+')) {
      clean = '+' + clean.slice(1).replace(/\D/g, '');
    } else {
      clean = clean.replace(/\D/g, '');
    }

    // Already starts with +91 → keep
    if (clean.startsWith('+91') && clean.length === 13) {
      return clean;
    }

    // If 10 digits → add +91
    if (clean.length === 10) {
      return `+91${clean}`;
    }

    // If starts with 91 and 12 digits → add +
    if (clean.length === 12 && clean.startsWith('91')) {
      return `+${clean}`;
    }
    console.log(clean, 'shdkjs1111');
    // fallback
    return clean;
  };

  const formik = useValidation({
    initialValues: {
      name: '',
      currency: 'INR',
      monthlyIncome: '',
      employmentStatus: '',
      email: '',
      phoneNumber: '',
    },
    validationSchema: REGISTER_SCHEMA(loginType),
    onSubmit: values => {
      const data = {
        name: values.name,
        email: values.email,
        phoneNumber: formatPhoneNumber(values.phoneNumber),
        currency: values.currency,
        monthlyIncome: values.monthlyIncome,
        emplomentStatus: values.employmentStatus,
        profilePic: _handleProfilePic(),
      };
      dispatch(startUserData(data));
      props.navigation.navigate(NavigationConstant.HOME_SCREEN);
    },
  });

  return (
    <AuthWrappers
      isSvgShow={true}
      svgIconName="registerSvgIcon"
      headingText={STRING_CONFIG.RegisterScreenString.RegisterHeading}
      showHeader
      headerTitle="Register Screen"
    >
      <View style={styles.textView}>
        <Text style={styles.headerText}>
          {STRING_CONFIG.RegisterScreenString.RegisterSubHeading}
        </Text>
      </View>
      <InputCompnent
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        placeHolder={STRING_CONFIG.basicInfoString.fullName}
        errorMessage={formik.touched.name ? formik.errors.name : ''}
        containerStyle={{ marginTop: verticalScale(12) }}
      />
      {!loginType.email ? (
        <InputCompnent
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          placeHolder={STRING_CONFIG.basicInfoString.emailAddress}
          errorMessage={formik.touched.email ? formik.errors.email : ''}
          containerStyle={{ marginTop: verticalScale(12) }}
        />
      ) : (
        <InputCompnent
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange('phoneNumber')}
          placeHolder={STRING_CONFIG.basicInfoString.phoneNumber}
          keyBoardType="number-pad"
          errorMessage={
            formik.touched.phoneNumber ? formik.errors.phoneNumber : ''
          }
          containerStyle={{ marginTop: verticalScale(12) }}
        />
      )}

      <CurrencyPicker
        value={formik.values.currency}
        onChange={formik.handleChange('currency')}
        errors={formik.touched.currency ? formik.errors.currency : ''}
      />

      <InputCompnent
        value={formik.values.monthlyIncome}
        onChangeText={formik.handleChange('monthlyIncome')}
        placeHolder={STRING_CONFIG.basicInfoString.monthlyIncome}
        errorMessage={
          formik.touched.monthlyIncome ? formik.errors.monthlyIncome : ''
        }
        containerStyle={{ marginTop: verticalScale(12) }}
        keyBoardType="number-pad"
        isCurrencyUsed={true}
        countryCode={formik.values.currency}
      />
      <EmploymentStatusDropdown
        value={formik.values.employmentStatus}
        onChange={formik.handleChange('employmentStatus')}
        error={
          formik.touched.employmentStatus ? formik.errors.employmentStatus : ''
        }
      />

      <CustomButton
        btnTitleName={STRING_CONFIG.RegisterScreenString.RegisterBtnText}
        customStyle={{ marginVertical: verticalScale(12) }}
        onPress={formik.handleSubmit}
      />
    </AuthWrappers>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  headerText: {
    fontSize: moderateScale(22),
    color: COLORS.black,
    fontWeight: '700',
    marginBottom: moderateScale(6),
    letterSpacing: 0.6,
  },
  textView: {
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
});

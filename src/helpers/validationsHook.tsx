import * as Yup from 'yup';
import { STRING_CONFIG } from '../utils/stringConfig';

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const isValidPassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/.test(password);

export const passwordRules = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  specialChar: /[@$!%*?#&]/.test(password),
});

export const isValidPhoneNumber = (phone: string) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email(STRING_CONFIG.errorText.emailError)
    .required(STRING_CONFIG.errorText.empty.Email)
    .test('email-rules', STRING_CONFIG.errorText.emailError, value => {
      if (!value) return false;
      return isValidEmail(value);
    }),
  password: Yup.string()
    .min(6, STRING_CONFIG.errorText.passwordError)
    .required(STRING_CONFIG.errorText.empty.Password)
    .test('password-rules', STRING_CONFIG.errorText.passwordError, value => {
      if (!value) return false;
      const rules = passwordRules(value);
      return (
        rules.length &&
        rules.uppercase &&
        rules.lowercase &&
        rules.number &&
        rules.specialChar
      );
    }),
});

export const PHONE_NUMBER_SCHEMA = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, STRING_CONFIG.errorText.minPhoneError)
    .required(STRING_CONFIG.errorText.empty.phone)
    .test('phoneNumber-rules', STRING_CONFIG.errorText.phoneError, value => {
      if (!value) return false;
      return isValidPhoneNumber(value);
    }),
});

export const VALID_OTP = Yup.object().shape({
  otpNumber: Yup.string().required(STRING_CONFIG.errorText.empty.Otp),
});

export const PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .min(6, STRING_CONFIG.errorText.passwordError)
    .required(STRING_CONFIG.errorText.empty.Password)
    .test('password-rules', STRING_CONFIG.errorText.passwordError, value => {
      if (!value) return false;
      const rules = passwordRules(value);
      return (
        rules.length &&
        rules.uppercase &&
        rules.lowercase &&
        rules.number &&
        rules.specialChar
      );
    }),
  confirmPassword: Yup.string().required(
    STRING_CONFIG.errorText.empty.Password,
  ),
});



export const REGISTER_SCHEMA = (loginType: any) =>
  Yup.object().shape({
    name: Yup.string().required(STRING_CONFIG.errorText.empty.name),

    monthlyIncome: Yup.string()
      .required('Monthly income is required')
      .test('is-valid-number', 'Monthly income must be a number', value => {
        if (!value) return false;
        const clean = value.replace(/,/g, '');
        return !isNaN(Number(clean));
      })
      .test('is-positive', 'Monthly income must be positive', value => {
        if (!value) return false;
        const clean = value.replace(/,/g, '');
        return Number(clean) > 0;
      }),

    employmentStatus: Yup.string()
      .oneOf(['employed', 'unemployed', 'student'], 'Invalid employment status')
      .required('Employment status is required'),

    email: Yup.string().when([], {
      is: () => !loginType.email, // only validate if loginType.email is true
      then: schema =>
        schema.email('Invalid email format').required('Email is required'),
      otherwise: schema => schema.notRequired(),
    }),

    phoneNumber: Yup.string().when([], {
      is: () => !loginType.Phone, // only validate if loginType.phone is true
      then: schema =>
        schema
          .matches(
            /^[0-9]{10}$/,
            'Phone number must be a valid 10-digit number',
          )
          .required('Phone number is required'),
      otherwise: schema => schema.notRequired(),
    }),

    currency: Yup.string()
      .length(3, 'Currency code must be exactly 3 characters (ISO format)')
      .required('Currency code is required'),
  });


 export const ADD_EXPENSE_SCHEMA = Yup.object().shape({
   expenseName: Yup.string().required('Expense cannot be empty '),

   amount: Yup.string()
     .required('Amount is required')
     .test('is-valid-number', 'Amount must be a number', value => {
       if (!value) return false;
       const clean = value.replace(/,/g, '');
       return !isNaN(Number(clean));
     })
     .test('is-positive', 'Amount must be positive', value => {
       if (!value) return false;
       const clean = value.replace(/,/g, '');
       return Number(clean) > 0;
     }),

   date: Yup.date().required('Date is required'),

   logo: Yup.string().url('Logo must be a valid URL').optional(),
 });

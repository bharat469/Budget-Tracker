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

export const REGISTER_SCHEMA = Yup.object().shape({
  name: Yup.string().required(STRING_CONFIG.errorText.empty.name),
  Email: Yup.string()
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
  confirmPassword: Yup.string().required(
    STRING_CONFIG.errorText.empty.Password,
  ),
});

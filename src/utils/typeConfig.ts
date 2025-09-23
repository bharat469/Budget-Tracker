import { ReactNode } from 'react';

export type KeyboardType =
  | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad'
  | 'number-pad'
  | 'decimal-pad'
  | 'visible-password'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'name-phone-pad'
  | 'twitter'
  | 'web-search';

export type ImagePickerFrom = 'camera' | 'gallery' | 'both';

export type Authtentication = {
  email: string;
  password: string;
};
export type UserData = {
  name: string;
  email: string;
  phoneNumber: string;
  monthlyIncome: string;
  profilePic: Base64URLString;
};

export type PhoneAuthentication = {
  phoneNumber: string;
};
export type VerifyAuthentication = {
  otpNumber: string;
  verificationId: string;
};
export type EmployeeStatus = {
  label: string;
  value: string;
};

export type CurrencyPickerType = {
  value?: string;
  onChange?: (code: string) => void;
  preferred?: string;
  showFlags?: boolean;
  currencies?: [];
  placeholder?: string;
  style?: ReactNode;
  errors?: string;
};

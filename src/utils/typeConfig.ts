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
    email: string;
    password: string;
    profilePic: Base64URLString;
    isVerified: boolean;
    isFirstTime: boolean;
  };

  export type PhoneAuthentication = {
    phoneNumber: string;
  };
  export type VerifyAuthentication = {
    otpNumber: string;
    verificationId: string;
  };
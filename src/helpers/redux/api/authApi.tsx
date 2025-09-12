import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  verifyPhoneNumber,
  PhoneAuthProvider,
  linkWithCredential,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from '@react-native-firebase/auth';
import {
  Authtentication,
  PhoneAuthentication,
  VerifyAuthentication,
} from '../../../utils/typeConfig';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import { authSaga } from '../saga/authSaga';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

export const LoginApi = async (payload: Authtentication) => {
  try {
    const authInstance = getAuth();
    const response = await signInWithEmailAndPassword(
      authInstance,
      payload.email,
      payload.password,
    );

    if (response && response.user) {
      return response.user;
    }
    return null; // in case no user is returned
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export const SendOtpApi = async (payload: PhoneAuthentication) => {
  try {
    const authInstance = getAuth();
    const sendOtp = await signInWithPhoneNumber(
      authInstance,
      payload.phoneNumber,
    );
    if (sendOtp) {
      return sendOtp;
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};

export const VerifyOtpApi = async (payload: VerifyAuthentication) => {
  try {
    const authInstance = getAuth();

    const credential = PhoneAuthProvider.credential(
      payload.verificationId,
      payload.otpNumber,
    );
    console.log(authInstance.currentUser, 'sghdjhs');
    let userData;
    if (!authInstance.currentUser) {
      // normal login
      userData = await signInWithCredential(authInstance, credential);
    } else if (
      authInstance.currentUser.providerData.some(p => p.providerId === 'phone')
    ) {
      // already linked
      userData = { user: authInstance.currentUser };
    } else {
      // link phone to existing account
      userData = await linkWithCredential(authInstance.currentUser, credential);
    }

    return userData.user;
  } catch (e: any) {
    if (e.code) {
      throw new Error(`${e.code}: ${e.message}`);
    }
    throw new Error(String(e));
  }
};

export const RegisterApi = async (payload: Authtentication) => {
  try {
    const authInstance = getAuth();
    const response = await createUserWithEmailAndPassword(
      authInstance,
      payload.email,
      payload.password,
    );
    if (response && response.user) {
      return response.user;
    }
    return null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export const LoginByGoogleOauth = async () => {
  try {
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const data = await GoogleSignin.signIn();
    console.log('_____data is ', data);
    const idToken = data.data?.idToken;
    if (!idToken) {
      throw new Error('failed to retrieve ID token from Google Sign-In');
    }
    const authInstance = getAuth();
    const googleCredential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(
      authInstance,
      googleCredential,
    );
    const { displayName, email, photoURL, uid } = userCredential.user;
    return {
      name: displayName,
      email,
      photo: photoURL,
      uid,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export const FacebookLoginApi = async () => {
  try {
    const loginResult = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (!loginResult) {
      throw new Error('NETWORK ERROR KINDLY TRY AGAIN');
    }
    const Token = await AccessToken.getCurrentAccessToken();
    if (!Token) {
      throw new Error('Failed to Retrive ID Token from facebook Sigin-in');
    }

    const facebookCrediential = await FacebookAuthProvider.credential(
      Token.accessToken,
    );

    const userCrediential = await signInWithCredential(
      getAuth(),
      facebookCrediential,
    );

    const { displayName, email, photoURL, uid } = userCrediential.user;

    return {
      name: displayName,
      email: email,
      photo: photoURL,
      uid: uid,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};
export const logout = async () => {
  try {
    const authInstance = getAuth();
    await signOut(authInstance);
    console.log('USER IS SUCCESFULLY LOGOUT ');
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};
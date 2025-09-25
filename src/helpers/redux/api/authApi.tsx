import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  linkWithCredential,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  fetchSignInMethodsForEmail,
} from '@react-native-firebase/auth';
import { initializeApp } from '@react-native-firebase/app';
import {
  Authtentication,
  PhoneAuthentication,
  VerifyAuthentication,
} from '../../../utils/typeConfig';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';

import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const getFacebookProfile = async (accessToken: string) => {
  const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`,
  );
  return response.json();
};

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

    let userData;
    if (!authInstance.currentUser) {
      userData = await signInWithCredential(authInstance, credential);
    } else if (
      authInstance.currentUser.providerData.some(p => p.providerId === 'phone')
    ) {
      userData = { user: authInstance.currentUser };
    } else {
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
  let Token: any = null;

  try {
    const loginResult = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (!loginResult) throw new Error('NETWORK ERROR KINDLY TRY AGAIN');

    Token = await AccessToken.getCurrentAccessToken();
    if (!Token) throw new Error('Failed to Retrieve ID Token from Facebook');

    const facebookCred = FacebookAuthProvider.credential(Token.accessToken);
    const userCredential = await signInWithCredential(getAuth(), facebookCred);

    const { displayName, email, photoURL, uid } = userCredential.user;

    // fallback to Graph API if Firebase didn’t give picture
    let finalPhoto: string | null = null;

    // Always try Graph API for the correct picture
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.width(1000).height(1000)&access_token=${Token.accessToken}`,
      );
      const profile = await response.json();
      finalPhoto = profile?.picture?.data?.url ?? photoURL;
    } catch {
      finalPhoto = photoURL; // fallback if Graph API fails
    }

    return { name: displayName, email, photo: finalPhoto, uid };
  } catch (error: any) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const pendingCred = FacebookAuthProvider.credential(Token?.accessToken);

      const emailFromError = error.customData?.email || error.email || null;

      let emailToCheck = emailFromError;
      if (!emailToCheck && Token) {
        const profile = await getFacebookProfile(Token.accessToken);
        emailToCheck = profile?.email ?? null;
      }

      let methods: string[] = [];
      if (emailToCheck) {
        methods = await fetchSignInMethodsForEmail(getAuth(), emailToCheck);
      }

      throw new Error(
        `This account already exists with the same email using ${
          methods[0] ?? 'another provider'
        }. Please sign in with that and then link Facebook.`,
      );
    } else {
      throw error instanceof Error ? error : new Error(String(error));
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
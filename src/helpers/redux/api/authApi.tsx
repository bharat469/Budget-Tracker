import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@react-native-firebase/auth';
import { Authtentication } from '../../../utils/typeConfig';

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

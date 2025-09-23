import { UserData } from '../../../utils/typeConfig';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { getAuth, sendEmailVerification } from '@react-native-firebase/auth';

export const StoreDataOfUser = async (payload: UserData) => {
  try {
    const docRef = await firestore()
      .collection('userInformation')
      .add({ payload });

    return docRef;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};

export const uploadImageApi = async (payload: string) => {
  try {
    const reference = storage().ref(`/profilePics/${Date.now()}.png`);

    await reference.putFile(payload);
    const url = await reference.getDownloadURL();
    return url;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};

export const GetDataUser = async () => {
  try {
    const snapshot = await firestore()
      .collection('userInformation') // 👈 your collection name
      .get();

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error(String(e));
    }
  }
};
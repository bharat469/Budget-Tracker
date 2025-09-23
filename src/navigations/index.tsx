import React, { useEffect, useState } from 'react';


import PreNavigation from './pre';
import PostNavigation from './post';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../helpers/redux/store';
import { saveUserToken } from '../helpers/redux/slice/authSlice';
import { storage } from '../helpers/asyncStorageHelpers';
import { STORAGE_STRING } from '../utils/storageConstant';
import ActivityIndicator from '../helpers/activityIndicator';

const Navigations = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await storage.get(STORAGE_STRING.USER_TOKEN); // 🔥 await here
        if (storedToken) {
          dispatch(saveUserToken(storedToken));
        } else {
          console.log('USER TOKEN NOT FOUND');
        }
      } catch (e) {
        console.log('ERROR IN RETRIEVING TOKEN', e);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return userToken ? <PostNavigation /> : <PreNavigation />;
};

export default Navigations;

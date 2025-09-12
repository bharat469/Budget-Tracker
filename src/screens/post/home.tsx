import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/customButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutStart, resetAll } from '../../helpers/redux/slice/authSlice';
import { storage } from '../../helpers/asyncStorageHelpers';
import { STORAGE_STRING } from '../../utils/storageConstant';

const Home = () => {
  const dispatch = useDispatch();
  const _handleLogout = async () => {
   dispatch(logoutStart());
  };
  return (
    <View>
      <CustomButton btnTitleName="Log out" onPress={_handleLogout} />
    </View>
  );
};

export default Home

const styles = StyleSheet.create({})
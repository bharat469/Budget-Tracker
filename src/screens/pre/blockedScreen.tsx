import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthWrappers from '../../components/wrappers/authWrappers';

const BlockedScreen = () => {
  return (
    <AuthWrappers isSvgShow>
      <View></View>
    </AuthWrappers>
  );
};

export default BlockedScreen;

const styles = StyleSheet.create({});

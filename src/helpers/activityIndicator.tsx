import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { LOTTIE_URL } from '../utils/imageUrl';
import { scale, verticalScale } from './dimentions';
import { COLORS } from '../utils/colorConstant';

const ActivityIndicator = () => {
  return (
    <View style={styles.lottieContainer}>
      <LottieView
        source={LOTTIE_URL.loaderScreen}
        autoPlay
        loop
        style={{ width: scale(200), height: verticalScale(200) }}
      />
    </View>
  );
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
  },
});

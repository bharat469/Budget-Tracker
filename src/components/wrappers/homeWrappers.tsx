import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '../../utils/colorConstant';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface homeWrapperProps {
  children: ReactNode;
}

const HomeWrappers: React.FC<homeWrapperProps> = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#429690', '#2A7C76']}
        style={styles.homeContainer}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default HomeWrappers;

const styles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  homeContainer: {
    flex: 1,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '../../utils/colorConstant';
import LinearGradient from 'react-native-linear-gradient';

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
  homeContainer: {
    flex: 1,
  },
});

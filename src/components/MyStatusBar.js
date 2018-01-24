import React from 'react';
import { StatusBar, View, Platform } from 'react-native';

const MyStatusBar = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />
    </View>
  );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = {
  container: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#000000',
  },
};

export default MyStatusBar;

import React from 'react';
import { StatusBar, View, Platform, Dimensions, StyleSheet } from 'react-native';

const isIos = Platform.OS === 'ios';
const isIphoneX = isIos && Dimensions.get('window').height === 812;
let STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
if (isIos && isIphoneX) {
  STATUSBAR_HEIGHT = 44;
}

const MyStatusBar = () => (
  <View style={styles.container}>
    <StatusBar
      barStyle="light-content"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#000000',
  },
});

export default MyStatusBar;

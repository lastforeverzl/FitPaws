import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import MyStatusBar from '../components/MyStatusBar';
import Timer from '../containers/Timer';
import TimerController from '../containers/TimerController';

const Track = () => (
  <View style={styles.container}>
    <MyStatusBar />
    <View style={styles.recordView}>
      <Timer />
    </View>
    <View style={styles.mapView}>
      <Text>MapView</Text>
    </View>
    <TimerController />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  recordView: {
    height: 100,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    flex: 1,
    backgroundColor: '#E0CA3C',
  },
});

export default Track;

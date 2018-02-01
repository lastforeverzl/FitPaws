import React from 'react';
import { View, StyleSheet } from 'react-native';

import MyStatusBar from '../components/MyStatusBar';
import Timer from '../containers/Timer';
import Controller from '../containers/Controller';
import Map from '../containers/Map';
import Distance from '../containers/Distance';

const Track = () => (
  <View style={styles.container}>
    <MyStatusBar />
    <View style={styles.recordView}>
      <Timer />
      <Distance />
    </View>
    <View style={styles.mapView}>
      <Map />
    </View>
    <Controller />
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapView: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Track;

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import StopWatch from '../components/StopWatch';
import MyStatusBar from '../components/MyStatusBar';

export default class Track extends React.Component {
  static navigationOptions = {
    title: 'Track',
  }
  constructor(props) {
    super(props);
    this.state = {
      stopWatchStart: true,
    };
  }

  handlePausePress = () => {
    this.setState({ stopWatchStart: false });
  }

  handleStartPress = () => {
    this.setState({ stopWatchStart: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <View style={styles.recordView}>
          <StopWatch
            start={this.state.stopWatchStart}
          />
          <StopWatch
            start={this.state.stopWatchStart}
          />
        </View>
        <View style={styles.mapView}>
          <Text>MapView</Text>
        </View>
        {/* <View style={styles.footer}>
          <Text style={styles.text}>This is footer.</Text>
        </View> */}
        { this.state.stopWatchStart === true
          ?
            <View style={styles.controlView}>
              <TouchableOpacity
                style={styles.pauseButton}
                onPress={this.handlePausePress}
                activeOpacity={0.8}
              >
                <Icon
                  name="pause"
                  type="material-community"
                  size={52}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          :
            <View style={styles.controlView}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={this.handleStartPress}
                activeOpacity={0.8}
              >
                <Icon
                  name="play"
                  type="material-community"
                  size={52}
                  color="#ffffff"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.stopButton} >
                <Icon
                  name="stop"
                  type="material-community"
                  size={52}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
        }
      </View>
    );
  }
}

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
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 64,
    backgroundColor: '#A799B7',
  },
  controlView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    bottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    backgroundColor: '#34495E',
    borderRadius: 80,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    backgroundColor: '#2ECC71',
    borderRadius: 72,
    marginLeft: 16,
    marginRight: 16,
  },
  stopButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    backgroundColor: '#E74C3C',
    borderRadius: 72,
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'System',
  },
});

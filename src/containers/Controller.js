import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import * as Actions from '../redux/actions';

class Controller extends React.Component {
  componentDidMount() {
    this.props.actions.startTimer();

    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      distanceFilter: 10,
      interval: 20000,
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[DEBUG] BackgroundGeolocation has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[DEBUG] BackgroundGeolocation has been stopped');
    });

    BackgroundGeolocation.on('error', ({ message }) => {
      console.log('[DEBUG] BackgroundGeolocation error', message);
      // Alert.alert('BackgroundGeolocation error', message);
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      BackgroundGeolocation.startTask((taskKey) => {
        this.props.actions.updateLocation(location, this.props.prevLatLng);
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      console.log(isRunning);
      if (!isRunning) {
        BackgroundGeolocation.start();
      }
    });
  }

  componentWillUnmount() {
    this.props.actions.resetTimer();
    BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
  }

  handlePausePress = (actions, interval) => {
    actions.stopTimer(interval);
    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      console.log(isRunning);
      if (isRunning) {
        BackgroundGeolocation.stop();
      }
    });
  }

  handleStartPress = (actions, interval) => {
    actions.startTimer(interval);
    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      console.log(isRunning);
      if (!isRunning) {
        BackgroundGeolocation.start();
      }
    });
  }

  handleStopPress = (actions) => {
    actions.showSlidingPanel();
  }

  render() {
    const {
      timerIsOn, actions, interval,
    } = this.props;

    return (
      <View>
        { timerIsOn === true ?
          <View style={styles.controlView}>
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={() => this.handlePausePress(actions, interval)}
              activeOpacity={0.8}
            >
              <Icon
                name="pause"
                type="MaterialCommunityIcons"
                size={52}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View> :
          <View style={styles.controlView}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => this.handleStartPress(actions, interval)}
              activeOpacity={0.8}
            >
              <Icon
                name="play-arrow"
                type="MaterialCommunityIcons"
                size={52}
                color="#ffffff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stopButton}
              onPress={() => this.handleStopPress(actions)}
              activeOpacity={0.8}
            >
              <Icon
                name="stop"
                type="MaterialCommunityIcons"
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

const styles = {
  controlView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    bottom: 36,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pauseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    backgroundColor: '#2C3E50',
    borderRadius: 72,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    backgroundColor: '#2ECC71',
    borderRadius: 72,
  },
  stopButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    backgroundColor: '#E74C3C',
    borderRadius: 72,
  },
};

function mapStateToProps(state) {
  return {
    timerIsOn: state.timer.isOn,
    interval: state.timer.interval,
    prevLatLng: state.location.prevLatLng,
    distanceTravelled: state.location.distanceTravelled,
    panelVisible: state.slidingPanel.panelVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controller);

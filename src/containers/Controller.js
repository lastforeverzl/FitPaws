import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button } from 'react-native-elements';

import * as Actions from '../redux/actions';

class Controller extends React.Component {
  componentDidMount() {
    this.props.actions.startTimer();
    this.startWatch();
  }

  componentWillUnmount() {
    this.props.actions.resetTimer();
    navigator.geolocation.clearWatch(this.watchID);
  }

  watchID: ?number = null;

  handlePausePress = (actions, interval) => {
    actions.stopTimer(interval);
    navigator.geolocation.clearWatch(this.watchID);
  }

  handleStartPress = (actions, interval) => {
    actions.startTimer(interval);
    this.startWatch();
  }

  handleStopPress = (actions) => {
    actions.showSlidingPanel();
  }

  startWatch = () => {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.props.actions.updateLocation(position, this.props.prevLatLng);
      },
      (error) => { alert(JSON.stringify(error)); },
      {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10,
      },
    );
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
    backgroundColor: '#34495E',
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

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

import * as TimerActions from '../redux/actions';

class TimerController extends React.Component {
  componentDidMount() {
    this.props.actions.startTimer();
  }

  componentWillUnmount() {
    this.props.actions.resetTimer();
  }

  handlePausePress = (actions) => {
    actions.stopTimer();
  }

  render() {
    const {
      time, timerIsOn, actions, interval,
    } = this.props;
    console.log(`TestButton ${timerIsOn} ${time}`);
    return (
      <View>
        { timerIsOn === true ?
          <View style={styles.controlView}>
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={() => actions.stopTimer(interval)}
              activeOpacity={0.8}
            >
              <Icon
                name="pause"
                type="material-community"
                size={52}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View> :
          <View style={styles.controlView}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => actions.startTimer(interval)}
              activeOpacity={0.8}
            >
              <Icon
                name="play"
                type="material-community"
                size={52}
                color="#ffffff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.stopButton}>
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

const styles = {
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
};

function mapStateToProps(state) {
  return {
    time: state.timer.time,
    timerIsOn: state.timer.isOn,
    interval: state.timer.interval,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TimerActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerController);

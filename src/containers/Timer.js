import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TimerActions from '../redux/actions';

const format = (propsTime) => {
  const pad = (time, length) => {
    let res = time;
    while (res.length < length) {
      res = '0'.concat(res);
    }
    return res;
  };

  const t = new Date(propsTime);
  const min = pad(t.getMinutes().toString(), 2);
  const sec = pad(t.getSeconds().toString(), 2);
  return `${min}:${sec}`;
};

const Timer = ({ time }) => (
  <View>
    <Text style={[styles.counter, { fontFamily }]}>
      {format(time)}
    </Text>
    <Text style={styles.text}>Time</Text>
  </View>
);

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'monospace';

const styles = {
  counter: {
    color: '#34495E',
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 2,
  },
  text: {
    color: '#34495E',
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'center',
  },
};

function mapStateToProps(state) {
  return {
    time: state.timer.time,
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
)(Timer);

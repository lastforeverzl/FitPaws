import React from 'react';
import { View, Text, Platform } from 'react-native';

export default class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
    };
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.incrementer = null;
  }

  componentDidMount() {
    if (this.props.start) {
      this.start();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.start) {
      this.start();
    } else {
      this.pause();
    }
  }

  componentWillUnmount() {
    clearInterval(this.incrementer);
  }

  start() {
    this.incrementer = setInterval(() =>
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 }), 1000);
  }

  pause() {
    clearInterval(this.incrementer);
    this.setState({ lastClearedIncrementer: this.incrementer });
  }

  stop() {
    clearInterval(this.incrementer);
    this.setState({ secondsElapsed: 0 });
  }

  formatted = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = '0'.concat(seconds % 60).slice(-2);
    return `${min}:${sec}`;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.counter, { fontFamily }]}>
          {this.formatted(this.state.secondsElapsed)}
        </Text>
        <Text style={styles.minText}>Time</Text>
      </View>
    );
  }
}

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'monospace';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    color: '#34495E',
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 2,
  },
  minText: {
    color: '#34495E',
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'center',
  },
};

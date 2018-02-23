import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import MyStatusBar from '../components/MyStatusBar';
import Controller from './Controller';
import Map from './Map';
import BottomDrawer from './BottomDrawer';
import TimeDistance from '../components/TimeDistance';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeUnit: 'min',
    };
  }

  _timeFormat = (propsTime) => {
    const pad = (time, length) => {
      let res = time;
      while (res.length < length) {
        res = '0'.concat(res);
      }
      return res;
    };

    const t = new Date(propsTime);
    const hour = t.getUTCHours();
    const min = pad(t.getUTCMinutes().toString(), 2);
    const sec = pad(t.getUTCSeconds().toString(), 2);
    if (hour > 0) {
      this.setState({ timeUnit: 'hr' });
      const hr = pad(t.getUTCHours().toString(), 2);
      return `${hr}:${min}`;
    }
    return `${min}:${sec}`;
  };

  _renderTimeDistance = () => {
    const { time, distanceTravelled, panelVisible } = this.props;
    if (!panelVisible) {
      return (
        <TimeDistance
          time={this._timeFormat(time)}
          distance={distanceTravelled}
          timeUnit={this.state.timeUnit}
        />
      );
    }
    return null;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderTimeDistance()}
        <View style={styles.mapView}>
          <Map />
        </View>
        <Controller />
        <BottomDrawer closePanel={() => navigation.goBack()} />
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

function mapStateToProps(state) {
  return {
    time: state.timer.time,
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
)(Track);

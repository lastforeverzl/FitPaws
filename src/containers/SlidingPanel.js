import React from 'react';
import { StyleSheet, View, Text, Dimensions, Platform, ScrollView } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import * as Actions from '../redux/actions';
import TextDivider from '../components/TextDivider';
import TimeDistance from '../components/TimeDistance';
import FeelScale from './FeelScale';

const { width, height } = Dimensions.get('window');
const initialDraggableRange = {
  top: 300,
  bottom: 150,
};
const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

class SlidingPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggableRange: initialDraggableRange,
    };
  }

  getCurrentTime = () => {
    const date = new Date();
    const options = {
      year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    };
    return `${date.toLocaleString([], options)}`;
  }

  resetDraggableRange = () => {
    const range = {
      top: height - 40,
      bottom: 150,
    };
    this.setState({ draggableRange: range });
  }

  render() {
    const {
      visible, distanceTravelled, time, actions,
    } = this.props;
    return (
      <SlidingUpPanel
        visible={visible}
        draggableRange={this.state.draggableRange}
        onDrag={() => this.resetDraggableRange()}
      >
        <View style={styles.panel}>
          <View style={styles.icon}>
            <Icon
              name="user-circle"
              type="font-awesome"
              size={40}
              color="#34495E"
            />
          </View>
          <View style={styles.card}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.stripe} />
            </View>
            <View style={[{ marginTop: 30 }, { marginBottom: 10 }]}>
              <Text style={styles.text}>{this.getCurrentTime()}</Text>
            </View>
            <TextDivider text="Today's walk" />
            <TimeDistance time={time} distance={distanceTravelled} />
            <TextDivider text="How Kipper feels after the walk?" />
            <FeelScale />
          </View>
          <View style={[styles.card, { height: 200 }]}>
            <Text>Card 2</Text>
          </View>
          <View style={[styles.card, { height: 200 }]}>
            <Text>Card 3</Text>
          </View>
        </View>
      </SlidingUpPanel>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    borderRadius: 8,
  },
  content: {
    backgroundColor: '#89BD9E',
  },
  icon: {
    alignItems: 'center',
    borderRadius: 24,
    justifyContent: 'center',
    position: 'absolute',
    top: -23,
    left: 23,
    backgroundColor: '#ffffff',
    width: 46,
    height: 46,
    zIndex: 1,
  },
  panel: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 10,
  },
  stripe: {
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    height: 4,
    top: 6,
    width: 69,
    zIndex: 1,
  },
  text: {
    color: '#B9C4C5',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily,
  },
});

function mapStateToProps(state) {
  return {
    visible: state.slidingPanel.panelVisible,
    distanceTravelled: state.location.distanceTravelled,
    time: state.timer.time,
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
)(SlidingPanel);

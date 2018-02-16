import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import MyStatusBar from '../components/MyStatusBar';
import HistoryTab from '../config/HistoryTab';
import testData from '../database/testData.json';

class History extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="history" type="MaterialCommunityIcons" size={32} color={tintColor} />,
  }

  _addTestData = () => {
    console.log('add test data');
    const test = {
      id: uuid.v1(),
      time: 15,
      distance: 1.135246,
      poop: true,
      pee: true,
      routeCoordinates: JSON.stringify(testData.data),
      poopShape: 1,
      poopColor: 3,
      feelScale: 2,
      creationDate: new Date(),
    };
    this.props.actions.insertRecordToDb(test);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <TouchableOpacity
          onPress={this._addTestData}
        >
          <Text style={{ color: 'skyblue' }}>ADD</Text>
        </TouchableOpacity>
        <HistoryTab screenProps={{ navigation: this.props.navigation }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

function mapStateToProps(state) {
  return {
    historyData: state.history.historyData,
    totalTime: state.history.totalTime,
    totalDistance: state.history.totalDistance,
    avgTime: state.history.avgTime,
    avgDistance: state.history.avgDistance,
    error: state.record.error,
    loading: state.record.loading,
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
)(History);

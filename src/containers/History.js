import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import MyStatusBar from '../components/MyStatusBar';
import HistoryTab from '../config/HistoryTab';
import testData from '../database/testData.json';
import realm from '../database/schemas';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

class History extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="history" type="MaterialCommunityIcons" size={32} color={tintColor} />,
  }

  constructor(props) {
    super(props);
    realm.addListener('change', () => {
      console.log('realm get change in History.js');
      this.props.actions.queryFromDatabase();
    });
  }

  _addTestData = () => {
    console.log('add test data');
    const test = {
      id: uuid.v1(),
      time: 55,
      distance: 1.135246,
      poop: true,
      pee: true,
      routeCoordinates: JSON.stringify(testData.data),
      poopShape: 1,
      poopColor: 3,
      feelScale: 2,
      creationDate: new Date(),
    };
    console.log(test);
    this.props.actions.insertRecordToDb(test);
  }

  _rightComponent = () => {
    return (
      <TouchableOpacity
        onPress={this._addTestData}
      >
        <Text style={{ color: 'skyblue' }}>ADD</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <MyStatusBar /> */}
        {/* <TouchableOpacity
          onPress={this._addTestData}
        >
          <Text style={{ color: 'skyblue' }}>ADD</Text>
        </TouchableOpacity> */}
        <Header
          centerComponent={{ text: 'HISTORY', style: styles.headerText }}
          outerContainerStyles={{ backgroundColor: '#2C3E50', borderBottomWidth: 0 }}
          rightComponent={this._rightComponent()}
        />
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
  headerText: {
    color: '#fff',
    fontFamily,
    fontWeight: '500',
    fontSize: 20,
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

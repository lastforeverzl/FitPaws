/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './redux/actions';
import Root from './config/router';

// const App = () => (
//   <Root />
// );

class App extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    console.log('componentDidMount SplashScreen');
    actions.queryFromDatabase();
    SplashScreen.hide();
  }

  render() {
    return (
      <Root />
    );
  }
}

function mapStateToProps(state) {
  return {
    historyData: state.history.historyData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { View, StyleSheet, Image, Text, AsyncStorage, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Actions from './redux/actions';
import Root from './config/router';
import FirstAddProfile from './containers/FirstAddProfile';
import { NOT_FIRST_LAUNCH } from './config/constants';

const slides = [
  {
    key: 'first-scerrn',
    title: 'Track every walk',
    text: 'Track every walk with your pet and\nkeep an eye on of their health.',
    image: require('../assets/Track-every-walk.png'),
    // image: require('../assets/2.jpg'),
  },
  {
    key: 'second-screen',
    title: 'Review fitness history',
    text: "Review your dog's exercise habits and health.",
    image: require('../assets/review-fitness-history.png'),
    // image: require('../assets/2.jpg'),
  },
  {
    key: 'third-screen',
    title: 'Appreciate your time together',
    text: "Get an idea of how much time you're\nspending with your dog.",
    image: require('../assets/remember-time-together.png'),
    // image: require('../assets/2.jpg'),
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      showEditProfile: false,
    };
  }

  async componentWillMount() {
    const value = await AsyncStorage.getItem(NOT_FIRST_LAUNCH);
    this.setState({ showRealApp: value });
  }

  componentDidMount() {
    const { actions } = this.props;
    console.log('componentDidMount SplashScreen');
    // AsyncStorage.getItem(NOT_FIRST_LAUNCH).then(value => this.setState({ showRealApp: value }));
    actions.queryFromDatabase();
    SplashScreen.hide();
  }

  _onDone = () => {
    this.setState({ showEditProfile: true });
  }

  _onStart = () => {
    console.log('ready to start app');
    this.setState({ showRealApp: true });
    AsyncStorage.setItem(NOT_FIRST_LAUNCH, 'true');
  }

  _renderItem = props => (
    <View
      style={[styles.container, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
    >
      <Image source={props.image} style={styles.image} resizeMode="cover" />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );

  _renderDoneButton = () => (
    <View style={{ marginRight: 40 }}>
      <Text style={styles.button}>DONE</Text>
    </View>
  );

  _renderNextButton = () => (
    <View style={{ marginRight: 40 }}>
      <Text style={styles.button}>NEXT</Text>
    </View>
  );

  _renderSkipButton = () => (
    <View style={{ marginLeft: 40 }}>
      <Text style={styles.button}>SKIP</Text>
    </View>
  );

  render() {
    if (this.state.showRealApp) {
      return <Root />;
    }
    if (this.state.showEditProfile) {
      return (
        <FirstAddProfile
          onStartApp={this._onStart}
        />
      );
    }
    return (
      <AppIntroSlider
        activeDotColor="#2C3E50"
        dotColor="#95A5A6"
        onDone={this._onDone}
        onSkip={this._onDone}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        renderSkipButton={this._renderSkipButton}
        slides={slides}
        showSkipButton
      />
    );
  }
}

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#B9C4C5',
    backgroundColor: 'transparent',
    fontFamily,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 13,
  },
  title: {
    color: '#2C3E50',
    backgroundColor: 'transparent',
    fontFamily,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    color: '#2C3E50',
    fontFamily,
    fontSize: 13,
    fontWeight: '500',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 42,
  },
});

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

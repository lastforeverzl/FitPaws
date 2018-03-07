import React from 'react';
import { View, Platform, StyleSheet, AsyncStorage, Text, TouchableOpacity } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import { PROFILE_DOG_BIRTHDAY, PROFILE_DOG_IN_TAKE } from '../config/constants';

require('moment-precise-range-plugin');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: '',
      inTakeDate: '',
      duration: {
        year: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this._loadProfile();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    this._loadProfile();
  }

  componentWillUnmount() {
    console.log('Profile.js will unMount');
    clearInterval(this._interval);
  }

  _callDaysDiff = () => {
    if (this.state.inTakeDate !== '') {
      console.log(this.state.inTakeDate);
      const starts = moment(new Date(this.state.inTakeDate));
      const ends = moment();
      return ends.diff(starts, 'days');
    }
    return 0;
  }

  _calDuration = () => {
    if (this.state.inTakeDate !== '') {
      const starts = moment(new Date(this.state.inTakeDate));
      const ends = moment();
      const diff = moment.preciseDiff(starts, ends, true);
      const duration = {
        year: diff.years,
        months: diff.months,
        days: diff.days,
        hours: diff.hours,
        minutes: diff.minutes,
        seconds: diff.seconds,
      };
      this.setState({ duration });
    }
  }

  _loadProfile = async () => {
    console.log('_loadProfile');
    try {
      const birthday = await AsyncStorage.getItem(PROFILE_DOG_BIRTHDAY);
      const inTakeDate = await AsyncStorage.getItem(PROFILE_DOG_IN_TAKE);
      if (birthday !== null) {
        this.setState({ birthday });
      }
      if (inTakeDate !== null) {
        this.setState({ inTakeDate });
      }
      this._calDuration();
    } catch (e) {
      console.error('Failed to load profile.');
    }
  }

  _rightComponent = () => (
    <Icon
      component={TouchableOpacity}
      name="account-circle"
      type="MaterialCommunityIcons"
      size={32}
      color="#FFFFFF"
      containerStyle={{ marginTop: 30 }}
      onPress={() => this.props.navigation.navigate('EditProfile')}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Profile', style: styles.headerText }}
          outerContainerStyles={{ backgroundColor: '#2C3E50', borderBottomWidth: 0 }}
          rightComponent={this._rightComponent()}
        />
        <View style={styles.infoContainer}>
          <View style={styles.section}>
            <Text style={styles.text}>It’s been</Text>
            <View>
              <Text style={[styles.text, { marginVertical: 15, fontSize: 32 }]}>
                {this._callDaysDiff()} days
              </Text>
            </View>
            <Text style={styles.text}>since you are together.</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.info}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.infoText}>{this.state.duration.year}</Text>
                <Text style={[styles.infoText, { fontSize: 12, fontWeight: 'normal' }]}>Year</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.infoText}>{this.state.duration.months}</Text>
                <Text style={[styles.infoText, { fontSize: 12, fontWeight: 'normal' }]}>Month</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.infoText}>{this.state.duration.days}</Text>
                <Text style={[styles.infoText, { fontSize: 12, fontWeight: 'normal' }]}>Day</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.infoText}>{this.state.duration.hours}</Text>
                <Text style={[styles.infoText, { fontSize: 12, fontWeight: 'normal' }]}>Hour</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.infoText}>{this.state.duration.minutes}</Text>
                <Text style={[styles.infoText, { fontSize: 12, fontWeight: 'normal' }]}>Minute</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.infoText}>{this.state.duration.seconds}</Text>
                <Text style={[styles.infoText, { fontSize: 12, fontWeight: 'normal' }]}>Second</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily,
    fontWeight: '500',
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 80,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 28,
    color: '#2C3E50',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily,
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    color: '#2C3E50',
    fontSize: 13,
    fontFamily,
    fontWeight: '500',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    birthday: state.profile.birthday,
    inTakeDate: state.profile.inTakeDate,
  };
}

export default connect(mapStateToProps)(Profile);

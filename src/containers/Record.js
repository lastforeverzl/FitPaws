import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, ImageBackground } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { AVATAR_URL_KEY, PROFILE_DOG_NAME } from '../config/constants';
import RecordInfo from '../components/RecordInfo';

const initialTotal = {
  totalMinutes: 0,
  totalMile: 0,
};
const initialAvg = {
  avgMinutes: 0,
  avgMile: 0,
};

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      dogName: '',
      selectedIndex: 0,
      total: initialTotal,
      avg: initialAvg,
    };
  }

  componentWillMount() {
    this._loadProfile();
  }

  componentDidMount() {
    this._calculate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._loadProfile();
    this._calculate(nextProps);
  }

  componentWillUnmount() {
    console.log('Record componentWillUnmount');
  }

  _calculate = (props) => {
    const total = {
      totalMinutes: props.totalTime,
      totalMile: parseFloat(props.totalDistance).toFixed(1),
    };
    const avg = {
      avgMinutes: props.avgTime,
      avgMile: parseFloat(props.avgDistance).toFixed(1),
    };
    this.setState({ total });
    this.setState({ avg });
  }

  _loadProfile = async () => {
    try {
      const avatar = await AsyncStorage.getItem(AVATAR_URL_KEY);
      const dogName = await AsyncStorage.getItem(PROFILE_DOG_NAME);

      if (avatar !== null) {
        this.setState({ avatarSource: JSON.parse(avatar) });
      }
      if (dogName !== null) {
        this.setState({ dogName });
      }
    } catch (e) {
      console.error('Failed to load profile.');
    }
  }

  _handleStartPress = () => {
    this.props.navigation.navigate('Track');
  };

  _updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/terrain-map.png')} style={styles.container}>
        <View style={styles.profileView}>
          <Avatar
            width={72}
            height={72}
            rounded
            icon={{ name: 'account-circle', type: 'MaterialCommunityIcons', color: '#FFFFFF', size: 72 }}
            source={this.state.avatarSource}
            onPress={this._pressAvatar}
            overlayContainerStyle={{ backgroundColor: '#2C3E50' }}
            activeOpacity={0.7}
          />
          <Text style={styles.text}>
            {this.state.dogName}
          </Text>
        </View>
        <View style={styles.historyView}>
          <RecordInfo
            updateIndex={this._updateIndex}
            selectedIndex={this.state.selectedIndex}
            avgData={this.state.avg}
            totalData={this.state.total}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            raised
            title="START"
            rounded
            fontWeight="bold"
            iconRight={{ name: 'guide-dog', type: 'foundation', size: 25 }}
            buttonStyle={styles.button}
            onPress={this._handleStartPress}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'System',
  },
  historyText: {
    color: '#ffffff',
    fontSize: 24,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileView: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyView: {
    flex: 2,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#06D6A0',
    width: 200,
  },
});

function mapStateToProps(state) {
  return {
    totalTime: state.history.totalTime,
    totalDistance: state.history.totalDistance,
    avgTime: state.history.avgTime,
    avgDistance: state.history.avgDistance,
    avatar: state.profile.avatar,
    dogName: state.profile.dogName,
  };
}

export default connect(mapStateToProps)(Record);

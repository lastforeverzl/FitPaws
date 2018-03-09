import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text, TextInput, AsyncStorage } from 'react-native';
import { Avatar, Header } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import { AVATAR_URL_KEY, PROFILE_DOG_NAME, PROFILE_DOG_BREED, PROFILE_DOG_WEIGHT, PROFILE_DOG_BIRTHDAY, PROFILE_DOG_IN_TAKE } from '../config/constants';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      name: '',
      breed: '',
      weight: '',
      birthday: '',
      inTakeDate: '',
    };
  }

  componentWillMount() {
    this._loadProfile();
  }

  _pressDone = () => {
    this._saveProfile();
    this.props.navigation.goBack();
  }

  _pressCancel = () => {
    this.props.navigation.goBack();
  }

  _pressAvatar = () => {
    const options = {
      title: null,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  _leftComponent = () => (
    <TouchableOpacity
      onPress={this._pressCancel}
    >
      <Text style={{ color: '#FFFFFF' }}>Cancel</Text>
    </TouchableOpacity>
  )

  _loadProfile = async () => {
    try {
      const avatar = await AsyncStorage.getItem(AVATAR_URL_KEY);
      const name = await AsyncStorage.getItem(PROFILE_DOG_NAME);
      const breed = await AsyncStorage.getItem(PROFILE_DOG_BREED);
      const weight = await AsyncStorage.getItem(PROFILE_DOG_WEIGHT);
      const birthday = await AsyncStorage.getItem(PROFILE_DOG_BIRTHDAY);
      const inTakeDate = await AsyncStorage.getItem(PROFILE_DOG_IN_TAKE);

      if (avatar !== null) {
        this.setState({ avatarSource: JSON.parse(avatar) });
      }
      if (name !== null) {
        this.setState({ name });
      }
      if (breed !== null) {
        this.setState({ breed });
      }
      if (weight !== null) {
        this.setState({ weight });
      }
      if (birthday !== null) {
        this.setState({ birthday });
      }
      if (inTakeDate !== null) {
        this.setState({ inTakeDate });
      }
    } catch (e) {
      console.error('Failed to load profile.');
    }
  }

  _rightComponent = () => (
    <TouchableOpacity
      onPress={this._pressDone}
    >
      <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Done</Text>
    </TouchableOpacity>
  )

  _saveProfile = async () => {
    const { avatarSource, name, breed, weight, birthday, inTakeDate } = this.state;
    try {
      await AsyncStorage.setItem(AVATAR_URL_KEY, JSON.stringify(avatarSource));
      await AsyncStorage.setItem(PROFILE_DOG_NAME, name);
      await AsyncStorage.setItem(PROFILE_DOG_BREED, breed);
      await AsyncStorage.setItem(PROFILE_DOG_WEIGHT, weight);
      await AsyncStorage.setItem(PROFILE_DOG_BIRTHDAY, birthday);
      await AsyncStorage.setItem(PROFILE_DOG_IN_TAKE, inTakeDate);
    } catch (e) {
      console.error('Failed to save profile.');
    }
    this.props.actions.updateDogProfile(avatarSource, name, birthday, inTakeDate);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Edit Profile', style: styles.headerText }}
          leftComponent={this._leftComponent()}
          outerContainerStyles={{ backgroundColor: '#2C3E50', borderBottomWidth: 0 }}
          rightComponent={this._rightComponent()}
        />
        <View style={styles.section}>
          <Text style={styles.text}>Dog Profile</Text>
        </View>
        <View style={[styles.editSection, { height: 80 }]}>
          <Text style={styles.text}>Picture</Text>
          <Avatar
            width={56}
            height={56}
            rounded
            icon={{ name: 'account-circle', type: 'MaterialCommunityIcons', color: '#ECF0F1', size: 56 }}
            source={this.state.avatarSource}
            onPress={this._pressAvatar}
            overlayContainerStyle={{ backgroundColor: '#FFFFFF' }}
            activeOpacity={0.7}
          />
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={{ width: 150, textAlign: 'right' }}
            editable
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder="Enter dog name"
          />
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Dog Breed</Text>
          <TextInput
            style={{ width: 150, textAlign: 'right' }}
            editable
            onChangeText={breed => this.setState({ breed })}
            value={this.state.breed}
            placeholder="Enter dog breed"
          />
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Dog Weight(lb)</Text>
          <View>
            <TextInput
              style={{ width: 150, textAlign: 'right' }}
              keyboardType="numeric"
              editable
              onChangeText={weight => this.setState({ weight })}
              value={this.state.weight}
              placeholder="Enter dog weight"
            />
          </View>
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Dog Birthday</Text>
          <DatePicker
            style={{ width: 150, borderColor: '#FFFFFF' }}
            date={this.state.birthday}
            mode="date"
            placeholder="Select date"
            format="MMM DD YYYY"
            minDate="1920-05-01"
            maxDate="2018-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={birthday => this.setState({ birthday })}
            showIcon={false}
            customStyles={{
              dateInput: { borderWidth: 0, alignItems: 'flex-end' },
              dateTouchBody: { height: 0 },
              btnCancel: {
                padding: 0,
                paddingLeft: 20,
              },
              btnConfirm: {
                padding: 0,
                paddingRight: 20,
              },
            }}
          />
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Dog In-take Date</Text>
          <DatePicker
            style={{ width: 150, borderColor: '#FFFFFF' }}
            date={this.state.inTakeDate}
            mode="date"
            placeholder="Select date"
            format="MMM DD YYYY"
            minDate="1920-01-01"
            maxDate="2018-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={inTakeDate => this.setState({ inTakeDate })}
            showIcon={false}
            customStyles={{
              dateInput: { borderWidth: 0, alignItems: 'flex-end' },
              dateTouchBody: { height: 0 },
              btnCancel: {
                padding: 0,
                paddingLeft: 20,
              },
              btnConfirm: {
                padding: 0,
                paddingRight: 20,
              },
            }}
          />
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
  section: {
    height: 34,
    backgroundColor: '#F4F6F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  editSection: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily,
    fontWeight: '500',
    fontSize: 20,
  },
  text: {
    color: '#95A5A6',
    fontFamily,
    fontSize: 13,
  },
});

function mapStateToProps(state) {
  return {
    avatar: state.profile.avatar,
    dogName: state.profile.dogName,
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
)(EditProfile);

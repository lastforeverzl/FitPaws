import React from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, Text, TextInput, AsyncStorage } from 'react-native';
import { Avatar, Header, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { AVATAR_URL_KEY, PROFILE_DOG_NAME, PROFILE_DOG_BREED, PROFILE_DOG_WEIGHT, PROFILE_DOG_BIRTHDAY, PROFILE_DOG_IN_TAKE } from '../config/constants';

export default class FirstAddProfile extends React.Component {
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

  _pressAvatar = () => {
    const options = {
      title: null,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // this._saveAvatar(source);
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  _rightComponent = () => (
    <TouchableOpacity
      onPress={() => this.props.onStartApp()}
    >
      <Text style={{ color: '#2C3E50', fontWeight: 'bold' }}>Skip</Text>
    </TouchableOpacity>
  )

  _saveProfile = async () => {
    try {
      await AsyncStorage.setItem(AVATAR_URL_KEY, JSON.stringify(this.state.avatarSource));
      await AsyncStorage.setItem(PROFILE_DOG_NAME, this.state.name);
      await AsyncStorage.setItem(PROFILE_DOG_BREED, this.state.breed);
      await AsyncStorage.setItem(PROFILE_DOG_WEIGHT, this.state.weight);
      await AsyncStorage.setItem(PROFILE_DOG_BIRTHDAY, this.state.birthday);
      await AsyncStorage.setItem(PROFILE_DOG_IN_TAKE, this.state.inTakeDate);
    } catch (e) {
      console.error('Failed to save profile.');
    }
    this.props.onStartApp();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Profile Information', style: styles.headerText }}
          outerContainerStyles={{ backgroundColor: '#FFFFFF', borderBottomWidth: 0 }}
          rightComponent={this._rightComponent()}
        />
        <View style={styles.section}>
          <Text style={styles.text}>Dog Profile</Text>
        </View>
        <View style={[styles.editSection, { height: 60 }]}>
          <Text style={styles.text}>Picture</Text>
          <Avatar
            small
            rounded
            icon={{ name: 'account', type: 'material-community', size: 24 }}
            source={this.state.avatarSource}
            onPress={this._pressAvatar}
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
          />
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Dog Breed</Text>
          <TextInput
            style={{ width: 150, textAlign: 'right' }}
            editable
            onChangeText={breed => this.setState({ breed })}
            value={this.state.breed}
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
            />
          </View>
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Dog Birthday</Text>
          <DatePicker
            style={{ width: 150, borderColor: '#FFFFFF' }}
            date={this.state.birthday}
            mode="date"
            placeholder="select date"
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
            }}
          />
        </View>
        <View style={styles.editSection}>
          <Text style={styles.text}>Dog in-take Date</Text>
          <DatePicker
            style={{ width: 150, borderColor: '#FFFFFF' }}
            date={this.state.inTakeDate}
            mode="date"
            placeholder="select date"
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
            }}
          />
        </View>
        <View style={styles.buttonSection}>
          <Button
            buttonStyle={styles.button}
            containerViewStyle={{ width: '100%', marginLeft: 0 }}
            onPress={this._saveProfile}
            textStyle={{ fontFamily, fontWeight: '500', fontSize: 17 }}
            title="Let’s get started"
          />
        </View>
      </View>
    );
  }
}

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';
const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    height: 32,
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
    color: '#2C3E50',
    fontFamily,
    fontWeight: '500',
    fontSize: 20,
  },
  text: {
    color: '#95A5A6',
    fontFamily,
    fontSize: 13,
  },
  buttonSection: {
    position: 'absolute',
    bottom: 0,
  },
  button: {
    height: 49,
    width: Screen.width,
    backgroundColor: '#2C3E50',
  },
});

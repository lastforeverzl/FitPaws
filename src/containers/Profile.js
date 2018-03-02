import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Icon, Header } from 'react-native-elements';

export default class Profile extends React.Component {
  _editProfile = () => {
    console.log('_editProfile');
    this.props.navigation.navigate('EditProfile');
  }

  _rightComponent = () => (
    <Icon
      name="account-circle"
      type="MaterialCommunityIcons"
      size={32}
      color="#FFFFFF"
      containerStyle={{ marginTop: 30 }}
      onPress={this._editProfile}
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
      </View>
    );
  }
}

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily,
    fontWeight: '500',
    fontSize: 20,
  },
});

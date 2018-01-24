import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';

export default class Record extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Record',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="album" type="MaterialCommunityIcons" size={32} color={tintColor} />,
  }

  handleStartPress = () => {
    this.props.navigation.navigate('Track');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileView}>
          <Avatar
            medium
            rounded
            icon={{ name: 'user', type: 'font-awesome', color: 'black' }}
            overlayContainerStyle={{ backgroundColor: 'white' }}
            activeOpacity={0.7}
          />
          <Text style={styles.text}>
            Wenyang and Kipper
          </Text>
        </View>
        <View style={styles.historyView}>
          <Text style={styles.text}>
            On average per walk
          </Text>
          <Text style={styles.historyText}>
            16 min            1.2 mile
          </Text>
        </View>
        <View style={styles.buttonView}>
          <Button
            raised
            title="START"
            rounded
            fontWeight="bold"
            iconRight={{ name: 'guide-dog', type: 'foundation', size: 25 }}
            buttonStyle={styles.button}
            onPress={this.handleStartPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
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
    backgroundColor: '#66BB66',
    width: 250,
  },
});

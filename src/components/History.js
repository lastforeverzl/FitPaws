import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default class History extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: ({ tintColor }) =>
      <Icon name="history" type="MaterialCommunityIcons" size={32} color={tintColor} />,
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          History
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

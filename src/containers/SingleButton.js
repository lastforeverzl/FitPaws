import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

class SingleButton extends React.Component {
  _onPress = () => {
    const { id } = this.props;
    this.props.onPressItem(id);
  }

  render() {
    const buttonColor = this.props.selected ? '#34495E' : '#ECF0F1';
    const textColor = this.props.selected ? '#FFFFFF' : '#34495E';
    return (
      <View>
        <Button
          backgroundColor={buttonColor}
          color={textColor}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={this._onPress}
          rounded
          title={this.props.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    width: 113,
  },
  buttonText: {
    fontFamily,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SingleButton;

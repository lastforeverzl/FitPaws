import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

class TextField extends React.Component {
  _onFocus = () => {
    this.props.inputOnFocus();
  }

  _onChangeText = (text) => {
    this.props.text(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          editable
          onFocus={this._onFocus}
          onChangeText={this._onChangeText}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#ECF0F1',
    borderRadius: 2,
    borderWidth: 1,
    margin: 16,
  },
});

export default TextField;

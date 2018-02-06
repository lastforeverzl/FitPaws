import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextField = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        editable
        onFocus={() => props.inputOnFocus()}
        onChangeText={text => props.text(text)}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ECF0F1',
    borderRadius: 2,
    borderWidth: 1,
    margin: 16,
  },
});

export default TextField;

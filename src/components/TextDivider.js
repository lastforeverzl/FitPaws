import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

const TextDivider = ({ text }) => (
  <View style={styles.container}>
    <View style={styles.divider} />
    <View style={{ marginLeft: 16, marginRight: 16 }}>
      <Text style={[styles.text]}>{ text }</Text>
    </View>
    <View style={styles.divider} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ECF0F1',
  },
  text: {
    color: '#B9C4C5',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily,
  },
});

export default TextDivider;

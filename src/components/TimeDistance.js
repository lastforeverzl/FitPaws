import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'monospace';

const format = (propsTime) => {
  const pad = (time, length) => {
    let res = time;
    while (res.length < length) {
      res = '0'.concat(res);
    }
    return res;
  };

  const t = new Date(propsTime);
  const min = pad(t.getMinutes().toString(), 2);
  const sec = pad(t.getSeconds().toString(), 2);
  return `${min}:${sec}`;
};

const TimeDistance = ({ time, distance }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.number}>
        { format(time) }
      </Text>
      <Text style={styles.text}>Time</Text>
    </View>
    <View>
      <Text style={styles.number}>
        { parseFloat(distance).toFixed(2) }
      </Text>
      <Text style={styles.text}>Distance(mile)</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  number: {
    color: '#34495E',
    fontSize: 32,
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily,
  },
  text: {
    color: '#34495E',
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});

export default TimeDistance;

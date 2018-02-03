import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

const GradientDivider = ({ startColor, endColor, startText, endText }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[startColor, endColor]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.linearGradient} />
      </LinearGradient>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: startColor }]}>
          {startText}
        </Text>
        <Text style={[styles.text, { color: endColor }]}>
          {endText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  linearGradient: {
    flex: 1,
    height: 4,
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#ffffff',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 32,
    right: 32,
  },
});

export default GradientDivider;

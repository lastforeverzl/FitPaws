import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';

const Distance = ({ distanceTravelled }) => (
  <View>
    <Text style={[styles.distance, { fontFamily }]}>
      {parseFloat(distanceTravelled).toFixed(2)}
    </Text>
    <Text style={styles.text}>Distance(mile)</Text>
  </View>
);

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'monospace';

const styles = StyleSheet.create({
  distance: {
    color: '#34495E',
    fontSize: 40,
    textAlign: 'center',
    letterSpacing: 2,
  },
  text: {
    color: '#34495E',
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    distanceTravelled: state.location.distanceTravelled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Distance);

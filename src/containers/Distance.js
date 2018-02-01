import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MapActions from '../redux/actions';

const Distance = (props) => {
  return (
    <View>
      <Text style={[styles.distance, { fontFamily }]}>
        {parseFloat(props.distanceTravelled).toFixed(2)}
      </Text>
      <Text style={styles.text}>Distance(mile)</Text>
    </View>
  );
};

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'monospace';

const styles = {
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
};

function mapStateToProps(state) {
  return {
    distanceTravelled: state.location.distanceTravelled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MapActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Distance);

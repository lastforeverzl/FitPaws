import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

class SingleColor extends React.Component {
  _onPress = () => {
    const { id, actions } = this.props;
    this.props.onPressItem(id);
    console.log(`click poop color: ${id}`);
    actions.updatePoopColor(id);
  }

  render() {
    console.log(`poopColor props: ${this.props.poopColor}`);
    const borderColor = this.props.selected ? '#34495E' : this.props.color;
    const textColor = this.props.selected ? '#34495E' : '#B9C4C5';
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
        <View style={styles.container}>
          <View
            style={[styles.button,
              { backgroundColor: this.props.color },
              { borderColor },
            ]}
          />
          <Text style={[styles.text, { color: textColor }]} >
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 80,
    height: 72,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
  },
  button: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 3,
  },
  text: {
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily,
  },
});

function mapStateToProps(state) {
  return {
    poopColor: state.record.poopColor,
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
)(SingleColor);

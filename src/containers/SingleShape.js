import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomIcon from '../config/CustomIcon';
import * as Actions from '../redux/actions';

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

class SingleShape extends React.PureComponent {
  _onPress = () => {
    const { id, actions } = this.props;
    this.props.onPressItem(id);
    console.log(`click poop shape: ${id}`);
    actions.updatePoopShape(id);
  }

  render() {
    console.log(`poopShape props: ${this.props.poopShape}`);
    const color = this.props.selected ? '#34495E' : '#B9C4C5';
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
        <View style={styles.container}>
          <CustomIcon
            name={this.props.icon}
            size={43}
            color={color}
          />
          <Text
            style={[styles.text, { color }]}
          >
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
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
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
    poopShape: state.record.poopShape,
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
)(SingleShape);

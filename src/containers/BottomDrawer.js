import React from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button } from 'react-native-elements';
import Interactable from 'react-native-interactable';
import Collapsible from 'react-native-collapsible';
import * as Actions from '../redux/actions';
import TextDivider from '../components/TextDivider';
import TimeDistance from '../components/TimeDistance';
import FeelScale from './FeelScale';
import CustomIcon from '../config/CustomIcon';
import GradientDivider from '../components/GradientDivider';
import PoopShape from './PoopShape';
import PoopColor from './PoopColor';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75,
};
const buttonDefault = '#ECF0F1';
const buttonTextDefault = '#34495E';
const buttonClicked = '#34495E';
const buttonTextClicked = '#FFFFFF';
const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

class BottomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yesButtonColor: buttonDefault,
      noButtonColor: buttonDefault,
      yesTextColor: buttonTextDefault,
      noTextColor: buttonTextDefault,
      isCollapsed: true,
      snapPoints: [
        { y: -250 },
        { y: -50 },
        { y: 40 },
        { y: Screen.height - 300 },
        { y: Screen.height - 100 },
      ],
    };
  }

  _getCurrentTime = () => {
    const date = new Date();
    const options = {
      year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    };
    return `${date.toLocaleString([], options)}`;
  }

  _poopOnClick = (poopStatus) => {
    const { actions } = this.props;
    actions.checkIfPoop(poopStatus);
    if (poopStatus) {
      this.setState({
        isCollapsed: false,
        yesButtonColor: buttonClicked,
        yesTextColor: buttonTextClicked,
        noButtonColor: buttonDefault,
        noTextColor: buttonTextDefault,
      });
    } else {
      actions.updatePoopShape(0);
      actions.updatePoopColor(0);
      this.setState({
        isCollapsed: true,
        noButtonColor: buttonClicked,
        noTextColor: buttonTextClicked,
        yesButtonColor: buttonDefault,
        yesTextColor: buttonTextDefault,
      });
    }
  }

  renderView() {
    const {
      visible, distanceTravelled, time, poop, actions, 
    } = this.props;
    console.log(`click collapse ${poop}`);
    if (visible) {
      return (
        <View style={styles.panelContainer}>
          <Animated.View
            pointerEvents="box-none"
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: 0.5,
            }]}
          />
          <Interactable.View
            verticalOnly
            snapPoints={this.state.snapPoints}
            boundaries={{ top: -800 }}
            initialPosition={{ y: Screen.height - 130 }}
          >
            <View style={styles.panel}>
              <View style={styles.icon}>
                <Icon
                  name="user-circle"
                  type="font-awesome"
                  size={40}
                  color="#34495E"
                />
              </View>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
              <View style={[{ marginTop: 20 }, { marginBottom: 10 }]}>
                <Text style={styles.text}>{this._getCurrentTime()}</Text>
              </View>
              <TextDivider text="Today's walk" />
              <TimeDistance time={time} distance={distanceTravelled} />
              <TextDivider text="How Kipper feels after the walk?" />
              <FeelScale />
            </View>
            <View style={styles.panel}>
              <View style={styles.panelTitle}>
                <CustomIcon name="poopIcon" size={24} color="#34495E" />
                <Text style={[styles.text, styles.panelTitleText]} >Poop</Text>
              </View>
              <TextDivider text="Did Kipper poop?" />
              <View style={styles.buttonGroup}>
                <Button
                  backgroundColor={this.state.yesButtonColor}
                  color={this.state.yesTextColor}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  onPress={() => this._poopOnClick(true)}
                  rounded
                  title="YES"
                />
                <Button
                  backgroundColor={this.state.noButtonColor}
                  color={this.state.noTextColor}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  onPress={() => this._poopOnClick(false)}
                  rounded
                  title="NO"
                />
              </View>
              <Collapsible collapsed={this.state.isCollapsed}>
                <TextDivider text="What was the shape like?" />
                <GradientDivider startText="Hard" endText="Soft" startColor="#2C8C2D" endColor="#79C27B" />
                <PoopShape collapse={this.state.isCollapsed} />
                <TextDivider text="What was the color like?" />
                <GradientDivider startText="Healthy" endText="Problematic" startColor="#2C8C2D" endColor="#E74C3C" />
                <PoopColor collapse={this.state.isCollapsed} />
              </Collapsible>
            </View>
            <View style={styles.panel}>
              <View style={styles.panelTitle}>
                <CustomIcon name="peeIcon" size={24} color="#34495E" />
                <Text style={[styles.text, styles.panelTitleText]} >Pee</Text>
              </View>
            </View>

          </Interactable.View>
        </View>
      );
    }
    return null;
  }

  render() {
    return (this.renderView());
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
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
  },
  icon: {
    alignItems: 'center',
    borderRadius: 24,
    justifyContent: 'center',
    position: 'absolute',
    top: -23,
    left: 23,
    backgroundColor: '#ffffff',
    width: 46,
    height: 46,
    zIndex: 1,
  },
  panel: {
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 69,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#ECF0F1',
    marginBottom: 10,
  },
  panelTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 16,
  },
  panelTitleText: {
    color: '#34495E',
    fontWeight: '500',
    paddingLeft: 10,
  },
  text: {
    color: '#B9C4C5',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily,
  },

});

function mapStateToProps(state) {
  return {
    visible: state.slidingPanel.panelVisible,
    distanceTravelled: state.location.distanceTravelled,
    time: state.timer.time,
    poop: state.record.poop,
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
)(BottomDrawer);

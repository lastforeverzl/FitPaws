import React from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, Platform, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar, Icon, Button } from 'react-native-elements';
import Interactable from 'react-native-interactable';
import Collapsible from 'react-native-collapsible';
import uuid from 'uuid';
import * as Actions from '../redux/actions';
import TextDivider from '../components/TextDivider';
import TimeDistance from '../components/TimeDistance';
import FeelScale from './FeelScale';
import CustomIcon from '../config/CustomIcon';
import GradientDivider from '../components/GradientDivider';
import PoopShape from './PoopShape';
import PoopColor from './PoopColor';
import ToggleButton from './ToggleButton';
import TextField from './TextField';
import { AVATAR_URL_KEY, PROFILE_DOG_NAME } from '../config/constants';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75,
};
const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

/*
  *  TODO: Integrated with database to save this walk record in _pressSave() method.
  *  FIXME: Re-calculate the snapPoints of drawer to make scroll smoothly.
  */
class BottomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      snapPoints: [
        { y: -750 },
        { y: -500 },
        { y: -400 },
        { y: -250 },
        { y: -50 },
        { y: 40 },
        { y: Screen.height - 300 },
        { y: Screen.height - 100 },
      ],
      note: '',
      timeUnit: 'min',
      loading: false,
      avatarSource: null,
      dogName: 'your dog',
    };
    this._interactable = this._interactable.bind(this);
  }

  componentWillMount() {
    this._loadProfile();
  }

  _loadProfile = async () => {
    try {
      const avatar = await AsyncStorage.getItem(AVATAR_URL_KEY);
      const dogName = await AsyncStorage.getItem(PROFILE_DOG_NAME);

      if (avatar !== null) {
        this.setState({ avatarSource: JSON.parse(avatar) });
      }
      if (dogName !== null) {
        this.setState({ dogName });
      }
    } catch (e) {
      console.error('Failed to load profile.');
    }
  }

  _getCurrentTime = () => {
    const date = new Date();
    const options = {
      year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    };
    return `${date.toLocaleString([], options)}`;
  }

  _interactable(ref) {
    this._interactable_ref = ref;
  }

  _inputOnFocus = () => {
    console.log('BottomDrawer _inputOnFocus');
    // this._interactable_ref.snapTo({ index: 0 });
    const moveToY = this.state.isCollapsed ? -400 : -750;
    this._interactable_ref.changePosition({ y: moveToY });
  }

  _poopOnClick = (status) => {
    const { actions } = this.props;
    actions.updatePoopStatus(status);
    if (status) {
      this.setState({
        isCollapsed: false,
      });
    } else {
      this.setState({
        isCollapsed: true,
      });
      actions.updatePoopShape(0);
      actions.updatePoopColor(0);
    }
  }

  _peeOnClick = (status: boolean) => {
    const { actions } = this.props;
    actions.updatePeeStatus(status);
  }

  _pressSave = () => {
    const {
      time,
      distanceTravelled,
      feelScale,
      poop,
      pee,
      poopColor,
      poopShape,
      routeCoordinates,
      actions,
    } = this.props;
    this.setState({ loading: true });

    const insertData = {
      id: uuid.v1(),
      time: Math.ceil(time / 60000),
      distance: parseFloat(distanceTravelled),
      poop,
      pee,
      routeCoordinates: JSON.stringify(routeCoordinates),
      poopShape: parseInt(poopShape, 10),
      poopColor: parseInt(poopColor, 10),
      feelScale,
      note: this.state.note,
      creationDate: new Date(Date.now() - time),
    };
    console.log(insertData);

    actions.insertRecordToDb(insertData);
    this._resetTrackRecord();
    this.props.closePanel();
  }

  _resetTrackRecord = () => {
    const { actions } = this.props;
    actions.resetTimer();
    actions.resetLocation();
    actions.resetRecord();
    actions.hideSlidingPanel();
  }

  _textOnChange = (note: string) => {
    this.setState({ note });
  }

  _timeFormat = (propsTime) => {
    const pad = (time, length) => {
      let res = time;
      while (res.length < length) {
        res = '0'.concat(res);
      }
      return res;
    };

    const t = new Date(propsTime);
    const hour = t.getUTCHours();
    const min = pad(t.getUTCMinutes().toString(), 2);
    const sec = pad(t.getUTCSeconds().toString(), 2);
    if (hour > 0) {
      this.setState({ timeUnit: 'hr' });
      const hr = pad(t.getUTCHours().toString(), 2);
      return `${hr}:${min}`;
    }
    return `${min}:${sec}`;
  }

  renderView() {
    const {
      visible, distanceTravelled, time, poop, pee, error, loading
    } = this.props;
    // console.log(`click collapse: ${poop}, pee: ${pee}`);
    console.log(`error: ${error}, loading: ${loading}`);
    if (visible) {
      return (
        <View style={styles.panelContainer} pointerEvents="box-none" >
          <Animated.View
            pointerEvents="box-none"
            style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: 0.5,
            }]}
          />
          <Interactable.View
            ref={this._interactable}
            verticalOnly
            snapPoints={this.state.snapPoints}
            boundaries={{ top: -800 }}
            initialPosition={{ y: Screen.height - 200 }}
          >
            <View style={styles.panel}>
              <View style={styles.icon}>
                <Avatar
                  width={40}
                  height={40}
                  rounded
                  icon={{ name: 'account-circle', type: 'MaterialCommunityIcons', color: '#2C3E50', size: 40 }}
                  overlayContainerStyle={{ backgroundColor: '#FFFFFF' }}
                  activeOpacity={0.7}
                  source={this.state.avatarSource}
                />
              </View>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
              <View style={[{ marginTop: 20 }, { marginBottom: 10 }]}>
                <Text style={styles.text}>{this._getCurrentTime()}</Text>
              </View>
              <TextDivider text="Today's walk" />
              <TimeDistance
                time={this._timeFormat(time)}
                distance={distanceTravelled}
                timeUnit={this.state.timeUnit}
              />
              <TextDivider text={`How did ${this.state.dogName} feel after the walk?`} />
              <FeelScale />
            </View>
            <View style={styles.panel}>
              <View style={styles.panelTitle}>
                <CustomIcon name="poopIcon" size={32} color="#34495E" />
                <Text style={[styles.text, styles.panelTitleText]} >Poop</Text>
              </View>
              <TextDivider text={`Did ${this.state.dogName} poop?`} />
              <ToggleButton onPressButton={this._poopOnClick} />
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
                <CustomIcon name="peeIcon" size={32} color="#34495E" />
                <Text style={[styles.text, styles.panelTitleText]} >Pee</Text>
              </View>
              <TextDivider text={`Did ${this.state.dogName} pee?`} />
              <ToggleButton onPressButton={this._peeOnClick} />
            </View>
            <View style={styles.panel}>
              <View style={styles.panelTitle}>
                <CustomIcon name="note" size={24} color="#34495E" />
                <Text style={[styles.text, styles.panelTitleText]} >Notes</Text>
              </View>
              <TextField
                inputOnFocus={this._inputOnFocus}
                text={this._textOnChange}
                value={this.state.note}
              />
            </View>
            <Button
              loading={this.state.loading}
              disabled={this.state.loading}
              buttonStyle={styles.button}
              containerViewStyle={{ width: '100%', marginLeft: 0 }}
              fontWeight="bold"
              fontSize={14}
              raised
              rounded
              onPress={this._pressSave}
              title="SAVE"
            />
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
    backgroundColor: '#06D6A0',
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
    borderRadius: 6,
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
    routeCoordinates: state.location.routeCoordinates,
    time: state.timer.time,
    poop: state.record.poop,
    pee: state.record.pee,
    feelScale: state.record.feelScale,
    poopColor: state.record.poopColor,
    poopShape: state.record.poopShape,
    error: state.record.error,
    loading: state.record.error,
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

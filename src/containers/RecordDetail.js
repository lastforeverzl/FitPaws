import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Button } from 'react-native-elements';
import Interactable from 'react-native-interactable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import TimeDistance from '../components/TimeDistance';
import MyStatusBar from '../components/MyStatusBar';
import TextDivider from '../components/TextDivider';
import CustomIcon from '../config/CustomIcon';
import { FEEL_SCALE, POOP_SHAPE, POOP_COLOR } from '../config/constants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class RecordDetail extends React.Component {
  constructor(props) {
    super(props);
    this._mapRef = null;
    this._interactable = null;
    this.state = {
      snapPoints: [
        { y: 40 },
        { y: height - 400 },
        { y: height - 80 },
      ],
      item: {
        id: this.props.navigation.state.params.itemId,
        time: this.props.navigation.state.params.itemTime,
        distance: this.props.navigation.state.params.itemDistance,
        poop: this.props.navigation.state.params.itemPoop,
        pee: this.props.navigation.state.params.itemPee,
        routeCoordinates: this.props.navigation.state.params.itemRouteCoordinates,
        poopShape: this.props.navigation.state.params.itemPoopShape,
        poopColor: this.props.navigation.state.params.itemPoopColor,
        feelScale: this.props.navigation.state.params.itemFeelScale,
        creationDate: this.props.navigation.state.params.itemCreationDate,
      },
      loading: false,
    };
  }

  _onPress = () => {
    this.props.navigation.goBack();
  }

  _initialRegion = (coordinates) => {
    const { latitude, longitude } = JSON.parse(coordinates)[0];
    return {
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  }

  _formatTime = (date) => {
    const options = {
      year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    };
    return `${date.toLocaleString([], options)}`;
  }

  _pressDelete = (id) => {
    this.setState({ loading: true });
    Alert.alert(
      'Do you want to delete this record?',
      'You cannot undo this action',
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({ loading: false });
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            this.props.navigation.goBack();
            this.props.actions.deleteRecordFromDb(id);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  }

  _renderBack = () => {
    if (!this.state.loading) {
      return (
        <TouchableOpacity
          style={styles.back}
          onPress={this._onPress}
        >
          <Icon
            name="ios-arrow-dropleft-circle-outline"
            size={30}
            type="ionicon"
            color="#3D4143"
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  _renderFeelScale = () => {
    const { item } = this.state;
    if (item.feelScale > 0) {
      const feelScaleIcon = FEEL_SCALE[item.feelScale - 1].icon;
      const feelScaleTitle = FEEL_SCALE[item.feelScale - 1].feel;
      return (
        <View style={styles.feelItem}>
          <Icon
            name={feelScaleIcon}
            type="material-community"
            size={32}
            color="#34495E"
          />
          <Text style={[styles.text, { color: '#34495E' }]} >
            {feelScaleTitle}
          </Text>
        </View>
      );
    }
    return null;
  }

  _renderPoopShape = () => {
    const { item } = this.state;
    if (item.poop) {
      const poopShapeName = POOP_SHAPE[item.poopShape - 1].title;
      const poopShapeIcon = POOP_SHAPE[item.poopShape - 1].icon;
      return (
        <View style={styles.feelItem}>
          <CustomIcon
            name={poopShapeIcon}
            size={32}
            color="#34495E"
          />
          <Text style={[styles.text, { color: '#34495E' }]} >
            {poopShapeName}
          </Text>
        </View>
      );
    }
    return null;
  }

  _renderPoopColor = () => {
    const { item } = this.state;
    if (item.poop) {
      const poopShapeColor = POOP_COLOR[item.poopColor - 1].color;
      const poopShapeTitle = POOP_COLOR[item.poopColor - 1].title;
      return (
        <View style={styles.feelItem}>
          <View style={[styles.poopColor, { backgroundColor: poopShapeColor }]} />
          <Text style={[styles.text, { color: '#34495E' }]} >
            {poopShapeTitle}
          </Text>
        </View>
      );
    }
    return null;
  }

  _renderPoopStatus = () => {
    const { item } = this.state;
    const color = item.poop ? '#34495E' : '#97A6A7';
    return (
      <View style={styles.feelItem}>
        <CustomIcon name="poopIcon" size={32} color={color} />
        <Text style={[styles.text, { color }]} >Poop</Text>
      </View>
    );
  }

  _renderPeeStatus = () => {
    const { item } = this.state;
    const color = item.pee ? '#34495E' : '#97A6A7';
    return (
      <View style={styles.feelItem}>
        <CustomIcon name="peeIcon" size={32} color={color} />
        <Text style={[styles.text, { color }]} >Pee</Text>
      </View>
    );
  }

  render() {
    const { item } = this.state;
    return (
      <View style={styles.container}>
        <MyStatusBar />
        {this._renderBack()}
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            ref={(ref) => { this._mapRef = ref; }}
            initialRegion={this._initialRegion(item.routeCoordinates)}
            onLayout={() =>
              this._mapRef.fitToCoordinates(
                JSON.parse(item.routeCoordinates),
                {
                  edgePadding: {
                    top: 100, right: 100, bottom: 300, left: 100,
                  },
                  animated: true,
                },
              )
            }
          >
            <MapView.Polyline
              coordinates={JSON.parse(item.routeCoordinates)}
              strokeColor="#34495E"
              strokeWidth={4}
            />
          </MapView>
        </View>
        <View style={styles.panelContainer} pointerEvents="box-none">
          <Interactable.View
            ref={(ref) => { this._interactable = ref; }}
            verticalOnly
            snapPoints={this.state.snapPoints}
            boundaries={{ top: -800 }}
            initialPosition={{ y: height - 230 }}
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
                <Text style={styles.text}>{this._formatTime(item.creationDate)}</Text>
              </View>
              <TextDivider text="Today's walk" />
              <TimeDistance time={item.time} distance={item.distance} />
              <TextDivider text="How Kipper feels after the walk?" />
              <View style={styles.feelView}>
                {this._renderFeelScale()}
                {this._renderPoopStatus()}
                {this._renderPoopShape()}
                {this._renderPoopColor()}
                {this._renderPeeStatus()}
              </View>
            </View>
            <View style={styles.panel} behavior="padding">
              <View style={styles.panelTitle}>
                <CustomIcon name="note" size={24} color="#34495E" />
                <Text style={[styles.text, styles.panelTitleText]} >Notes</Text>
              </View>
              <View style={styles.textInputField}>
                <TextInput
                  style={{ height: 80 }}
                  editable={false}
                  multiline
                  placeholder="asdgafhsfgduhfasdhguwehafiuwhefliasufkljahsdnflkjadsniluf"
                />
              </View>
            </View>
            <Button
              loading={this.state.loading}
              disabled={this.state.loading}
              buttonStyle={{ backgroundColor: '#d6063c' }}
              borderRadius={5}
              fontWeight="bold"
              fontSize={14}
              raised
              onPress={() => this._pressDelete(item.id)}
              title="DELETE"
            />
          </Interactable.View>
        </View>
      </View>
    );
  }
}

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'monospace';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapView: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width,
    height,
  },
  back: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
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
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
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
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily,
  },
  feelView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  feelItem: {
    flex: 1,
    width: 80,
    height: 72,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
  },
  poopColor: {
    width: 32,
    height: 32,
    borderRadius: 20,
  },
  textInputField: {
    borderColor: '#ECF0F1',
    borderRadius: 2,
    borderWidth: 1,
    margin: 16,
  },
});

function mapStateToProps(state) {
  return {
    error: state.history.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetail);

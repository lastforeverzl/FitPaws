import React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { bindActionCreators } from 'redux';
import CustomIcon from '../config/CustomIcon';
import * as MapActions from '../redux/actions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this._mapRef = null;
    this.state = {
      currentPosition: {
        latitude: 0,
        longitude: 0,
      },
      finalPosition: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(`${position.coords.latitude} ${position.coords.longitude}`);
        const currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ currentPosition });
      },
      (error) => { alert(error.message); },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.panelVisible) {
      console.log('componentWillReceiveProps');
      this._mapRef.fitToCoordinates(
        nextProps.routeCoordinates,
        {
          edgePadding: {
            top: 100, right: 100, bottom: 300, left: 100,
          },
          animated: true,
        },
      );
      const { routeCoordinates } = nextProps;
      this.setState({
        finalPosition: routeCoordinates[routeCoordinates.length - 1],
      });
    }
  }

  _renderFinalMarker = () => {
    if (this.props.panelVisible) {
      return (
        <MapView.Marker
          coordinate={this.state.finalPosition}
          title="Marker"
        >
          <View style={{ marginBottom: 25 }}>
            <CustomIcon
              name="pin"
              size={32}
              color="#34495E"
            />
          </View>
        </MapView.Marker>
      );
    }
    return null;
  }

  render() {
    const { prevLatLng, routeCoordinates } = this.props;
    const region = {
      latitude: prevLatLng.latitude === undefined ? 0 : prevLatLng.latitude,
      longitude: prevLatLng.longitude === undefined ? 0 : prevLatLng.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    return (
      <View>
        <MapView
          ref={(ref) => { this._mapRef = ref; }}
          style={styles.map}
          region={region}
          showsUserLocation={!this.props.panelVisible}
        >
          <MapView.Marker
            coordinate={this.state.currentPosition}
            title="Marker"
          >
            <View style={{ marginBottom: 25 }}>
              <CustomIcon
                name="pin"
                size={32}
                color="#34495E"
              />
            </View>
          </MapView.Marker>
          {this._renderFinalMarker()}
          <MapView.Polyline
            coordinates={routeCoordinates}
            strokeColor="#34495E"
            strokeWidth={4}
          />
        </MapView>
      </View>
    );
  }
}

const styles = {
  map: {
    flex: 1,
    width,
    height,
  },
};

function mapStateToProps(state) {
  return {
    routeCoordinates: state.location.routeCoordinates,
    prevLatLng: state.location.prevLatLng,
    panelVisible: state.slidingPanel.panelVisible,
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
)(Map);

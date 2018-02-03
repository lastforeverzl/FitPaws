import React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { bindActionCreators } from 'redux';
import * as MapActions from '../redux/actions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: {
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
          style={styles.map}
          region={region}
          showsUserLocation={true}
          // followsUserLocation={true}
        >
          <MapView.Marker
            coordinate={this.state.currentPosition}
            title="Marker"
          />
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

import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const InnerMaps = ({ coordinate }) => {
  const [latitudeData, longitudeData] = coordinate.split(",");

  const [initialRegion, setInitialRegion] = React.useState({
    latitude: parseFloat(latitudeData),
    longitude: parseFloat(longitudeData),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = React.useRef();

  return (
    <MapView
      ref={mapRef}
      className="w-full h-full"
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      initialRegion={initialRegion}
      cacheEnabled={true}
    >
      <Marker coordinate={initialRegion} />
    </MapView>
  );
};

export default InnerMaps;

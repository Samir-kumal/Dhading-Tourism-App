import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { BackHandler, Image, View, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Loading from "../status/Loading";
import { images } from "../../constants";
import { PlaceCardPanauti, PlaceCard } from "../common";

const defaultMarkers = [
  {
    _id: "default1",
    title: "Default Place 1",
    coordinates: {
      coordinates: [27.5832371, 85.5092157],
    },
  },
];

// Function to handle hardware back press
const handleBackAction = (
  firstSwipeCompleted,
  showContainer,
  showContainerMain,
  router
) => {
  if (!firstSwipeCompleted) {
    // First swipe
    if (!showContainer && !showContainerMain) {
      router.replace("/home"); // If showContainer and showContainerMain are both false, navigate to the home screen
    }
    return true;
  } else if (!showContainer && !showContainerMain) {
    // Second swipe
    router.replace("/home"); // If showContainer and showContainerMain are both false, navigate to the home screen
  }

  return false;
};

// Function to filter markers based on visible region
const filterVisibleMarkers = (data, region) => {
  return data.filter((marker) => {
    const latitude = marker.coordinates.coordinates[0];
    const longitude = marker.coordinates.coordinates[1];
    return (
      latitude >= region.latitude - region.latitudeDelta / 2 &&
      latitude <= region.latitude + region.latitudeDelta / 2 &&
      longitude >= region.longitude - region.longitudeDelta / 2 &&
      longitude <= region.longitude + region.longitudeDelta / 2
    );
  });
};

const Maps = ({ data }) => {
  const router = useRouter();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 27.5832371,
    longitude: 85.5092157,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [showContainer, setShowContainer] = useState(false);
  const [showContainerMain, setShowContainerMain] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const [firstSwipeCompleted, setFirstSwipeCompleted] = useState(false);

  //limiting the marker view
  const [visibleMarkers, setVisibleMarkers] = useState(data);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      handleBackAction(
        firstSwipeCompleted,
        showContainer,
        showContainerMain,
        router
      )
    );

    return () => backHandler.remove();
  }, [firstSwipeCompleted, showContainer, showContainerMain]);
  useEffect(() => {
    const backAction = () => {
      if (!firstSwipeCompleted) {
        // First swipe
        if (!showContainer && !showContainerMain) {
          router.replace("/home"); // If showContainer and showContainerMain are both false, navigate to the home screen
        }
        setFirstSwipeCompleted(true);
      } else if (!showContainer && !showContainerMain) {
        // Second swipe
        router.replace("/home"); // If showContainer and showContainerMain are both false, navigate to the home screen
      }

      setShowContainer(false);
      setShowContainerMain(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [firstSwipeCompleted, showContainer, showContainerMain]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  const handleMarkerPress = (marker) => {
    setShowContainer(true);
    console.log(showContainer);
    setSelectedData(marker);
  };

  const handleMarkerPressMain = () => {
    setShowContainerMain(true);
  };

  const handleMapPress = () => {
    setShowContainer(false);
    setShowContainerMain(false);
  };

  const handleRegionChangeComplete = (region) => {
    // Filter the markers based on the visible region of the map
    const visibleMarkers = filterVisibleMarkers(data, region);
    const markersToDisplay =
      visibleMarkers.length > 0 ? visibleMarkers : defaultMarkers;
    setVisibleMarkers(markersToDisplay);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          showsMyLocationButton={true}
          initialRegion={initialRegion}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          onPress={handleMapPress}
          zoomEnabled={true}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          <Marker
            onPress={() => handleMarkerPressMain()}
            coordinate={initialRegion}
            style={{ zIndex: 10 }}
          >
            {showContainerMain && (
              <PlaceCardPanauti
                title="Panauti"
                description="A charming town in Nepal, captivates visitors with its rich cultural heritage, ancient temples, and picturesque Newari architecture, offering a glimpse into the country's vibrant history and traditions."
              />
            )}
          </Marker>
          {visibleMarkers?.length &&
            visibleMarkers.map((marker) => (
              <Marker
                key={marker._id}
                coordinate={{
                  latitude: marker.coordinates.coordinates[0],
                  longitude: marker.coordinates.coordinates[1],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                title={marker.title}
                onPress={() => handleMarkerPress(marker)}
                tracksViewChanges={false}
              >
                <Image
                  source={images.marker}
                  style={{ height: 30, width: 30 }}
                />
              </Marker>
            ))}
        </MapView>
      )}
      {showContainer && (
        <PlaceCard
          class="  left-0 right-0  absolute bottom-8  "
          item={selectedData}
        />
      )}
    </>
  );
};

export default Maps;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
});

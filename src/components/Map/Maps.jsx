import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { BackHandler,View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Loading from "../status/Loading";
import { PlaceCardJwalamukhi, PlaceCard } from "../common";
import {
  MaterialCommunityIcons,
  Foundation,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

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
    if (marker) {
      const latitude = marker.points.coordinates[0];
      const longitude = marker.points.coordinates[1];
      return (
        latitude >= region.latitude - region.latitudeDelta / 2 &&
        latitude <= region.latitude + region.latitudeDelta / 2 &&
        longitude >= region.longitude - region.longitudeDelta / 2 &&
        longitude <= region.longitude + region.longitudeDelta / 2
      );
    } else {
      const latitude = 0;
      const longitude = 0;
      return (
      latitude, longitude
      );
    }
  });
};

const Maps = ({ data }) => {
  const router = useRouter();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 27.8820062,
    longitude: 84.770904,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
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
              <PlaceCardJwalamukhi
                title="Jwalamukhi"
                description="Jwalamukhi is a Gaupalika in Dhading District in the Bagmati Zone of central Nepal. The local body was formed by merging four VDCs namely Khari, Dhola, Nepal, Maidi and Chainpur, Bagmati. Currently, it has a total of 7 wards."
              />
            )}
          </Marker>
          {data &&
            data?.length > 0 &&
            data.map((marker) => (
              <Marker
                key={marker._id}
                coordinate={{
                  latitude: marker.points.coordinates[0],
                  longitude: marker.points.coordinates[1],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                title={marker.title}
                onPress={() => handleMarkerPress(marker)}
                tracksViewChanges={false}
              >
                {marker.category &&
                  marker.category.toLowerCase() === "religious" && (
                    <MaterialCommunityIcons
                      name="home-minus"
                      size={24}
                      color="black"
                    />
                  )}
                {marker.category &&
                  marker.category.toLowerCase() ===
                    "fooding and accomodation" && (
                    <MaterialCommunityIcons
                      name="food-fork-drink"
                      size={24}
                      color="black"
                    />
                  )}
                {marker.category &&
                  marker.category.toLowerCase() === "natural" && (
                    <Foundation name="trees" size={34} color="green" />
                  )}
                {marker.category &&
                  marker.category.toLowerCase() === "official" && (
                    <MaterialCommunityIcons
                      name="office-building-marker"
                      size={24}
                      color="blue"
                    />
                  )}
                {marker.category &&
                  marker.category.toLowerCase() === "agriculture" && (
                    <MaterialIcons name="agriculture" size={24} color="black" />
                  )}
                {marker.category &&
                  marker.category.toLowerCase() === "tourism" && (
                    <FontAwesome5 name="hotel" size={24} color="pink" />
                  )}
                {marker.category &&
                  marker.category.toLowerCase() === "historical" && (
                    <MaterialIcons name="museum" size={24} color="grey" />
                  )}
              </Marker>
            ))}
        </MapView>
      )}
      {showContainer && (
        <View className="absolute top-20 left-0 right-0">
          <PlaceCard item={selectedData} />
        </View>
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

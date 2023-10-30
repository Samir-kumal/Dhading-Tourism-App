import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, Dimensions, Text } from "react-native";
import { DataContext } from "../../context/DataProvider";
import { FlashList } from "@shopify/flash-list";
import { PlaceCard } from "../common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Svg from "react-native-svg";
import { icons } from "../../constants";
import Permision from "../permision";
// Function to calculate the distance between two coordinates using the Haversine formula.
import { useTranslation } from "react-i18next";
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in km
};
const NearbyPlaces = () => {
  const { datas } = useContext(DataContext);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [nearbyPlacesData, setNearbyPlacesData] = useState([]);
  const [isUserLocation, setUserLocation] = useState(false);
  const height = Dimensions.get("window").height * 0.8;
  const maxDistanceInKm = 5; // You can adjust this value to set the maximum distance for nearby places.

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const userLocationStr = await AsyncStorage.getItem("@user_location");
        if (userLocationStr) {
          const userLocation = JSON.parse(userLocationStr);
          console.log(userLocation);

          // Now you have the user location object, you can proceed with filtering nearby places.
          filterNearbyPlaces(userLocation);
        } else {
          console.log("User location not found in AsyncStorage.");
          setUserLocation(true);
          // fetchUserLocation();
        }
      } catch (error) {
        console.log("Error retrieving user location from AsyncStorage:", error);
      }
    };
    if (!isUserLocation) {
      fetchUserLocation();
    }
  }, [isUserLocation]);

  const filterNearbyPlaces = (userLocation) => {
    // Filter the data array to get nearby places based on userLocation
    const nearbyPlacesData = datas.filter((item) => {
      const distance = calculateDistance(
        //27.5832371, //workss here
        //85.5092157,
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        item.coordinates.coordinates[0],
        item.coordinates.coordinates[1]
      );
      return distance <= maxDistanceInKm;
    });

    console.log("Nearby Places:", nearbyPlacesData);
    setNearbyPlacesData(nearbyPlacesData);

    // Perform any further operations with the nearbyPlacesData if needed.
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{
            height: height,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={"#8062F8"} />
        </View>
      ) : (
        <>
          {isUserLocation && <Permision />}
          {nearbyPlacesData.length > 0 && (
            <FlashList
              data={nearbyPlacesData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <PlaceCard item={item} />}
              estimatedItemSize={360}
            />
          )}
          {nearbyPlacesData.length <= 0 && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Svg.SvgXml xml={icons.noPlaceFound} />
              <Text style={{ fontSize: 20, padding: 5 }}>{t("nearby.title")}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default NearbyPlaces;

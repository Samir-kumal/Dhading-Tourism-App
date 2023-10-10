import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [location, setLocation] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission not granted");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync();
        setLocation(currentLocation);

        await AsyncStorage.setItem(
          "@user_location",
          JSON.stringify(currentLocation)
        );
        setSaved(true);
        console.log("Location saved");
      } catch (error) {
        console.log("Error retrieving location:", error);
      }
    };

    getLocation();
  }, []);
};

export default index;

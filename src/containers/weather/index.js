import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, } from "react-native";
import Constants from "expo-constants";

export const temp = (temp) => {
  return temp;
};
const Index = () => {
  // initialize state for isLoading, temperature, weatherCondition, and error
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const { WEATHER_API_KEY } = Constants.manifest.extra;
  temp(temperature);

  const changingEffect = () => {
    const manualLatitude = 27.59375132910493;
    const manualLongitude = 85.52398340333188;
    fetchWeather(manualLatitude, manualLongitude);
  };

  // handle the side effect of fetching the weather data when the component mounts
  useEffect(() => {
    changingEffect();
  }, []);

  const fetchWeather = (lat = 27.59375132910493, lon = 85.52398340333188) => {
    setIsLoading(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json()) // Convert response to JSON format
      .then((json) => {
        // JSON format of data fetched is available here: https://openweathermap.org/current
        // Log the weather data to the console
        const { icon } = json.weather[0];
        // Update the component state with the fetched weather data
        setTemperature(json.main.temp);
        const { description } = json.weather[0];
        console.log(typeof description); // returns string
        const capitalizedDescription =
          description.charAt(0).toUpperCase() + description.slice(1);
        setDescription(capitalizedDescription);
        // Here humidity, windspeed and description is also fetched but not shown in the rendered component
        setIcon(icon);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.WeatherWrapper} className="bg-[#7c60eedb]">
      {isLoading ? (
        <View style={styles.Loading}>
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <View>
          <View style={styles.WeatherInnerBox}>
            <View style={styles.LeftBox}>
              <Text className="pb-1 text-cardColor text-md "></Text>
              <Text className="pt-1 text-5xl text-cardColor font-extrabold">
                {temperature}°C
              </Text>
              <Text className="text-cardColor text-md ">
                {description} in Panauti
              </Text>
            </View>
            <View style={styles.IconWrapper}>
              <View>
                <Image
                  style={styles.IconWeather}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Loading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  WeatherWrapper: {
    margin: 25,
    marginTop: 15,
    marginBottom: 15,
    // borderWidth: 2,
    // borderColor: "#60a5fa",
    borderRadius: 10,
    padding: 10,
    paddingBottom: 25,
    paddingRight: 0,
    height: 90,
  },
  WeatherInnerBox: {
    // margin:10,
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  LeftBox: {
    flex: 2,
    // paddingLeft:5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  RightBox: {
    flex: 2,
    paddingLeft: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // borderLeftColor: 'white',
    // borderLeftWidth: 0.5,
  },
  IconWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  IconWeather: {
    width: "auto",
    height: "100%",
  },
});

export default Index;

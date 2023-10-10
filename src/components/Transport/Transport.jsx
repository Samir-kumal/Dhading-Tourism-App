import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import axios from "axios";
const { width } = Dimensions.get("window");

const index = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const apiUrl = "http://103.140.1.252/v1/routes";
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(apiUrl);
        // Assuming response.data is an array, set it to routes state
        if (Array.isArray(response.data.data)) {
          setRoutes(response.data.data);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>
            Primary Bus Station: Panauti Bus Park
          </Text>
          <Text style={styles.descriptionText}>
            <Text style={styles.boldText}>
              140 buses operate on a daily bases in Panauti Municiplaity.
            </Text>
            {"\n"}
            Buses available throughout the day from 5 am to 7 pm.
            {"\n"}
            {"\n"}
            <Text style={styles.boldText}>Panauti to Khopasi:</Text> 4 Buses
            {"\n"}2 Buses depart from Panauti to Khopasi throughout the day, and
            2 buses come from Khopasi to Panauti.
            {"\n"}
            {"\n"}
            <Text style={styles.boldText}>
              Panauti Bus Park to Dhunkharka:
            </Text>{" "}
            8 Buses
            {"\n"}
            <Text style={styles.boldText}>
              Panauti Bus Park to Chamrang Basei:
            </Text>{" "}
            4 Buses
            {"\n"}
            <Text style={styles.boldText}>
              Panauti Bus Park to Kami Dada:
            </Text>{" "}
            6 Buses
            {"\n"}
            <Text style={styles.boldText}>
              Panauti Bus Park to Tal Dhunga:
            </Text>{" "}
            4 Buses
            {"\n"}
            <Text style={styles.boldText}>Panauti Bus Park to Sankhu:</Text> 4
            Buses
            {"\n"}
            <Text style={styles.boldText}>
              Panauti Bus Park to Kushadevi:
            </Text>{" "}
            4 Buses
            {"\n"}
            {"\n"}
            Long-distance buses depart from the Panauti Bus Park at 6 a.m.
            {"\n"}
            Short-distance buses depart from the Panauti Bus Park at 8 a.m.
          </Text>
        </View>
        {routes.length > 0 ? (
          routes.map((data) => (
            <View key={data._id} style={styles.imageContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.imageTitle}>{data.title}</Text>
              </View>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                  uri: `http://103.140.1.252/v1/places/image/${data.images[0]}`,
                }}
              />
            </View>
          ))
        ) : (
          <Text>No routes available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  boldText: {
    fontWeight: "bold",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
    width: width * 0.8,
    borderRadius: 8,
    overflow: "hidden", // This is important to clip the image.
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default index;

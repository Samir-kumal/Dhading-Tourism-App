import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Feather, FontAwesome, AntDesign } from "@expo/vector-icons";

const PlaceDetailStarRating = () => {
  return (
    <View>
      <Text>PlaceDetailComponent</Text>
    </View>
  );
};
//   export  PlaceDetailComponent;
const PlaceDetailComponent = () => {
  return (
    <>
      <View className="flex flex-row items-center justify-between h-fit py-4">
        {/* Section 1 */}
        <View style={styles.container}>
          <View className="p-2 bg-white rounded-full shadow-2xl">
            <Feather name="map" size={20} color="black" />
          </View>
          <View>
            <Text  style= {styles.texthead}>Map</Text>
            <Text  style= {styles.textsubhead}>GO</Text>
          </View>
        </View>
        {/* Section 2 */}
        <View style={styles.container}>
          <View className="p-2 bg-white rounded-full shadow-2xl">
            <FontAwesome name="star" size={20} color="#FF5733" />
          </View>
          <View>
            <Text style= {styles.texthead}>Rating</Text>
            <Text style = {styles.textsubhead}>Rate The Place</Text>
          </View>
        </View>
        {/* Section 3 */}
        <View style={styles.container}>
          <View className="p-2 bg-white rounded-full shadow-2xl">
            <AntDesign name="playcircleo" size={20} color="black" />
          </View>

          <View>    
            <Text style= {styles.texthead}>Audio</Text>
            <Text style= {styles.textsubhead}>Play</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default PlaceDetailComponent;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
  texthead: {
    fontSize: 12,
    fontWeight: "200",
  },
  textsubhead: {
    fontSize: 16,
    fontWeight: "400",
  },
  
});

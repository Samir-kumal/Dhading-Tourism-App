import { View, Text, StyleSheet,Linking,TouchableOpacity } from "react-native";
import React from "react";
import { Feather, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Speech } from "../..";

const PlaceDetailStarRating = () => {
  return (
    <View>
      <Text>PlaceDetailComponent</Text>
    </View>
  );
};
//   export  PlaceDetailComponent;


const PlaceDetailComponent = ({coordinates, description}) => {
  // const formattedTitle = encodeURIComponent(title);
  const [latitude,longitude] = coordinates
  const openMap = () => {
    //auto route
    // const urls = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${formattedTitle},jwalamukhi`;
    const urls = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${latitude},${longitude}`;

    Linking.openURL(urls);
  };
  return (
    <>
      <View className="flex flex-row items-center justify-between h-fit py-4">
        {/* Section 1 */}
        <TouchableOpacity onPress={openMap} style={styles.container}>
          <View className="p-2 bg-white rounded-full shadow-2xl">
            <Feather name="map" size={20} color="black" />
          </View>
          <View>
            <Text  style= {styles.texthead}>Map</Text>
            <Text  style= {styles.textsubhead}>GO</Text>
          </View>
        </TouchableOpacity>
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
          <View className=" bg-white rounded-full shadow-2xl">
            <Speech text ={description} />
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

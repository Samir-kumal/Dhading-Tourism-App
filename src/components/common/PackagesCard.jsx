import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ExpoFastImage from 'expo-fast-image';
const PackagesCard = ({ item, packageMsg }) => {
  const router = useRouter();
  const {description } = item;
  const width = Dimensions.get("window").width * 0.95;
  const msg = description.substring(0,300) + "...";
  const styles = StyleSheet.create({
    container: {
      width: width,
      backgroundColor: "white",
      marginVertical: 6,
      borderRadius: 12,
    },
  });
  return (
    <TouchableOpacity
    activeOpacity={1}
    className = "h-fit py-2"
      style={styles.container}
      onPress={() =>
   
        router.push({
          pathname: "(places)/package_detail",
          params: {
            itemType: item.category,
          },
        })
  
      }
    >
          <ExpoFastImage
           style={{
            width: width,
            height: 150,
            marginBottom: 5,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
            uri={`http://103.140.1.252/v1/places/image/${item.images[0]}`} 
            cacheKey={item._id}
            
          />
      <Text className="font-bold text-2xl px-2">{packageMsg}</Text>
      <Text className="px-2">{msg}</Text>
    </TouchableOpacity>
  );
};

export default PackagesCard;

import { View, Text, Pressable } from "react-native";
import React from "react";
import ExpoFastImage from "expo-fast-image";

const PlaceCardPanauti = (props) => {
  const { title, description } = props;

  return (
    <View className={`  p-2  w-full ${props.class} `}>
      <View className=" my-2 rounded-lg relative flex justify-between pb-4 bg-[#f2f2f2] ">
        <Pressable className="h-fit rounded w-full">
          <ExpoFastImage
          
          className="h-36 w-full rounded "
            uri="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Panauti_Core_Settlement.jpg/800px-Panauti_Core_Settlement.jpg" 
            cacheKey="key"
            
          />

          <View className="absolute z-10 right-2 top-2"></View>
          <View className="w-full">
            <Text className="text-xl pl-2 mt-2 font-bold capitaliz flex flex-wrap">
              {title}
            </Text>
          </View>
          <View className="flex-row justify-between  items-center">
            <View className="pr-5  "></View>
          </View>

          <Text className="px-2 py-2 mt-1 flex-wrap">{description}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PlaceCardPanauti;

import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import ExpoFastImage from "expo-fast-image";

const PlaceCardPanauti = (props) => {
  const { title, description } = props;

  return (
    <View className={`  p-2  w-full ${props.class} `}>
      <View className=" my-2 rounded-lg relative flex justify-between pb-4 bg-[#f2f2f2] ">
        <Pressable className="h-fit rounded w-full">
          <Image
            className="h-36 w-full rounded "
            source={{
              uri: "https://www.nepalarchives.com/wp-content/uploads/2019/11/Jwalamukhi-Rural-Municipality-Dhading-Province-No.-3-Nepal-scaled.jpg",
            }}
            style= {{objectFit:"contain"}}
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

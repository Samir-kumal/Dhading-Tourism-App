import { View, Text, Image, TouchableOpacity, ScrollView,Pressable } from "react-native";
import React, { useState } from "react";
import * as Svg from "react-native-svg";
import { icons, images } from "../../constants";

const Emergency = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <View className="h-full w-full flex-1 justify-center  bg-white">
      <View className=" w-full flex justify-center items-center pt-20  px-3 ">
        <Image
          source={images.noInternet}
          resizeMode="cover"
          style={{
            height: 250,
            width: 271,
            alignSelf: "center",
          }}
        />
        <Text className=" text-[26px] font-bold text-center">
          Oops, the Network is lost, refresh and try!
        </Text>
        <TouchableOpacity
          onPress={handleRefresh}
          className=" w-1/2 h-14 border-[1px] border-primary m-5 rounded-md items-center justify-center"
        >
          <Text className ="text-lg">Refresh</Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="h-full">
        <View className="py-5 px-12  flex-row gap-x-4 items-center border-b border-primary">
          <Svg.SvgXml xml={icons.call} />
          <View>
            <Text className="font-bold text-xl">Emergency contact</Text>
            <Pressable className="mt-2 pl-4 ">
              <Text className="text-xl">+011-440136, 011-440138 </Text>
            </Pressable>
          </View>
        </View>
    
        <View className="py-5 px-12 flex-row gap-x-4 items-center border-b border-primary">
          <Svg.SvgXml xml={icons.email} />
          <View>
            <Text className="font-bold text-xl">Emergency Email</Text>
            <Pressable className="mt-2 pl-4 ">
              <Text className="text-xl">panautiMunc@mun.gov.np</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Emergency;

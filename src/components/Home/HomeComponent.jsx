import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import {Colors} from "../../constants/themes";
import HomeGrid from "./HomeGrid";
import { useRouter } from "expo-router";
const sections = ["Popular", "Religious", "Natural"];

const data = [
    { name: "Gallery", color: "#B0C8B9", route:"/gallery" },
    { name: "Near By", color: "#CBA39E", route:"/nearby_places" },
    { name: "Sights", color: "#FF5733" , route:"/sights"},
  ];

const HomeGridComponent = () => {
  const router = useRouter();

  return (
    <>
    <View className = "flex flex-row gap-x-4 items-center justify-center">
      {data.map((item) => (
        <TouchableOpacity onPress={()=>router.push(item.route)} key={item.color} style = {{backgroundColor:item.color, paddingVertical:10, paddingHorizontal:32, borderRadius:8}}>
            <Text className = "text-white">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
   
    </>
  );
};

export default HomeGridComponent;

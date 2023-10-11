import React, { useContext, useEffect, useState } from "react";
import Maps from "../components/Map/Maps";
import { DataContext } from "../context/DataProvider";
import { Platform } from "react-native";
import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import * as Svg from "react-native-svg";
import { icons } from "../constants";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Menu from "./nav/Menu";
const Location = () => {
  const { datas } = useContext(DataContext);
  const router = useRouter();


  return (
    <>
      <Maps data={datas} />
    
        <Pressable
          onPress={() => router.push("/home")}
          className="h-10 w-fit px-3 bg-white shadow-xl absolute flex-row rounded-full translate-x-2 translate-y-10 z-20  flex items-center justify-center"
        >
          <Ionicons name="arrow-back-circle-outline" size={28} color="black" />
          <Text className = "text-md font-bold">Back</Text>
        </Pressable>
  
      <Menu />
    </>
  );
};

export default Location;

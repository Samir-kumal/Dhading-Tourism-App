import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import * as Svg from "react-native-svg";
import { Ionicons, FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import { icons } from "../../constants";

export default function Menu() {
  const router = useRouter();
  const path = usePathname();
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    console.log(path);
  }, [path]);
 
  return (
    <View className="absolute bottom-0 w-full z-20  ">
      <View
        className={`  h-16 w-[${windowWidth}]  bg-[#fff] flex-row items-center  justify-around  rounded-md rounded-b`}
      >
        <TouchableOpacity
          style={
            (styles.container,
            { backgroundColor: path === "/home" ? "#B0C8B9" : "#fff" })
          }
          className=" flex  py-1 px-4 rounded-xl  items-center justify-center "
          onPress={() => {
            router.push("/home");
          }}
        >
          <Ionicons
            name="ios-home"
            size={24}
            color={path === "/home" ? "#fff" : "black"}
          />
         {path === "/home" && <Text style={styles.text}>Home</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={
            (styles.container,
            { backgroundColor: path === "/location" ? "#B0C8B9" : "#fff" })
          }
          className=" flex  py-1 px-4 rounded-xl  items-center justify-center"
          onPress={() => {
            router.push({
              pathname: "/location",
            });
          }}
        >
          {/* <Svg.SvgXml xml={icons.location} /> */}
          <FontAwesome
            name="safari"
            size={24}
            color={path === "/location" ? "#fff" : "black"}
          />
          {path === "/location" && <Text style={styles.text}>Location</Text>}

        </TouchableOpacity>
        <TouchableOpacity
          style={
            (styles.container,
            { backgroundColor: path === "/likes" ? "#B0C8B9" : "#fff" })
          }
          className=" flex  py-1 px-4 rounded-xl  items-center justify-center"
          onPress={() => router.push("/(tabs)/likes")}
        >
          {/* <Svg.SvgXml xml={icons.heart} /> */}
          <Ionicons
            name="ios-heart-sharp"
            size={26}
            color={path === "/likes" ? "#fff" : "black"}
          />
           {path === "/likes" && <Text style={styles.text}>Likes</Text>}

        </TouchableOpacity>
        <TouchableOpacity
          style={
            (styles.container,
            { backgroundColor: path === "/thingstodo" ? "#B0C8B9" : "#fff" })
          }
          className="  flex  py-1 px-4 rounded-xl  items-center justify-center"
          onPress={() => router.push("/thingstodo")}
        >
          <Entypo
            name="suitcase"
            size={26}
            color={path === "/thingstodo" ? "#fff" : "black"}
          />
           {path === "/thingstodo" && <Text style={styles.text}>Things To Do</Text>}
          
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  container: {
    height: 54,
    width: 56,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

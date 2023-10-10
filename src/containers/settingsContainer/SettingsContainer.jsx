import { View, Text, Image, FlatList,TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useRouter } from "expo-router";


const data = [
  "Langauge",
  "Preferences",
  "Privacy and Security",
  "Data and Storage",
  "Chat Settings",
  "Log Out",
];



const SettingContainer = () => {
  const router = useRouter();
  const handleClick = (item) => {
    if (item === "Log Out") {
      router.replace("/signin");
    }else{
      console.log(item);
    }
  }
  return (
    <View>
      <View>
        <View className = "mt-12">
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress= {()=> handleClick(item)} className = "p-5 font-bold  bg-white my-2 mx-4 flex flex-row justify-between rounded-2xl ">
                
                <Text>{item}</Text>
                <View>
                <FontAwesome5 name="angle-right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingContainer;

import { View, Text, Image, FlatList,TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useRouter } from "expo-router";
import LocalizationBtn from "../../Localization/";
const data = [
  "My Details",
  "Language Preferences",
  "About Our App",
  "Log Out",
];



const SettingContainer = ({ name, email, phone, signOut}) => {
  const router = useRouter();
  const handleClick = (item) => {
    if (item === "Log Out") {
      signOut();
    }else if(item === "My Details"){
      router.push({
        pathname: "/details",
        params: { name, email, phone },
      })
    } else if (item === "About Our App") {
      router.push({
        pathname: "/about",
      });
      
    } 
  }
  return (
    <View>
      <View>
        <View className = "mt-1">
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress= {()=> handleClick(item)} className = "p-5 font-bold border-[2px]  bg-white border-primary my-2 mx-4 flex flex-row justify-between rounded-lg ">
                
                <Text className = 'text-lg opacity-50 font-semibold'>{item}</Text>
                <View>
               {  item === 'Language Preferences' && <LocalizationBtn/>}
               { item !== 'Language Preferences' && <FontAwesome5 name="angle-right" size={24} color="black" />}
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

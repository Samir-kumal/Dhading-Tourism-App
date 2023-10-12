import React, { useContext, useEffect, useState } from "react";
import Maps from "../components/Map/Maps";
import { DataContext } from "../context/DataProvider";
import { Pressable, Text, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome,AntDesign } from "@expo/vector-icons";
import Menu from "./nav/Menu";
import { useInternet } from "../context/Internet";
import NoInternetController from "../components/common/NoInternet.controller";
import { StatusBar } from "expo-status-bar";
const Location = () => {
  const colorScheme = useColorScheme()
  const { datas } = useContext(DataContext); 
  const router = useRouter();
  const internet = useInternet()
  const [isConnected, setIsConnected] = useState(internet.status)
  useEffect(()=>{
    
      setIsConnected(internet.status);
    
  },[internet.status])


  return (
    <>
     {
      !isConnected ? (
        <NoInternetController/>
      ):(
        <>
           <StatusBar style={colorScheme === 'dark' ? 'light-content' : 'dark'}  backgroundColor="transparent"/>
   
         <Maps data={datas} />
    
    <Pressable
      onPress={() => router.back()}
      className=" w-fit p-2 bg-secondary shadow-xl absolute flex-row rounded-full translate-x-2 translate-y-10 z-20  flex items-center justify-center"
    >
      <AntDesign name="arrowleft" size={24} color="black" />
    </Pressable>
        </>
      )
     }
  
      <Menu />
    </>
  );
};

export default Location;

import React from "react";
import { ScrollView,useColorScheme  } from "react-native";
import MainContainer from "../components/common/MainContainer";
import Saved from "../containers/saved/Saved";
import { StatusBar } from "expo-status-bar";
import Menu from "./nav/Menu";
import Header from "./nav/Header";
import Sheet from "./nav/Sheet";
import { useInternet } from "../context/Internet";
import { useState } from "react";
import { useEffect } from "react";
import NoInternetController from "../components/common/NoInternet.controller";
export default function Likes() {
  const [show, setShow] = React.useState(false);
  const colorScheme = useColorScheme();
  const internet = useInternet()
  const [isConnected, setIsConnected] = useState(internet.status)
  useEffect(()=>{
      setIsConnected(internet.status);
  },[internet.status])
  return (
    <MainContainer>

<StatusBar style={colorScheme === 'dark' ? 'light-content' : 'dark'}  backgroundColor="transparent"/>


            {
              !isConnected ? (
                <NoInternetController/>
              ) : (
                <ScrollView className="mb-16" showsVerticalScrollIndicator={false}>
            <StatusBar style={colorScheme === 'dark' ? 'light-content' : 'dark'}  backgroundColor="transparent"/>


        <Saved />
      </ScrollView>
              )
            }
      <Menu />
      <Sheet show={show} setShow={setShow} />
    </MainContainer>
  );
}

import React from "react";
import { ScrollView,useColorScheme  } from "react-native";
import MainContainer from "../components/common/MainContainer";
import Saved from "../containers/saved/Saved";
import { StatusBar } from "expo-status-bar";
import Menu from "./nav/Menu";
import Header from "./nav/Header";
import Sheet from "./nav/Sheet";
export default function Likes() {
  const [show, setShow] = React.useState(false);
  const colorScheme = useColorScheme();

  return (
    <MainContainer>
            <StatusBar style={colorScheme === 'dark' ? 'light-content' : 'dark-content'}   />

      <ScrollView className="mb-16" showsVerticalScrollIndicator={false}>
        <Header show={show} setShow={setShow} />
        <Saved />
      </ScrollView>
      <Menu />
      <Sheet show={show} setShow={setShow} />
    </MainContainer>
  );
}

import { ScrollView, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Menu } from "../screens/nav";
import GalleryContainer from "../containers/gallery/GalleryContainer";
import { MainContainer, SkeletonCardGallery } from "../components/common";
import { useDataProvider } from "../context/DataProvider";
import { StatusBar } from "expo-status-bar";
import HeaderGallery from "./nav/HeaderGallery";

const Gallery = () => {
  const [show, setShow] = React.useState(false);
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const { datas } = useDataProvider();

  useEffect(() => {
    if(datas && datas.length > 0){
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, []);

  return (
    <MainContainer>
      <StatusBar
        style={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView className="mb-16  -z-10" showsVerticalScrollIndicator={false}>
        <HeaderGallery show={show} setShow={setShow} />
       
        {!isLoading ? (
          <GalleryContainer data={datas} />
        ) : (
          <SkeletonCardGallery />
        )}
      </ScrollView>
      <Menu />
     
    </MainContainer>
  );
};

export default Gallery;

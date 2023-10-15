import {
  ScrollView,
  useColorScheme,
  RefreshControl,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { Carousel } from "../components";

import { StatusBar } from "expo-status-bar";
import { useDataProvider } from "../context/DataProvider";
import { InternetContext } from "../context/Internet";
import {
  MainContainer,
  ContentLayout,
  PlaceCard,
} from "../components/common";
import { Menu, Header, Sheet } from "./nav";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import HomeGridComponent from "../components/Home/HomeComponent";
import NoInternetController from "../components/common/NoInternet.controller";
import VideoContainer from "../containers/Home/Video.Container";
const Home = React.memo(() => {
  const [show, setShow] = React.useState(false);
  const { refetch, fetchNextPage } = useDataProvider();
  const { datas } = useDataProvider();
  const internet = useContext(InternetContext);
  const [isConnected, setIsConnected] = useState(true);
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [filteredData, setFilteredData] = useState(datas);
  const [inputData, setInputData] = useState("");
  const pathname = usePathname();

  const handleFilter = (text) => {
    const filteredItems = datas.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
  };
  useEffect(()=>{
    setIsFocused(false)
    setInputData("")
  },[pathname])

  useEffect(() => {

    setTimeout(() => {
      setIsConnected(internet.status);
    }, 1000);
  }, [internet.status]);

  //refresh on scroll
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true); // Show the refreshing indicator

    try {
      await fetchNextPage();
      setRefreshing(false);
    } catch (error) {
      console.error("Error occurred during refresh:", error);
      setRefreshing(false); // In case of an error, still reset the refreshing state
    }
  }, [datas]);

  // Update the component's state whenever the 'datas' in the context changes

  const MemoizedCarousel = useMemo(
    () => <Carousel data={datas} autoPlay={true} pagination={true} />,
    [datas]
  );



  const colorScheme = useColorScheme();

  

  return (
    <>
    
      {!isConnected ? (
        <>
          <StatusBar
            style={colorScheme === "dark" ? "light-content" : "dark-content"}
          />
          <NoInternetController />
        </>
      ) : (
        <MainContainer>
      <StatusBar style={colorScheme === 'dark' ? 'light-content' : 'dark'}  backgroundColor="transparent"/>
          
          <ScrollView
            className="mb-16 relative "
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Header show={show} setShow={setShow} />
            {/* {MemoizedWeather} */}
            {MemoizedCarousel}
            <View className=" h-fit  absolute top-36 w-full">
              <View className="flex flex-row flex-wrap items-center justify-center ">
                <Text className="text-white text-center  font-bold text-3xl">
                  {t("homepage.firstpage.heading")}
                </Text>
                <Text className="text-white text-center  font-bold text-2xl">
                </Text>
              </View>
              <View className="bg-transparent  w-full bottom-4 ">
              <View className="relative">
            <View className="absolute z-10 top-10 right-8">
              <MaterialIcons name="search" size={24} color="#999" />
            </View>
            <TextInput
            value={inputData}
            onChangeText={(text) =>{
              setInputData(text)
              handleFilter(text);
            } }
            onFocus={() => setIsFocused(true)}
              placeholder={t("homepage.firstpage.text_input")}
              className="bg-white py-4 rounded-lg mx-2 mt-[24px] px-4"
            />
          </View>
              </View>
            </View>
            <View className=" h-14 items-center justify-center">
              <HomeGridComponent />

            </View>

            {isFocused && filteredData.length >0 ? (

              filteredData.map((item,index) => (
                <>
                <PlaceCard key={item.slug_name} item={item} />

                </>
              ))
            ) : (
              <ContentLayout
                data={datas}
                title={t("homepage.firstpage.sites.sites_cards.religious")}
                category={t(
                  "homepage.firstpage.sites.sites_category.religious"
                )}
                linkButton={t("homepage.firstpage.sites.sites_buttons.btn")}
              />
            )}
            <VideoContainer/>
          </ScrollView>

        
      <Menu />

        </MainContainer>
      )}

    </>
  );
});

export default Home;

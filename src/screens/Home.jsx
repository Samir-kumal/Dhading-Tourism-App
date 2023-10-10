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
import ButtonsContainer from "../containers/Home/ButtonContainers";
import Weather from "../containers/weather";
import { StatusBar } from "expo-status-bar";
import { useDataProvider } from "../context/DataProvider";
import { InternetContext } from "../context/Internet";
import { Emergency, MainContainer, ContentLayout } from "../components/common";
import { Menu, Header, Sheet } from "./nav";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import HomeGridComponent from "../components/Home/HomeComponent";
const Home = React.memo(() => {
  const colorScheme = useColorScheme();
  const [show, setShow] = React.useState(false);
  const { refetch, fetchNextPage } = useDataProvider();
  const { datas } = useDataProvider();
  const internet = useContext(InternetContext);
  const [isConnected, setIsConnected] = useState(true);
  const { t } = useTranslation();


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
    () => <Carousel data = {datas} autoPlay={true} pagination={true} />,
    [datas]
  );

  const MemoizedButtonsContainer = useMemo(() => <ButtonsContainer />, []);

  return (
    <>
      {!isConnected ? (
        <>
          <StatusBar
            style={colorScheme === "dark" ? "light-content" : "dark-content"}
          />
          <Emergency />
        </>
      ) : (
        <MainContainer>
          <StatusBar
            style={colorScheme === "dark" ? "light-content" : "dark-content"}
          />
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
              <View className=" ">
                <Text className="text-white text-center  font-bold text-3xl">
                  Welcome to
                </Text>
                <Text className="text-white text-center  font-bold text-2xl">
                  Jwalamukhi Gaupalika
                </Text>
              </View>
              <View className="bg-transparent  w-full bottom-4 ">
                <View className="p-2 relative">
                  <View className=" left-6 z-10 top-[52%] ">
                    <MaterialIcons name="search" size={30} color="#999" />
                  </View>
                  <TextInput
                    className="py-4 bg-white mx-2 pl-12  rounded-lg"
                    placeholder="Search Destination "
                  />
                </View>
              </View>
            </View>
            <View className = " h-14 items-center justify-center">
            <HomeGridComponent/>

            </View>

            <ContentLayout
              data={datas}
              title={t("homepage.firstpage.sites.sites_cards.religious")}
              category={t("homepage.firstpage.sites.sites_category.religious")}
              linkButton={t("homepage.firstpage.sites.sites_buttons.btn")}
            />
          </ScrollView>

          <Menu />
          <Sheet show={show} setShow={setShow} />
        </MainContainer>
      )}
    </>
  );
});

export default Home;

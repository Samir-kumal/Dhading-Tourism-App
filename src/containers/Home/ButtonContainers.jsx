import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import * as Svg from "react-native-svg";
import { icons } from "../../constants";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const ButtonsContainer = () => {
  const Cardwidth = Dimensions.get("window").width * 0.4;
  const FullCardwidth = Dimensions.get("window").width * 0.85;
  const {t} = useTranslation();

  const router = useRouter();

  const buttonData = [
    { id: 1, name: t("homepage.firstpage.title_cards.gallery"), pathname: "/gallery", icon: icons.gallery_bold },
    {
      id: 2,
      name: t("homepage.firstpage.title_cards.nearby"),
      pathname: "/(places)/nearby_places",
      icon: (
        <MaterialCommunityIcons name="google-nearby" size={24} color="black" />
      ),
    },
    {
      id: 3,
      name: t("homepage.firstpage.title_cards.sights"),
      pathname: "/location",
      icon: <AntDesign name="eye" size={24} color="black" />,
    },
    {
      id: 4,
      name: t("homepage.firstpage.title_cards.all_places"),
      pathname: "/(places)/all_popular_places_list",
      icon: <MaterialIcons name="location-pin" size={25} color="black" />,
    },
    {
      id: 5,
      name: t("homepage.firstpage.title_cards.transport"),
      pathname: "/transport",
      icon: (
        <MaterialIcons name="emoji-transportation" size={30} color="black" />
      ),
      isFullWidth: true,
    },
  ];

  const styles = StyleSheet.create({
    BtnItems: {
      height: 50,
      width: Cardwidth,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 23,
      margin: 10,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.8,
      elevation: 5,
    },
    FullBtnItems: {
      height: 50,
      width: FullCardwidth,
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      margin: 10,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.8,
      elevation: 5,
    },
  });

  return (
    <View className="w-full h-30 flex flex-row flex-wrap items-center justify-center">
      {buttonData.map((button) => (
        <View key={button.id}>
          <Pressable
            style={button.isFullWidth ? styles.FullBtnItems : styles.BtnItems}
            onPress={() => router.push(button.pathname)}
          >
            <Text className="text-[16px]">{button.name}</Text>
            {typeof button.icon === "string" ? (
              <Svg.SvgXml xml={button.icon} />
            ) : (
              button.icon
            )}
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default ButtonsContainer;

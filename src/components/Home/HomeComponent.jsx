import React, { useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/themes";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const HomeGridComponent = () => {
  const { t } = useTranslation();
  const data = [
    {
      name: t("homepage.firstpage.title_cards.gallery"),
      color: Colors.DarkGreen,
      route: "/gallery",
    },
    {
      name: t("homepage.firstpage.title_cards.nearby"),
      color: Colors.secondary,
      route: "/nearby_places",
    },
    {
      name: t("homepage.firstpage.title_cards.sights"),
      color: Colors.Rating,
      route: "/sights",
    },
  ];
  const router = useRouter();

  return (
    <>
      <View className="flex flex-row gap-x-4 items-center justify-center">
        {data.map((item) => (
          <TouchableOpacity
            onPress={() => router.push(item.route)}
            key={item.color}
            style={{
              backgroundColor: item.color,
              paddingVertical: 10,
              paddingHorizontal: 32,
              borderRadius: 8,
            }}
          >
            <Text className="text-white">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default HomeGridComponent;

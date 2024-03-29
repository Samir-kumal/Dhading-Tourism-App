import React, { memo, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import DataLayout from "./DataHandler";
import i18n from "../../translation";

const PopularListsMemo = memo(DataLayout);

const ContentLayout = ({ title, data, category, linkButton }) => {
  const router = useRouter();

  const thisData =
    data &&
    data.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );

  const renderedData = useMemo(() => {
    if (data) {
      return data.slice(0, 4);
    } else {
      return [];
    }
  }, [data]);

  const handlePress = () => {
    router.push("/(places)/homeplacesdetails");
  };

  return (
    <View className=" w-full  rounded-xl mt-3 ">
      <View className="flex flex-row items justify-between mx-4">
        <Text className="font-bold text-2xl mt-4 mb-2">{title}</Text>
      </View>

      <View className="imageWrapper">
        <PopularListsMemo datafuck={renderedData} />
      </View>

      <View className="w-full mt-4  mb-4 px-3">
        <TouchableOpacity
          className="  h-12 flex items-center bg-white justify-center border border-primary rounded-[10px]"
          onPress={handlePress}
        >
          <Text className="text-xl">{linkButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContentLayout;

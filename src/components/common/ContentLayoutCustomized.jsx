import React, { memo, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import DataLayout from "./DataHandler";
import i18n from "../../translation";

const PopularListsMemo = memo(DataLayout);

const ContentLayoutCustomized = ({ title, data, category, linkButton }) => {
  const [selectedLanguage, setSelectedLangauge] = useState(i18n.language); // "en" for English, "np" for Nepali
  const router = useRouter();

  useEffect(() => {
    setSelectedLangauge(i18n.language);
  }, [i18n.language]);

  const thisData = data.filter((item) => item.category === category);

  // const renderedData = useMemo(() => {
  //   if (category.toLowerCase() === "official" || category === "आधिकारिक") {
  //     return thisData.slice(0, 2);
  //   } else {
  //     return thisData.slice(0, 4);
  //   }
  // }, [data]);

  const handlePress = () => {
    if (title === "Popular Destination") {
      router.push("/(places)/all_popular_places_list");
    } else {
      router.push({
        pathname: "/(places)/all_other_places_list",
        params: {
          category: thisData[0].category,
        },
      });
    }
  };

  return (
    <View className=" w-full  rounded-xl mb-4 ">
      <View className="flex flex-row items justify-between mx-4">
        <Text className="font-bold text-2xl mt-4 mb-2">{title}</Text>
      </View>

      <View className="imageWrapper">
        <PopularListsMemo datafuck={thisData} />
      </View>
    </View>
  );
};

export default ContentLayoutCustomized;

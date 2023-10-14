import React, { memo, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import DataLayout from "./DataHandler";
import i18n from "../../translation";

const PopularListsMemo = memo(DataLayout);
const matchingSlugs = {
  eng: [
    "indreshwor-mahadev-temple",
    "triveni-ghat",
    "gorakhnath-temple",
    "ladkeshwor-dham",
    "balathali-faat",
    "krishna-temple-jakidol",
  ],
  nep: [
    "इन्द्रेश्वर-महादेव-मन्दिर-(अन्तर-संग्रहालय)",
    "त्रिवेणी-घाट",
    "गोरखनाथ-मन्दिर",
    "लडकेश्वर-धाम",
    "बालथली-सामाजिक-होमस्टे",
    "कृष्ण-मन्दिर-(जकडिल)",
  ],
};

const ContentLayout = ({ title, data, category, linkButton }) => {
  const [selectedLanguage, setSelectedLangauge] = useState(i18n.language); // "en" for English, "np" for Nepali
  const router = useRouter();

  useEffect(() => {
    setSelectedLangauge(i18n.language);
  }, [i18n.language]);

  const thisData =
    category.toLowerCase() === "popular" || category === "प्रसिद्ध"
      ? data.filter((item) =>
          matchingSlugs[selectedLanguage].includes(item.slug_name)
        )
      : data.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );

  const renderedData = useMemo(() => {
    if (category.toLowerCase() === "official" || category === "आधिकारिक") {
      return thisData.slice(0, 2);
    } else {
      return thisData.slice(0, 4);
    }
  }, [data]);

  const handlePress = () => {
    
      router.push("/(places)/homeplacesdetails");
    
    
  };

  return (
    <View className=" w-full  rounded-xl mt-3 ">
      <View className = "flex flex-row items justify-between mx-4">
        <Text className="font-bold text-2xl mt-4 mb-2">{title}</Text>
        {/* <TouchableOpacity className = "flex items-center justify-center" onPress={() => router.push("/homedetail")}>
          <Text className="font-semibold">See More</Text>
        </TouchableOpacity> */}
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

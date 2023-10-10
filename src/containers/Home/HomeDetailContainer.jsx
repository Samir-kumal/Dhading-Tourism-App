import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import { useRouter } from "expo-router";
import ContentLayoutCustomized from "../../components/common/ContentLayoutCustomized";
import { useTranslation } from "react-i18next";
const HomeDetailContainer = () => {
  const router = useRouter();
  const { datas } = useDataProvider();
  const categories = ["Popular", "Religious", "Historical"];
  const { t } = useTranslation();
  const handlePress = (item) => {
    console.log("pressed");
    router.push({
      pathname: "/sights",
      params: {
        categoryType: item,
      },
    });
  };
  return (
    <ScrollView className="flex gap-y-8 bg-white" showsVerticalScrollIndicator={false}>
      <View className="  rounded-xl bg-secondary">
        {/* <View className="h-16 flex items-center justify-center ">
          <Text className="text-2xl font-bold opacity-70">Popular Places</Text>
        </View> */}
        <ContentLayoutCustomized
          data={datas}
          title={t("homepage.firstpage.sites.sites_cards.religious")}
          category={t("homepage.firstpage.sites.sites_category.religious")}
          linkButton={t("homepage.firstpage.sites.sites_buttons.btn")}
        />
        <SeeMoreButton onPress={() => handlePress(categories[0])}>
          <View>
            <Text className="text-lg font-semibold opacity-70">
              See More Popular Places
            </Text>
          </View>
        </SeeMoreButton>
      </View>
      <View className="bg-secondary  rounded-xl">
        {/* <View className="h-16 flex items-center justify-center ">
          <Text className="text-2xl font-bold opacity-70">
            Religious Places
          </Text>
        </View> */}
        <ContentLayoutCustomized
             data={datas}
             title={t("homepage.firstpage.sites.sites_cards.religious")}
             category={t("homepage.firstpage.sites.sites_category.religious")}
             linkButton={t("homepage.firstpage.sites.sites_buttons.btn")}
        />
        <SeeMoreButton onPress={() => handlePress(categories[1])}>
          <View>
            <Text className="text-lg font-semibold opacity-70">
              See More Religious Places
            </Text>
          </View>
        </SeeMoreButton>
      </View>
      <View className="bg-secondary  rounded-xl">
        {/* <View className="h-16 flex items-center justify-center ">
          <Text className="text-2xl font-bold opacity-70">
            Historical Places
          </Text>
        </View> */}
        <ContentLayoutCustomized
             data={datas}
             title={t("homepage.firstpage.sites.sites_cards.religious")}
             category={t("homepage.firstpage.sites.sites_category.religious")}
             linkButton={t("homepage.firstpage.sites.sites_buttons.btn")}
        />
        <SeeMoreButton onPress={() => handlePress(categories[2])}>
          <View>
            <Text className="text-lg font-semibold opacity-70">
              See More Historical Places
            </Text>
          </View>
        </SeeMoreButton>
      </View>
    </ScrollView>
  );
};

export default HomeDetailContainer;

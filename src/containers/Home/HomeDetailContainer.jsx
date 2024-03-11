import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import { useRouter } from "expo-router";
import ContentLayoutCustomized from "../../components/common/ContentLayoutCustomized";
import { useTranslation } from "react-i18next";
import { Loading } from "../../components";
const HomeDetailContainer = () => {
  const router = useRouter();
  const { datas } = useDataProvider();
  // const categories = ["Religious", "Natural", "Tourism", "Municipality"];
  const { t } = useTranslation();
  const handlePress = (item) => {
    router.push({
      pathname: "/sights",
      params: {
        categoryType: item,
      },
    });
  };
  // let categoriesArr = [];

  // const categories = datas && datas.filter((item) => {
  //   if(categoriesArr.includes(item.category) ){
  //     return;
  //   } else {
  //     categoriesArr.push(item.category)
  //   }
  // });
  const categories = new Set();
datas.forEach((item) => categories.add(item.category));
const categoriesArr = [...categories];
  // console.log(filteredData);
  return (
    <ScrollView className="flex gap-y-2 bg-white" showsVerticalScrollIndicator={false}>
     {categoriesArr.length > 0 ? categoriesArr.map((item)=>(
      <View key={item} className="  rounded-xl ">
        <ContentLayoutCustomized
          data={datas}
          title={t("homepage.firstpage.sites.sites_cards.religious")}
          category={item}
          linkButton={t("homepage.firstpage.sites.sites_buttons.btn")}
        />
        <SeeMoreButton onPress={() => handlePress(item)}>
          <View>
            <Text className="text-lg font-semibold opacity-70">
              {`See More ${item}`}
            </Text>
          </View>
        </SeeMoreButton>
      </View>

     )) :
     <Loading/>
     }
    
    </ScrollView>
  );
};

export default HomeDetailContainer;

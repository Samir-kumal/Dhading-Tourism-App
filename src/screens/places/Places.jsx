import {
  View,
  Dimensions,
  ActivityIndicator,

} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PlaceCard from "../../components/common/PlaceCard";
import { DataContext } from "../../context/DataProvider";
import { useLocalSearchParams } from "expo-router";
import {FlashList} from "@shopify/flash-list"
const Places = () => {
  const { category } = useLocalSearchParams();
  const { datas } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get("window").height * 0.8;
  const PopularPlacesData = datas.filter((item) => {
    return item.category === category;
  });
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <View className="flex-1">
      {isLoading ? (
        <View
          className="h-[100%]  flex items-center justify-center w-full  "
          style={{ height: height }}
        >
          <ActivityIndicator size={"large"} color={"#8062F8"} />
        </View>
      ) : (
        <>
          {PopularPlacesData?.length && (
         
            <FlashList
              data={PopularPlacesData}
              keyExtractor={(item) => item._id} 
              renderItem={({ item }) => <PlaceCard item={item} />}
              estimatedItemSize={360}
            />
      
          )}
        </>
      )}
    </View>
  );
};

export default Places;

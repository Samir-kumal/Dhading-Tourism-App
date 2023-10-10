import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlaceCard } from "../../components/common";
import { images } from "../../constants";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Colors from "../../constants/themes";

const Saved = () => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation();
  const fetchData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@liked_items");
      if (jsonValue !== null) {
        const likedItems = JSON.parse(jsonValue);
        setFilteredData(likedItems);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [filteredData]);

  // Memoize the filteredData to prevent unnecessary re-renders
  const memoizedFilteredData = useMemo(() => filteredData, [filteredData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Display a message if no wishlist items are found

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            height: 470,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.primary} />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          {memoizedFilteredData.length !== 0 ? (
            memoizedFilteredData.map((item) => (
              <PlaceCard key={item._id} item={item} />
            ))
          ) : (
            <View className="flex items-center justify-center mt-1">
              <Image source={images.notfound} className="h-[50vh] w-full" />
              <Text className="text-3xl font-bold flex-warp">
                {t("savedPage.title")}
              </Text>
              <Pressable
                className="h-12 w-[70%] bg-primary items-center justify-center mt-4 rounded-md "
                onPress={() => router.push("/location")}
              >
                <Text className="text-2xl text-white">
                {t("savedPage.button")}
                </Text>
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Saved;

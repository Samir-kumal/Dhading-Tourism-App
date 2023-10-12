import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlaceCard } from "../../components/common";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Colors from "../../constants/themes";

const Saved = () => {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
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
            backgroundColor: Colors.theme,
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
            <View className="flex items-center justify-center mx-2 mt-1">
              <View className="h-96 w-full items-center justify-center">
                <Image
                  source={require("../../../assets/wishlist/wishlist.png")}
                  style={{ width: "50%", height: "50%", resizeMode: "contain" }}
                />
              </View>
              <Text className="text-2xl font-bold flex-warp">
                {t("savedPage.title")}
              </Text>
              <Pressable
                className="h-12 w-[60%] bg-primary items-center justify-center mt-4 rounded-md "
                onPress={() => router.push("/location")}
              >
                <Text className="text-md text-white">
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

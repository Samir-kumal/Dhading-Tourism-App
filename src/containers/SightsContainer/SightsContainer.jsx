import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useDataProvider } from "../../context/DataProvider";
import CircleWrapper from "../../components/common/CircleWrapper";
import PlaceCard from "../../components/common/PlaceCard";
import { useLocalSearchParams } from "expo-router";
import Colors from "../../constants/themes";

const dataList = [
  {
    id: 0,
    name: "Natural",
  },
  {
    id: 1,
    name: "Religious",
  },
  {
    id: 2,
    name: "Historical",
  },
];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SightsContainer = () => {
  const { datas } = useDataProvider();
  const flatListRef = useRef();
  const [selectedCategory, setCategory] = useState(dataList[0].name);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pressed, setPressed] = useState(false);
  const { categoryType } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const filteredData = datas.slice(0, 20);

  const categoryData = datas.reduce((acc, item) => {
    if (!acc[item.category.toLowerCase()]) {
      acc[item.category.toLowerCase()] = item;
    }
    return acc;
  }, {});
  const [categoryItems, setCategoryItems] = useState(
    Object.values(categoryData).slice(0, 8)
  );

  useEffect(() => {
    if (categoryType) {
      setCategory(categoryType);
      if (categoryType === "Popular") {
        setActiveIndex(0);
      } else if (categoryType === "Religious") {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    }
  }, []);
  useEffect(() => {
    if (datas) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.log(categoryItems);
    } else {
      setIsLoading(true);
    }
  }, [datas]);

  const handleScroll = (event) => {
    if (!pressed) {
      const positionX = event.nativeEvent.contentOffset.x;
      const index = Math.round(positionX / width);
      setActiveIndex(index);
      console.log(index);
      if (index === 0) {
        setCategory(dataList[0].name);
      } else if (index === 1) {
        setCategory(dataList[1].name);
      } else {
        setCategory(dataList[2].name);
      }
    }
  };

  const getItemLayout = (data, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  const handlePress = (id) => {
    setPressed(true);
    flatListRef.current.scrollToIndex({ index: id, animated: true });
    setActiveIndex(id);
    if (id === 0) {
      setCategory(dataList[0].name);
    } else if (id === 1) {
      setCategory(dataList[1].name);
    } else {
      setCategory(dataList[2].name);
    }

    setTimeout(() => {
      setPressed(false);
    }, 500);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.theme }}>
      <View style={{ height: height / 10 }}>
        <CircleWrapper />
      </View>
      <View>
        <View className="relative">
          <View className="absolute z-10 top-10 right-8">
            <Feather name="search" size={24} color="#999" />
          </View>
          <TextInput
            placeholder="Search Destination"
            className="bg-white py-4 rounded-lg mx-4 mt-6 px-4"
          />
        </View>
        <View className = "my-4">
          <FlatList
            className=""
            data={categoryItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handlePress(index)}
                key={item._id}
                className={
                  // activeIndex === index
                  //   ?
                  "px-4 py-1 mx-2 rounded-lg bg-[#B0C8B9] text-white "
                  //   : "px-4 py-1 "
                }
              >
                <Text
                  className={
                    //   activeIndex === index ?
                    "text-lg text-white"
                    //    : "text-lg"
                  }
                >
                  {item.category}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <View>
          {!isLoading ? (
            <FlatList
              className="h-full "
              getItemLayout={getItemLayout}
              data={categoryItems}
              ref={flatListRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              keyExtractor={(item) => item._id}
              onScroll={handleScroll}
              renderItem={({ item }) => (
                <View className="w-[100vw] flex  items-center  bg-slate-100 h-full">
                  <View className=" px-4 py-6 w-full ">
                    <Text className="text-xl font-bold">
                      {item.category} Destination
                    </Text>
                  </View>
                  {/* <View className="mb-32">
                    <FlatList
                      data={datas}
                      keyExtractor={(item) => item._id}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <>
                          {item.category.toLowerCase() ===
                            category.toLowerCase() && <PlaceCard item={item} />}
                        </>
                      )}
                    />
                  </View> */}
                </View>
              )}
            />
          ) : (
            <View className="w-full h-[50vh] bg-red flex items-center justify-center ">
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text>Loading...</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SightsContainer;

import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useDataProvider } from "../../context/DataProvider";
import CircleWrapper from "../../components/common/CircleWrapper";
import PlaceCard from "../../components/common/PlaceCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constants/themes";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {useTranslation} from "react-i18next";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SightsContainer = () => {
  const { datas } = useDataProvider();
  const scrollViewRef = useRef();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pressed, setPressed] = useState(false);
  const { categoryType } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(datas);
  const [inputData, setInputData] = React.useState("");

  const router = useRouter()

  const handleFilter = (text) => {
    const filteredItems = datas.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  const categoryData = filteredData.reduce((acc, item) => {
    if (!acc[item.category.toLowerCase()]) {
      acc[item.category.toLowerCase()] = item;
    }
    return acc;
  }, {});

  // to get the category items
  const [categoryItems, setCategoryItems] = useState(
    Object.values(categoryData)
  );

  // code that organizes the data based on category
  const [organizedData, setOrganizedData] = useState([]);
  const organizeData = (apiData) => {
    return apiData.reduce((acc, item) => {
      const category = item.category;
      const existingCategory = acc.find(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );

      if (existingCategory) {
        existingCategory.data.push(item);
      } else {
        acc.push({ category, data: [item] });
      }

      return acc;
    }, []);
  };

  useEffect(() => {
    const data = organizeData(filteredData);
    setOrganizedData(data);
  }, [filteredData]);



  // scroll to the selected category
  useEffect(() => {
    if (categoryType) {
      // Find the index of the selected category in the categoryItems array
      const index = categoryItems.findIndex(
        (item) => item.category.toLowerCase() === categoryType.toLowerCase()
      );

      if (index !== -1) {
        setActiveIndex(index);
        const xOffset = index * width;
        scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
      }
    }
  }, [categoryType, categoryItems]);

  // to set the loading state of the page
  useEffect(() => {
    if (datas) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      // console.log(categoryItems);
    } else {
      setIsLoading(true);
    }
  }, [datas]);

  // to handle the scroll event
  const handleScroll = (event) => {
    if (!pressed) {
      const positionX = event.nativeEvent.contentOffset.x;
      const index = Math.round(positionX / width);
      setActiveIndex(index);
      console.log("active index", index);
    }
  };

  // to handle the press event
  const handlePress = (id) => {
    setPressed(true);
    const xOffset = id * width;
    scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
    setActiveIndex(id);

    setTimeout(() => {
      setPressed(false);
    }, 500);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.theme, position:"relative" }}>
      <StatusBar backgroundColor="transparent"/>
      <View style={{ height: height / 10, position:"absolute" }}>
        <CircleWrapper />
      </View>
      <View className="">
        <View className="relative  flex flex-row p-2 items-center justify-around gap-x-4">
          <View className="w-10 h-10 rounded-full flex items-center justify-center ">
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#000" />

            </TouchableOpacity>
          </View>
          <View className=" flex flex-row items-center justify-center border border-y-primary  bg-white py-3 rounded-lg ">
            <Feather name="search" size={24} color="#999" />
            <TextInput
              value={inputData}
              onChangeText={(text) => {
                setInputData(text);
                handleFilter(text);
              }}
              placeholder={t("homepage.firstpage.text_input")}
              className="w-[80%] pl-2"
            />
          </View>
        </View>
        <View className="my-1">
          <FlatList
            className=""
            data={categoryItems}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => handlePress(index)}
                key={index}
                // style = {{backgroundColor:Colors.DarkGreen}}
                className={
                  activeIndex === index
                    ? `px-4 py-1 mx-2 rounded-lg bg-[${Colors.DarkGreen}]  text-white `
                    : "px-4 py-1 "
                }
              >
                <Text
                  className={
                    activeIndex === index ? "text-lg text-white" : "text-lg"
                  }
                >
                  {item.category}
                </Text>
              </Pressable>
            )}
          />
        </View>
        <ScrollView
          onScroll={handleScroll}
          ref={scrollViewRef}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {!isLoading ? (
            organizedData.map((categoryData, index) => (
              <View
                style={{ width, height }}
                key={index}
                className=""
              >
                <View className=" px-4 py-3 w-full ">
                  <Text className="text-xl font-bold">
                    {categoryData.category} Destination
                  </Text>
                </View>
                <FlashList
                  className="mb-52"
                  data={categoryData.data}
                  estimatedItemSize={240}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <PlaceCard item={item} key={item._id} />
                  )}
                />
      <View className = "h-28 w-full bg-transparent"><Text></Text></View>

              </View>
            ))
          ) : (
            <View className="w-[100vw] h-[50vh] flex items-center justify-center ">
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SightsContainer;

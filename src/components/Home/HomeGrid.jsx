import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    Dimensions,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useRouter } from "expo-router";
  import { FontAwesome } from "@expo/vector-icons";
import { LikeStateContext } from "../../context/likeStateProvider";  
  const HomeGrid = ({data}) => {
    const router = useRouter();
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const { LikedItem, toggleLike } = React.useContext(LikeStateContext);
    const likedItems = LikedItem.LikedItem;
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
  
    useEffect(() => {
      if (data) {
        setFilteredData(data.slice(0, 4))
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else {
        setIsLoading(true);
      }
    }, [data]);
  
    console.log("Home",data);
  
    const handleClick = (item) => {
      router.push({
        pathname: "/details",
        params: {
          title: item.title,
          location: item.location,
          description: item.description,
          wardno: item.wardno,
  
          url: JSON.stringify(item.images),
        },
      });
    };
  
    return (
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
        className=" gap-2 mt-2 "
      >
        {!isLoading ? (
          filteredData.map((item) => (
            <View key={item._id} className="relative">
              <Pressable
                onPress={() => toggleLike(item)}
                className="absolute z-10 right-2 top-2 bg-transparent p-3"
              >
                <FontAwesome
                  name="heart"
                  size={24}
                  color={
                    likedItems.some((likedItem) => likedItem._id === item._id)
                      ? "#ff0000"
                      : "white"
                  }
                />
              </Pressable>
  
              <Pressable
                onPress={() => handleClick(item)}
                key={item._id}
                className="w-40  h-56 bg-slate-300  rounded-xl "
                style={{ width: width / 2.2 }}
              >
                <Image
                  className="rounded-xl"
                  source={{
                    // uri: `http://prayatan.jwalamukhimun.gov.np/v1/places/image/${item.images[0]}`,
                    uri: `http://103.140.1.252/v1/places/image/${item.images[0]}`,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
                <View className="absolute bottom-2 left-1">
                  <Text className="text-white font-bold">{item.title}</Text>
                </View>
              </Pressable>
            </View>
          ))
        ) : (
          <View
            style={{ height: height / 3 }}
            className=" w-full h-full flex items-center justify-center"
          >
            <ActivityIndicator size={"large"} />
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
    );
  };
  
  export default HomeGrid;
  
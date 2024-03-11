import { View, Text, Image,Pressable } from "react-native";
import React from "react";
import { LikeStateContext } from "../../context/likeStateProvider";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import limitWords from "../../helpers/WordSlice";
const PlaceCard = ({item}) => {
    const { LikedItem, toggleLike } = React.useContext(LikeStateContext);
    const likedItems = LikedItem.LikedItem;
    const router = useRouter();
    const handleClick = (item) => {
      router.push({
        pathname: "(places)/detail",
        params: {
          title: item.title,
          placeId: item._id,
          description: item.description,
          images: JSON.stringify(item.images),
          coordinates: item.coordinates.coordinates,
          totalRating: item.totalRating,
          location: item.location,
          wardno: item.wardno,
        },
      });
    }
  return (
    <View className = "relative z-10 flex items-center justify-center">
      <Pressable
            onPress={() => toggleLike(item)}
            className="absolute z-10 left-6 top-4 bg-transparent p-3"
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

    <Pressable onPress={()=> handleClick(item)} className="w-[90vw] my-2 h-60 flex flex-row shadow-xl rounded-xl p-2 mx-2 bg-white">
      <Image
        source={{
          uri: item.images[0],
        }}
        style={{
          width: "50%",
          height: "100%",
          borderRadius: 10,
        }}
      />
      <View className=" px-2 w-1/2 flex items-center justify-around">
        <View className = "w-full items-center justify-center">
        <Text className="font-semibold text-lg  px-2 text-left"> {limitWords(item.title,3)}</Text>

        </View>
        <Text className=" text-xs text-center opacity-50 px-1"> {limitWords(item.description,25)}</Text>
      </View>
    </Pressable>
    </View>
  );
};

export default PlaceCard;
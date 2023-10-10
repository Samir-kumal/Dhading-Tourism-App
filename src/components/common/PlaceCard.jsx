import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import ItemBtns from "./ItemBtns";
import { useRouter } from "expo-router";
import StarRating from "../common/StarRating";
import * as Svg from "react-native-svg";
import { icons } from "../../constants";
import { LikeStateContext } from "../../context/likeStateProvider";
import ExpoFastImage from "expo-fast-image";
const PlaceCard = (props) => { 
  const router = useRouter();

  const { item } = props;

  const {
    title,
    _id,
    description,
    coordinates,
    totalRating,
    wardno,
    location,
    images,
  } = item;

 
  const str = description.substring(0, 100) + "...";
  const { LikedItem, toggleLike } = React.useContext(LikeStateContext);
  const likedItems = LikedItem.LikedItem;


  return (
    <View className={`  p-2  w-full ${props.class} `}>
      <View className=" my-2 rounded-lg relative flex justify-between pb-4 bg-[#f2f2f2] ">
        <Pressable
          className="h-fit rounded w-full"
          onPress={() => {
            router.push({
              pathname: "(places)/detail",
              params: {
                title: title,
                placeId:_id,
                description: description,
                totalRating: totalRating,
                coordinates: coordinates.coordinates,
                wardno: wardno,
                location: location,
                images: images,
              },
            });
          }}
        >
     
          <ExpoFastImage
            className="h-36 w-full rounded "
            uri={`http://103.140.1.252/v1/places/image/${item.images[0]}`}
            cacheKey={item._id}
          />

          <View className="absolute z-10 right-2 top-2">
            <Pressable onPress={() => toggleLike(item)}>
              <Svg.SvgXml
                xml={icons.whiteHeart}
                fill={
                  likedItems.some((likedItem) => likedItem._id === item._id)
                    ? "#ff0000"
                    : "white"
                }
                stroke={"white"}
              />
            </Pressable>
          </View>
          <View className="w-full">
            <Text className="text-xl pl-2 mt-2 font-bold capitalize flex flex-wrap">
              {title}
            </Text>
          </View>
          <View className="flex-row justify-between  items-center">
            <View className="px-3 pb-1">
              <Text className="text-md">Ward No : {wardno} </Text>
              <Text className="text-md">Location : {location}</Text>
            </View>
            <View className="pr-5  ">
              <ItemBtns text={description} title={title} />
            </View>
          </View>

          <StarRating rating={totalRating} />
          <Text className="px-2 py-2 mt-1 flex-wrap">{str}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PlaceCard;

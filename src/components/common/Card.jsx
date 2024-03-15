import {
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { LikeStateContext } from "../../context/likeStateProvider";
import * as Svg from "react-native-svg";
import { icons } from "../../constants";
import { useRouter } from "expo-router";
import limitWords from "../../helpers/WordSlice";

const Card = (props) => {
  const { LikedItem, toggleLike } = useContext(LikeStateContext);
  const likedItems = LikedItem.LikedItem;
  const width = Dimensions.get("window").width * 0.45;
  const router = useRouter();
  const { item } = props;

  const str = item.description;
  const desc = limitWords(str, 7) + "..";

  const handleLike = async () => {
    toggleLike(item);
  };

  console.log("Card item", item.images);

  const styles = StyleSheet.create({
    imageContainer: {
      height: 230,
      position: "relative",
      width: width,
      marginHorizontal: 6,
      marginVertical: 7,
      borderRadius: 8,
      backgroundColor: "#fff",
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 10,
      position: "relative",
    },
  });

  const Images = item && JSON.stringify(item.images)

  return (
    <View>
      <Pressable
        style={styles.imageContainer}
        onPress={() => {
          router.push({
            pathname: "(places)/detail",
            params: {
              placeId: item._id,
              title: item.title,
              placeId: item._id,
              description: item.description,
              // images: item.images[0],
              coordinates: item.points.coordinates,
              totalRating: item.totalRating,
              location: item.location,
              wardno: item.wardno,
            },
          });
        }}
      >
        <Pressable onPress={handleLike} className="absolute z-10 right-2 top-2">
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

        <Image
          source={{ uri: item.images[0] }}
          style={{
            width: width,
            height: 230,
            borderRadius: 8,
            marginBottom: 5,
          }}
        />

        <View style={{ width: width }} className=" absolute bottom-0  flex">
          <Text className="item-title text-white w-['88%'] text-[16px] font-bold pb-1  pl-2 ">
            {item.title}
          </Text>
          <Text className="item-title text-white w-['88%'] text-[16px] font-bold pb-1  pl-2 ">
            ward no. {item.wardno}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Card;

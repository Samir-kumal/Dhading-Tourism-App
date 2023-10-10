import { View, Text, Pressable, Linking } from "react-native";
import Speech from "../Speech/Speech";
import * as Svg from "react-native-svg";
import React from "react";
import { icons } from "../../constants";

const ItemBtns = ({ text, title }) => {
  const formattedTitle = encodeURIComponent(title);

  const openMap = () => {
    //auto route
    const urls = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${formattedTitle},panauti`;

    Linking.openURL(urls);
  };
  return (
    <View className="flex-row  btnClass">
      <View className="justify-center items-center">
        <Pressable
          className="h-10 w-10 shadow-lg bg-[#f2f2f2] rounded-full justify-center items-center mx-5"
          onPress={openMap}
        >
          <Svg.SvgXml xml={icons.sendBtn} />
        </Pressable>
        <Text className="pt-1">Go</Text>
      </View>
      <View>
        <Speech text={text} className="mx-5" />
        <Text className="pt-1">Audio</Text>
      </View>
    </View>
  );
};

export default ItemBtns;

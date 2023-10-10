import { View, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../../constants/themes";
const Loading = () => {
  return (
    <View className="flex-1 items-center bg-[#e3e1e432]  justify-center">
      <ActivityIndicator size={50} color={Colors.primary} />
    </View>
  );
};

export default Loading;

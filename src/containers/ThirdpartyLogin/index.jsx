import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

const ThirdParyLogin = (props) => {
  const { onPress, children } = props;
  return (
    <TouchableOpacity
      className="w-16 rounded-full mx-3 shadow-xl h-16 flex flex-row justify-center items-center  bg-white"
      onPress={onPress}
    >
      <View className="flex flex-row items-center gap-3 justify-center">
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default ThirdParyLogin;

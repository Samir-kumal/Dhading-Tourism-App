import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const SeeMoreButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      className="border-[1px] my-2 bg-white py-3 mx-2 rounded-xl flex items-center justify-center border-green-500"
      onPress={onPress}
    >
      {children}
    </TouchableOpacity> 
  );
};

export default SeeMoreButton;

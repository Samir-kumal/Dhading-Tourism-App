import { Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({
  handleSubmit,
  isLoading,
  children,
  ClassName,
  textClassName,
}) => {
  return (
    <TouchableOpacity
      underlayColor="red"
      activeOpacity={0.7}
      disabled={isLoading}
      onPress={handleSubmit}
      className={`w-[85%] h-[7vh]  rounded-[10px] flex justify-center items-center bg-[#3A7567] ${ClassName}`}
    >
      <Text className={`text-[20px] text-white font-semibold ${textClassName}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";

const Logo = ({ source, size }) => {
  return (
    <View className>
      <Image
        style={{ height: size, objectFit: "contain" }}
        source={
          source === "welcome"
            ? require("../../../assets/Logos/welcomeLogo.png")
            : require("../../../assets/Logos/signInLogo.png")
        }
      />
    </View>
  );
};

export default Logo;

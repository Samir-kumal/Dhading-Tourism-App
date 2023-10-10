import { StyleSheet, Text, View } from "react-native";

import React from "react";

const Circle = ({ translateX, translateY }) => {
  const styles = StyleSheet.create({
    circle:
     {
        transform: StyleSheet.compose([
            { translateX: translateX },
            { translateY: translateY },
          ]),
     }
  });
  return (
    <View
      style={styles.circle}
      className={`w-52  h-52 rounded-full bg-[#B0C8B9] opacity-40`}
    ></View>
  );
};

export default Circle;

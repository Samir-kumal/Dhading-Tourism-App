import React from "react";
import { View } from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars === 0.5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <AntDesign name="star" key={`full-${i}`} size={12} color="black" />
      );
    }

    if (halfStar) {
      stars.push(
        <FontAwesome5 name="star-half-alt" key="half" size={12} color="black" />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AntDesign name="staro" key={`empty-${i}`} size={12} color="black" />
      );
    }

    return stars;
  };

  return <View className="rating flex-row px-2 gap-x-1">{renderStars()}</View>;
};

export default StarRating;

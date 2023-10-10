import { View } from "react-native";
import React from "react";
import { CarouselWithText } from "../../components";

const GalleryCarousel = ({ data, selectedType }) => {
  const selectedData = data.filter((item) => item.category === selectedType);

  return (
    <View className="w-full h-fit ">
      <CarouselWithText
        data={selectedData}
        autoPlay={false}
        pagination={false}
      />
    </View>
  );
};

export default GalleryCarousel;

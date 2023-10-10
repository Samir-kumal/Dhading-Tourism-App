import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";

const ContentCard = ({ datafuck }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const skeletonCardCount = 4;

  const skeletonCards = Array.from({ length: skeletonCardCount }).map(
    (_, index) => <SkeletonCard key={index} />
  );

  return (
    <View className="flex flex-row flex-wrap items-center justify-center">
      {!isLoading && datafuck.length > 0
        ? datafuck.map((item) => <Card key={item._id} item={item} />)
        : skeletonCards}
    </View>
  );
};

export default ContentCard;

import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import axios from "axios";
import Toast from "react-native-root-toast";

import Icon from "react-native-vector-icons/FontAwesome";

const Rating = ({ maxStars, rating, placeId, onStarPress }) => {
  const submitRating = async (placeId, starNumber) => {
    console.log(starNumber, "from the axios");
    const url = `http://103.140.1.252/v1/places/${placeId}/rate`;

    try {
      const response = await axios.post(url, { rating: starNumber });

      if (response.data.success) {
        let toast = Toast.show("Place rated successfully.", {
          duration: Toast.durations.LONG,
        });
      } else {
        console.log("Failed to update place rating.");
      }
    } catch (error) {
      console.error("Error rating place:", error);
    }
  };
  const renderStar = (starNumber) => {
    const filled = starNumber <= rating;

    return (
      <TouchableOpacity
        key={starNumber}
        onPress={async () => {
          onStarPress(starNumber);
          console.log(starNumber, "star");
          console.log(placeId, "toplace");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await submitRating(placeId, starNumber);
        }}
      >
        <Icon
          name={filled ? "star" : "star-o"}
          size={35}
          color={filled ? "#8062F8" : "black"}
        />
      </TouchableOpacity>
    );
  };

  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    stars.push(renderStar(i));
  }

  return (
    <View style={{ flexDirection: "row" }} className="gap-x-5">
      {stars}
    </View>
  );
};
const styles = {
  alertContainer: {
    width: 300,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  alertText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default Rating;

import React, { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LikeStateContext = createContext();

const LikeStateProvider = (props) => {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    loadLikedItems();
  }, []);

  useEffect(() => {
    saveLikedItems();
  }, [likedItems]);

  const loadLikedItems = async () => {
    try {
      const storedLikedItems = await AsyncStorage.getItem("@liked_items");
      if (storedLikedItems) {
        setLikedItems(JSON.parse(storedLikedItems));
      }
    } catch (error) {
      console.log("Error loading liked items from async storage:", error);
    }
  };

  const saveLikedItems = async () => {
    try {
      const serializedLikedItems = JSON.stringify(likedItems);
      await AsyncStorage.setItem("@liked_items", serializedLikedItems);
    } catch (error) {
      console.log("Error saving liked items to async storage:", error);
    }
  };

  const toggleLike = (item) => {
    const isLiked = likedItems.some((likedItem) => likedItem._id === item._id);

    let newLikedItems = [];

    if (isLiked) {
      newLikedItems = likedItems.filter(
        (likedItem) => likedItem._id !== item._id
      );
    } else {
      newLikedItems = [...likedItems, item];
    }

    setLikedItems(newLikedItems);
  };
  const LikedItem = useMemo(() => ({ LikedItem: likedItems }), [likedItems]);

  return (
    <LikeStateContext.Provider value={{ LikedItem, toggleLike }}>
      {props.children}
    </LikeStateContext.Provider>
  );
};

export { LikeStateProvider };

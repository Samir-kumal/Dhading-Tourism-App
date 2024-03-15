import React, { useEffect, useState } from "react";
import { Pressable, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { usePathname } from "expo-router";

const stopSpeech = (setIsPlaying) => {
  if (Platform.OS === "ios") {
    Speech.pause();
  } else {
    Speech.stop();
  }
  setIsPlaying(false);
};
const TextToSpeechButton = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const path = usePathname();
  const speak = () => {
    if (isPlaying) {
      stopSpeech(setIsPlaying);
    } else {
      Speech.speak(text);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (isPlaying) {
        if (Platform.OS === "ios") {
          Speech.pause();
        } else {
          Speech.stop();
        }
      }
    };
  }, [isPlaying]);
  useEffect(() => {
    if (path !== "/detail" && path !== "/all_popular_places_list") {
      if (isPlaying) {
        if (Platform.OS === "ios") {
          Speech.pause();
        } else {
          Speech.stop();
        }
        setIsPlaying(false);
      }
    }
  }, [path]);

  return (
    <Pressable
      className="h-10 w-10 bg-white shadow-lg  flex rounded-full justify-center items-center"
      onPress={speak}
    >
      {/* <FontAwesome5
        name={isPlaying ? "pause" : "play"}
        size={19}
        color="black"
      /> */}
        <AntDesign name={isPlaying ? "pausecircleo": 'playcircleo'} size={20} color="black" />
    </Pressable>
  );
};

export default TextToSpeechButton;

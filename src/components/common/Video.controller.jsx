import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function VideoController({videoId}) {
  const [playing, setPlaying] = useState(false);
 

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={200}
        play={playing}
        videoId={videoId}
      />
    </View>
  );
}
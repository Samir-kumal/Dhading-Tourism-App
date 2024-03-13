import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from "react-native-webview";
export default function VideoController({ videoId }) {
  const video = React.useRef(null);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = React.useState({});

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  console.log(videoId);
  return (
    <View renderToHardwareTextureAndroid={true} className="w-full py-2">
      {videoId ? <YoutubePlayer
        height={200}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />: <View><Text>Loading....</Text></View>}

   
    </View>
  );
}

import React, { useState, useCallback, memo } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
const VideoController = memo(({ videoId }) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  console.log(videoId);
  return (
    <View renderToHardwareTextureAndroid={true} className="w-full py-2">
      {videoId ? (
        <YoutubePlayer
          height={200}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
        />
      ) : (
        <View>
          <Text>Loading....</Text>
        </View>
      )}
    </View>
  );
});

export default VideoController;

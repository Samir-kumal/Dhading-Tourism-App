import { View, Text, TextComponent, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import VideoController from "../../components/common/Video.controller";
import { useDataProvider } from "../../context/DataProvider";
import { extractVideoId } from "../../utility/VideoIdExtractor";

const VideoContainer = () => {
  const {t} = useTranslation();
  const { videoData } = useDataProvider();
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [videoData]);

  return (
    <View className=" mb-5 p-2 rounded-md">
      <View className="py-2 px-1 flex flex-row items-center justify-between">
        <Text className="text-2xl font-semibold">
         {t("homepage.firstpage.youtube_video_section.title")}
          </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "300",
            color: "gray",
          }}
        >
          {t("homepage.firstpage.youtube_video_section.button")}
        </Text>
      </View>
      {isLoading ? (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        videoData &&
        videoData.map((video) => (
          <VideoController key={video._id} videoId={video.videoId} />
        ))
      )}
    </View>
  );
};

export default VideoContainer;

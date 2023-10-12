import { View, Text, TextComponent } from 'react-native'
import React, { useEffect } from 'react'
import VideoController from '../../components/common/Video.controller'
import { useDataProvider } from '../../context/DataProvider'
import { extractVideoId } from '../../utility/VideoIdExtractor'

const VideoContainer = () => {
    const {videoData} = useDataProvider()
    
  return (
    <View className=" mb-5 p-2 rounded-md">
        <View className="py-2 px-1 flex flex-row items-center justify-between">
            <Text className="text-2xl font-semibold">Explore our video</Text>
            <Text style={{
                fontSize:17,
                fontWeight:'300',
                color:'gray'
            }}>see more videos</Text>
        </View>{
            videoData.map(video=><VideoController key={video._id} videoId={video.videoId} />)
        }
    </View>
  )
}

export default VideoContainer
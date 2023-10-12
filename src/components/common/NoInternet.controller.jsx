import { View, Text,Image } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const NoInternetController = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const {width,height} = useWindowDimensions()
  return (
    <View className="flex-1  items-center justify-center">
      <Image resizeMode="contain" source={require('../../../assets/Images/noInternet.png')} style={{width:width , height:height / 3, paddingHorizontal:10}} >

      </Image>
      <Text className=" text-[16px] font-bold text-center">
          Oops, the Network is lost, refresh and try!
        </Text>
        <TouchableOpacity
          onPress={handleRefresh}
          className=" w-1/2 h-14 border-[1px] border-primary m-5 rounded-md items-center justify-center"
        >
          <Text className ="text-lg">Refresh</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NoInternetController
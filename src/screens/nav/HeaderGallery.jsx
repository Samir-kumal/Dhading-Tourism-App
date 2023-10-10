import { View, TouchableOpacity, Image,Text } from "react-native";
import React from "react";
import * as Svg from "react-native-svg";
import { icons, images } from "../../constants";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/Auth";
const HeaderGallery = ({ show, setShow }) => {
  const { user } = useAuth();

  const router = useRouter();

  return (
    <View className="">
      <View className=" h-16  z-10 bg-white w-full justify-center  mb-1  rounded-xl rounded-t-none  ">
        <View className="flex flex-row items-center justify-between px-5">
        <View className="  h-12  flex flex-row items-center justify-center">
            <TouchableOpacity className="" onPress={() => setShow(!show)}>
              <Svg.SvgXml xml={icons.menu} />
            </TouchableOpacity>
          </View>
          <View>
            <Text>
                Gallery
            </Text>
          </View>
          <TouchableOpacity
            className=" w-12 h-12 rounded-full"
            onPress={() => router.push("/profile")}
          >
  
            <>
              {user?.photoURL || user?.photo ? (
                <Image
                  className="w-full h-full rounded-full"
                  source={{ uri: user?.photoURL || user?.photo }}
                />
              ) : (
                <Image
                  className="w-full h-full rounded-full"
                  source={images.user_profile}
                />
              )}
            </>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

export default HeaderGallery;

import { View, TouchableOpacity, Image,Text } from "react-native";
import React from "react";
import * as Svg from "react-native-svg";
import { icons, images } from "../../constants";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/Auth";
import { useTranslation } from "react-i18next";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
const HeaderGallery = ({ show, setShow }) => {
  const { user } = useAuth();
  const {t} = useTranslation();
  const router = useRouter();

  return (
    <View className="">
      <View className=" h-16  z-10 bg-white w-full justify-center  mb-1  rounded-xl rounded-t-none  ">
        <View className="flex flex-row items-center justify-between px-5">
        <View className="  h-12  flex flex-row items-center justify-center">
            <TouchableOpacity onPress={()=>router.push("/home")} className="w-4" >
            <FontAwesome5 name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text className = "font-bold text-xl">
               {t("gallery.title")}
            </Text>
          </View>
          <TouchableOpacity
            className=" w-10 h-10 rounded-full"
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

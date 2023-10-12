import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as Svg from "react-native-svg";
import { icons, images } from "../../constants";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/Auth";
const Header = ({ show, setShow }) => {
  const { user } = useAuth();

  const router = useRouter();

  return (
    <View className="">
      <View className=" h-16 absolute z-10 w-full justify-center  mb-1  rounded-xl rounded-t-none  ">
        <View className="flex flex-row items-center justify-between px-5">
        <View className="  h-12  flex flex-row items-center justify-center">
          
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

export default Header;

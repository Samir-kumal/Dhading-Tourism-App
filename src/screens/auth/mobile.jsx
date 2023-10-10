import { View, Text, TextInput,useColorScheme } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import * as Svg from "react-native-svg";
import Button from "../../components/common/Button";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
const url = ``;
const Mobile = () => {
  const [number, setNumber] = useState(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  console.log(number);
  const handleSubmit = () => {
    setIsLoading(true);
    if (!number || !number?.length >= 10) {
      setIsLoading(false);
      return setError("Please enter valid number.");
    }
    // send sms to user with OTP and redirect him back here after verification
    axios
      .post(
        "https://visitpanauti.vercel.app/v1/phone/otp?apiKey=3fba649578447eb76c59",
        {
          phone: number,
        }
      )
      .then(async (response) => {
        if (response.data.success) {
          await AsyncStorage.setItem("@user_phone", number);
          setTimeout(() => {
            setIsLoading(false);
            router.replace("/otp");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  return (
    <SafeAreaView className="h-screen w-full relative flex items-center justify-center bg-secondary">
       <StatusBar style={colorScheme === 'dark' ? 'light-content' : 'dark-content'}   />
      <View className="h-80 w-full  absolute top-28 flex flex-col justify-center items-center">
      <Text className="font-bold text-3xl py-4">Sign In with Phone</Text>

        <Text className="font-bold text-xl py-4 text-primary">Enter your mobile number</Text>

        <View className="w-full justify-center   relative items-center">
          <Svg.SvgXml
            className="absolute top-[26px] left-10 z-10"
            xml={icons.call}
          />
          <TextInput
            className={
              "px-4 pl-12 my-2  w-[85%] m-2 rounded-lg py-4 focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder="Phone no"
            keyboardType="phone-pad"
            value={number}
            onChangeText={(value) => setNumber(value)}
          />
        </View>
        <Text>
          {err && (
            <View className="h-fit w-full px-8 flex items-start ">
              <Text className=" text-[#ff0000]">{err}</Text>
            </View>
          )}
        </Text>
        <Button
          handleSubmit={handleSubmit}
          ClassName="bg-primary mt-2"
          textClassName="text-white"
          isLoading={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            "continue"
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Mobile;

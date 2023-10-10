import { View, Text, TextInput, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import * as Svg from "react-native-svg";
import Button from "../../components/common/Button";
import { useRouter } from "expo-router";
import axios from "axios";
import { useFormik } from "formik";
import { forgotSchema } from "../../../schema";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Forgot() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  const onSubmit = async () => {
    setIsLoading(true);

    axios
      .post(
        "http://103.140.1.252/v1/auth/forgot?apiKey=3fba649578447eb76c59",
        values
      )
      .then(async (response) => {
        setError("");
        let client = response.data;
        if (client.sucess) {
          await AsyncStorage.setItem(
            "@user_email",
            JSON.stringify(values.email)
          );
          setTimeout(async () => {
            setIsLoading(false);
            Alert.alert("Sucess", `${client.message} to your email.`, [
              {
                text: "OK",
                onPress: () =>
                  router.replace({ pathname: "/otp", params: { values } }),
              },
            ]);
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setError(error.response.data.message);
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotSchema,
      onSubmit,
    });

  const router = useRouter();
  return (
    <SafeAreaView className="h-screen w-full relative bg-secondary flex items-center justify-center ">
      <View className="h-80 w-full  absolute top-28 flex flex-col justify-center items-center">
        <Text className="font-bold text-xl py-4">Forgot your password?</Text>
        <Text className="px-8 text-center py-2">
          Enter your registered email below to receive password reset
          instruction
        </Text>

        <View className="w-full justify-center relative items-center">
          <Svg.SvgXml
            className="absolute top-[26px] left-10 z-10"
            xml={icons.email}
          />
          <TextInput
            className={
              errors.email && touched.email
                ? " px-4 pl-12 my-2  transition ease-in-out animate-shake w-[85%] m-2 rounded-lg py-4 border-[1.5px] border-red  bg-[#FFE6E0]"
                : "  px-4 pl-12 my-2  w-[85%] m-2 rounded-lg py-4 focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            onSubmitEditing={onSubmit}
          />
          {errors.email && touched.email && (
            <View className="h-fit w-full px-8 flex items-start ">
              <Text className=" text-[#ff0000]">{errors.email}</Text>
            </View>
          )}
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
          // onPress={() => router.push("/otp")}
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
}

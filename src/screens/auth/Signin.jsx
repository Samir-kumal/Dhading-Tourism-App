import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Modal,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Button from "../../components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import * as Svg from "react-native-svg";
import { useFormik } from "formik";
import { signinSchema } from "../../../schema/index";
import { icons } from "../../constants";
import LocalizationBtn from "../../Localization";
import GoogleBtn from "../../containers/ThirdpartyLogin/GoogleBtn";
import { InternetContext } from "../../context/Internet";
//add where it you want to redirect
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import GuestLogin from "../../containers/ThirdpartyLogin/GuestLogin";
import getUser from "../../hooks/getUser";
import { useBackButtonExit } from "../../helpers/BackButtonHandler";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/Auth";
import CircleWrapper from "../../components/common/CircleWrapper";
import Logo from "../../components/common/Logo";
WebBrowser.maybeCompleteAuthSession();

const Signin = () => {
  console.log("check point -2: signin screen");
  useBackButtonExit();
  const { signIn } = useAuth();
  const { t } = useTranslation();
  const [err, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const internet = useContext(InternetContext);

  const handleKeyboardSubmit = () => {
    onSubmit(); // Call the onSubmit method here
  };

  const onSubmit = () => {
    setIsLoading(true);

    axios
      .post(
        "http://103.140.1.252/v1/auth/login?apiKey=3fba649578447eb76c59",
        values
      )
      .then(async (response) => {
        setError(false);
        const userObj = await getUser(response.data.token);
        console.log(userObj, "from sign in screen");
        signIn(userObj);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.message);
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signinSchema,
      onSubmit,
    });

  return (
    <>
      <SafeAreaView className="bg-secondary flex-1 h-full">
        <StatusBar
          style={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <View className="z-10  h-0">
          <CircleWrapper />
        </View>
        
        <View className="h-40 w-full relative justify-center items-center ">
          {/* <View className="langButton absolute top-5 right-7">
            <LocalizationBtn />
          </View> */}

          <Text className="text-black text-4xl font-bold mt-8 pt-6 space-x-1">
            {t("signinPage.title")}
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center">
          <Logo source="signin" size={180} />
        </View>

        {/* sign up container */}
        <View className=" flex justify-center  w-full h-72  items-center">
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
              placeholder={t("signinPage.placeholder.email")}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {errors.email && touched.email && (
              <View className="h-fit w-full px-8 flex items-start ">
                <Text className=" text-[#ff0000]">{errors.email}</Text>
              </View>
            )}
          </View>
          <View className="w-full justify-center relative items-center">
            <Svg.SvgXml
              className="absolute top-[26px] left-10 z-10"
              xml={icons.key}
            />
            <TextInput
              className={
                errors.password && touched.password
                  ? " px-4 pl-12 my-2  transition ease-in-out animate-shake w-[85%] m-2 rounded-lg py-4 border-[1.5px] border-red  bg-[#FFE6E0]"
                  : "  px-4 pl-12 my-2  w-[85%] m-2 rounded-lg py-4 focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
              }
              placeholder={t("signinPage.placeholder.pass")}
              secureTextEntry={true}
              value={values.password}
              onChangeText={handleChange("password")}
              onSubmitEditing={handleKeyboardSubmit}
            />
            {errors.password && touched.password && (
              <View className="h-fit w-full px-8 flex items-start ">
                <Text className=" text-[#ff0000]">{errors.password}</Text>
              </View>
            )}
            <Text>
              {err && (
                <View className="h-fit w-full px-8 flex items-start ">
                  <Text className=" text-[#ff0000]">{err}</Text>
                </View>
              )}
            </Text>
          </View>

          <Button
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            ClassName="bg-primary mt-2 "
            textClassName="text-white"
          >
            {t("signinPage.button")}
          </Button>
          <Modal visible={isLoading} transparent animationType="fade">
            <View style={styles.modalBackground}>
              <View className="flex flex-row gap-x-6 px-14 py-8 bg-white items-center  justify-center rounded-md">
                <Text className="text-xl">Signing in</Text>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            </View>
          </Modal>

          <View className="flex items-end mx-6 px-8 w-full translate-y-4 ">
            <Link href={"/forgot"} asChild>
              <Text className="text-red"> {t("signinPage.forgPass")}</Text>
            </Link>
          </View>
        </View>

        <View className="flex justify-center mt-2  flex-row">
          <GoogleBtn />
          <GuestLogin status={internet.status} text={t("signinPage.guest")} />
        </View>
        <View className="flex items-center mt-0 translate-y-5 mx-4">
          <Text>
            {t("signinPage.dont_have_account")}
            <Link href={"/signup"}>
              <Text className="font-bold text-base  text-primary">
                {" "}
                {t("signinPage.button2")}
              </Text>
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Signin;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});

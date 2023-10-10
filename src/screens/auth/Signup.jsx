import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import React from "react";
import * as Svg from "react-native-svg";
import Button from "../../components/common/Button";
import { icons } from "../../constants";
import { useFormik } from "formik";
import { useRouter } from "expo-router";
import { signupSchema } from "../../../schema/index";
import axios from "axios";
import { useTranslation } from "react-i18next";
const Signup = () => {
  console.log("check point -3: signup screen");
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setError] = React.useState("");
  const {t}  = useTranslation();



  const router = useRouter();

  // Function to handle the keyboard submit event
  const handleKeyboardSubmit = () => {
    onSubmit(); // Call the onSubmit method here
  };

  const onSubmit = () => {
    setIsLoading(true);

    axios
      .post(
        "http://103.140.1.252/v1/auth/signup?apiKey=3fba649578447eb76c59",
        values
      )
      .then((response) => {
        setError("");
        let client = response.data;
        if (client.success) {
          setTimeout(() => {
            setIsLoading(false);
            // router.replace("/signin")
            Alert.alert(t("signupPage.alertbox.title"), t("signupPage.alertbox.msg"), [
              {
                text: "OK",
                onPress: () => router.replace("/signin"),
              },
            ]);
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.message);
      });
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit,
    });



  return (
    <View className="bg-[#E9EEF2] h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className=" flex justify-center  w-full h-fit  z-40 items-center"
      >
        <View className="h-40 w-full flex justify-center items-center ">
          <Text className="text-black translate-y-2 font-bold text-3xl">  {t("signupPage.title")}</Text>
        </View>

        <View className="w-full justify-center relative items-center">
          <Svg.SvgXml
            className="absolute top-[26px] left-10 z-10"
            xml={icons.user1}
          />

          <TextInput
            className={
              errors.name && touched.name
                ? " px-4 pl-12 my-2 border-[1.5px] transition ease-in-out animate-shake w-[85%] m-2 rounded-lg py-4  border-red  bg-[#FFE6E0]"
                : "  px-4 pl-12 my-2  w-[85%] m-2 rounded-lg py-4 focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder={t("signupPage.placeholder.name")}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
          />
          {errors.name && touched.name && (
            <View className="h-fit w-full px-8 flex items-start ">
              <Text className=" text-[#ff0000]">{errors.name}</Text>
            </View>
          )}
        </View>

        <View className="w-full justify-center relative items-center">
          <Svg.SvgXml
            className="absolute top-[26px] left-10 z-10"
            xml={icons.email}
          />

          <TextInput
            className={
              errors.email && touched.email
                ? " px-4 pl-12 my-2 border-[1.5px] transition ease-in-out animate-shake w-[85%] m-2 rounded-lg py-4  border-red  bg-[#FFE6E0]"
                : "  px-4 pl-12 my-2  w-[85%] m-2 rounded-lg py-4  focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder={t("signupPage.placeholder.email")}
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
                ? " px-4 pl-12 my-2 border-[1.5px] transition ease-in-out animate-shake w-[85%] m-2 rounded-lg py-4  border-red  bg-[#FFE6E0]"
                : "  px-4 pl-12 my-2  w-[85%] m-2 rounded-lg py-4  focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder={t("signupPage.placeholder.pass")}
            secureTextEntry={true}
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            onSubmitEditing={handleKeyboardSubmit}
          />
          {errors.password && touched.password && (
            <View className="h-fit w-full px-8 flex items-start ">
              <Text className=" text-[#ff0000]">{errors.password}</Text>
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
              errors.confirmPassword && touched.confirmPassword
                ? " px-4 pl-12 my-2 border-[1.5px] transition ease-in-out animate-shake w-[85%] m-2 rounded-lg py-4  border-red  bg-[#FFE6E0]"
                : "  px-4 pl-12 my-2  w-[85%] m-2 rounded-lg py-4  focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder={t("signupPage.placeholder.confirm_pass")}
            secureTextEntry={true}
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            onSubmitEditing={handleKeyboardSubmit}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <View className="h-fit w-full px-8 flex items-start ">
              <Text className=" text-[#ff0000]">{errors.confirmPassword}</Text>
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
        <Modal visible={isLoading} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View className="flex flex-row gap-x-5 px-14 py-5 bg-white items-center  justify-center rounded-md">
              <Text className="text-lg">{t("signupPage.msg")}</Text>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          </View>
        </Modal>

        <Button
          handleSubmit={handleSubmit}
          ClassName="bg-primary mt-2"
          textClassName="text-white"
          isLoading={isLoading}
        >
        {t("signupPage.button")}
        </Button>
      </KeyboardAvoidingView>

      <View className="flex items-center  mx-4 my-6 ">
        <Text>
        {t("signupPage.already_have_account")}
        </Text>
        <Text
            className="font-bold  text-primary"
            onPress={() => router.push("/signin")}
          >
            {t("signupPage.button2")}
          </Text>
      </View>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

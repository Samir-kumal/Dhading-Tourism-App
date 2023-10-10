import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Button from "../../components/common/Button";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  console.log(password, confirmPassword);

  const handleSubmit = () => {
    setIsLoading(true);
    if (password === confirmPassword) {
      setIsLoading(false);
      return setError("password and confrim password should match.");
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

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text className="pl-5 font-bold text-xl">New Password</Text>

        <View className="items-center">
          <TextInput
            className={
              "px-4 pl-5 my-2  w-[85%] m-2 rounded-lg py-4 focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder="New password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            // onBlur={handleBlur("email")}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text className="pl-5 font-bold text-xl">Confirm New Password</Text>

        <View className="items-center">
          <TextInput
            className={
              "px-4 pl-5 my-2  w-[85%] m-2 rounded-lg py-4 focus:border-[1.5px] focus:border-primary  bg-[#ffffff]"
            }
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry
            editable={password !== ""}
            // onBlur={handleBlur("email")}
          />
        </View>
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
        // onPress={() => router.push("/otp")}
        ClassName="bg-primary mt-2"
        textClassName="text-white"
        isLoading={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          "SUBMIT"
        )}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },

  buttonContainer: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#8062F8",
    opacity: 0.5,
  },
  buttonEnabled: {
    opacity: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default PasswordReset;

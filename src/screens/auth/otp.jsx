import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Clipboard,
  ActivityIndicator,
} from "react-native";
import Button from "../../components/common/Button";

const Otp = ({ email }) => {
  const router = useRouter();
  const otpInputs = Array.from({ length: 6 }, () => useRef());
  const [activeInput, setActiveInput] = useState(0);
  const [resendTimer, setResendTimer] = useState(59);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("@user_email");
        setEmail(JSON.parse(email));
      } catch (error) {
        console.log(error);
      }
    };
    getEmail();
  }, []);
  
  const handleOTPInputChange = (index, value) => {
    if (value === "") {
      if (index > 0) {
        otpInputs[index - 1].current.focus();
      }
    } else if (value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].current.focus();
    } else if (value === "" && index > 0) {
      otpInputs[index - 1].current.focus();
      otpInputs[index - 1].current.clear();
    }
  };

  const handleOTPInputPaste = async () => {
    const otp = await Clipboard.getString();

    const otpDigits = otp.split("");

    otpDigits.forEach((digit, index) => {
      if (otpInputs[index] && otpInputs[index].current) {
        otpInputs[index].current.setNativeProps({ text: digit });
        handleOTPInputChange(index, digit);
      }
    });

    // Update the input values using useState
    const updatedValues = otpDigits.slice(0, otpInputs.length);
    setActiveInput(otpInputs.length - 1); // Set the active input to the last one
    updatedValues.forEach((value, index) => {
      otpInputs[index].current.value = value;
    });
  };

  useEffect(() => {
    otpInputs.forEach((input, index) => {
      const { current: textInput } = input;
      textInput.setNativeProps({ maxLength: 1 });
    });
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleInputFocus = (index) => {
    setActiveInput(index);
  };

  const handleOTPSubmit = async () => {
    setIsLoading(true);
    // Perform any necessary API requests or actions here
    axios
      .post(
        "https://103.140.1.252/v1/auth/verify?apiKey=3fba649578447eb76c59",
        {
          email: email,
          token: finalOTP,
        }
      )
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {
          setTimeout(() => {
            router.replace("/password-reset");
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  // const fullOTP = otpInputs.map(input => input.current.value).join("");
  // console.log("The full OTP value is:" + fullOTP);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Enter the OTP sent to your registered email
      </Text>
      <Text style={styles.email}>{email}</Text>

      {/* OTP enter box */}
      <View style={styles.otpContainer}>
        {otpInputs.map((input, index) => (
          <TextInput
            key={index}
            ref={input}
            style={[
              styles.otpInput,
              activeInput === index && styles.activeInput,
            ]}
            placeholder="*"
            placeholderTextColor="#E5E5E5"
            keyboardType="numeric"
            onChangeText={(value) => handleOTPInputChange(index, value)}
            onPaste={handleOTPInputPaste}
            onFocus={() => handleInputFocus(index)}
            onSubmitEditing={handleOTPSubmit}
          />
        ))}
      </View>

      {/* Display error message here if the OTP doesn't match*/}
      <Text>
          <View className="h-fit w-full px-8 flex items-start ">
            <Text className=" text-[#ff0000]  text-md">
              {/* Error */}
            </Text>
          </View>
      </Text>

      <Button
        handleSubmit={handleOTPSubmit}
        // handleSubmit={() => router.push("/password-reset")}
        ClassName="bg-primary mt-2"
        textClassName="text-white"
        isLoading={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          "Submit"
        )}
      </Button>

      <Text style={styles.resendTimer}>
        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
      </Text>
    </View>
  );
};

console.log()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  redirectingText: {
    fontSize: 16,
    marginTop: 10,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  email: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
  },
  otpInput: {
    flex: 1,
    height: 50,
    fontSize: 30,
    borderColor: "gray",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    width: 100,
    marginTop: 20,
    height: 20,
    paddingVertical: 20,
    backgroundColor: "blue",
  },
  resendTimer: {
    margin: 10,
    fontWeight: "bold",
  },
});

export default Otp;

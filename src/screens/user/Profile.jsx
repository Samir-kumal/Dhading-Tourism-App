import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import Colors from "../../constants/themes";
import { icons, images } from "../../constants";
import * as Svg from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import MainContainer from "../../components/common/MainContainer";

import { useAuth } from "../../context/Auth";
import { useTranslation } from "react-i18next";
import SettingContainer from "../../containers/settingsContainer/SettingsContainer";
const UserProfile = ({ setName, setEmail, setPhone }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const {t} = useTranslation();
  console.log(Object.keys(user).length === 0, " form profile");
  console.log(user)

  if(user){
console.log(user)

  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setName( user?.fullname || user?.displayName || user?.name);
    setEmail(user?.email || user?.email);
  }, [user]);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const startLoopAnimation = () => {
    fadeIn();

    setTimeout(() => {
      fadeOut();

      setTimeout(() => {
        startLoopAnimation();
      }, 2000); // Delay before starting the loop again
    }, 2000); // Duration of fade in animation
  };

  useEffect(() => {
    startLoopAnimation();

    return () => {
      fadeAnim.stopAnimation();
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    fadingContainerOne: {
      paddingHorizontal: 20,
      width: 170,
      height: 12,
      borderRadius: 100,
      marginVertical: 7,
      backgroundColor: "black",
    },
    fadingContainer: {
      paddingHorizontal: 20,
      width: 250,
      height: 12,
      borderRadius: 100,
      marginVertical: 7,

      backgroundColor: "black",
    },
    fadingContainerImage: {
      width: 120,
      height: 120,
      borderRadius: 200,
      marginBottom: 7,

      backgroundColor: "black",
    },
    fadingText: {
      fontSize: 28,
    },
  });
  return (
    <View className={`${styles.container} relative py-2 flex items-center`}>
      {loading ? (
        <View className="h-[210px] flex items-center justify-center">
          <Animated.View
            style={[
              styles.fadingContainerImage,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.fadingText}></Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.fadingContainerOne,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.fadingText}></Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.fadingText}></Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.fadingContainerOne,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.fadingText}></Text>
          </Animated.View>
        </View>
      ) : (
        <>
          <>
            {user?.photoURL || user?.photo ? (
              <Image
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: 64,
                  paddingVertical: 16,
                }}
                source={{ uri: user?.photoURL || user?.photo }}
              />
            ) : (
              <Image
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: 64,
                  paddingVertical: 16,
                }}
                source={images.user_profile}
              />
            )}
          </>
          <Text style={styles.text} className=" p-1 text-xl font-bold ">
            {user?.fullname ||  user?.name || user.user?.name || user?.displayName || "Username"}
          </Text>
          <Text
            style={[styles.text, styles.smallText]}
            className="p-1 text-lg font-bold"
          >
            {user?.email || user.user?.email || "username@gmail.com"}
          </Text>
        </>
      )}
    </View>
  );
};
//9818732092


const Profile = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const {t} = useTranslation();

  return (
    <SafeAreaView className=" bg-white flex-1">
      <Stack.Screen
        options={{
          headerTitle: name
            ? t("user_status.heading2") + name + " !"
            : t("user_status.heading2") +t("user_status.heading"),
          headerShadowVisible: false,
        }}
      />
      {user && Object.keys(user).length > 0 ? (
        <>
          <UserProfile
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
          />
          <SettingContainer name={name} email={email} phone={phone} signOut = {signOut} />
        </>
      ) : (
        <View className="h-96 items-center justify-center ">
           {/* <Svg.SvgXml xml={icons.profileCircle} style = {{height:400, width:400}} /> */}
           <FontAwesome name="user-circle" size={120} color={Colors.primary} />
          <Text style={{ fontSize: 20, marginBottom: 20, marginTop:40 }}>
            {t("user_status.msg")}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
          {t("user_status.msg2")}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            className="px-10 py-3 bg-primary rounded-lg"
            onPress={async () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  signOut();
                  resolve();
                }, 1000);
              }).then(() => {
                router.replace("/signin");
              });
            }}
          >
            <Text className="text-xl font-bold text-white ">{t("user_status.button.msg")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 270,
    width: "auto",
    padding: 20,
    borderRadius: 10,
  },
  additionalContainer: {
    // marginTop: 10,
    padding: 20,
    height: 420,
  },
  text: {
    color: "black",
    fontSize: 21,

    textAlign: "center",
    // fontFamily: "monospace",
  },
  smallText: {
    fontSize: 16,
  },
  smallerText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "#9370DB",
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  myDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 18,

    textAlign: "center",
  },
  arrow: {
    marginLeft: 30,
  },
});

export default Profile;

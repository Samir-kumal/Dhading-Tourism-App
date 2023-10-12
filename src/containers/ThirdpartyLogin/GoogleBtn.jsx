import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import Template from "./index";
import { images } from "../../constants";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../../context/Auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

WebBrowser.maybeCompleteAuthSession();
const GoogleBtn = () => {
  const { signIn } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "484802558640-166g0g6kkhnj82jkc3ruf2chd6vaifuc.apps.googleusercontent.com",
    iosClientId:
      "484802558640-vc33auh9p27s69o51m2v2l1jsidji6ia.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        signIn(user);
        
        console.log(user);
      } else {
        console.log("user not authenticated");
      }
      setTimeout(() => {
        setLoading(false);
          
        }, 2000);
    });
    return () => unsub();
  }, []);

  return (
    <View className="flex-col  items-center">
      <Template onPress={() => promptAsync()}>
        <Image className="h-6 w-6" source={images.google} />
      </Template>
      <Text className="text-lg mt-1">Google</Text>
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View className="flex flex-row gap-x-5 px-14 py-5 bg-white items-center  justify-center rounded-md">
            <Text className="text-lg">Signing in...</Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GoogleBtn;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});

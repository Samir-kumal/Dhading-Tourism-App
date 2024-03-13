import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Template from "./index";
import { images } from "../../constants";
import { useAuth } from "../../context/Auth";
import { StatusBar } from "expo-status-bar";
import Colors from "../../constants/themes";
import { useDataProvider } from "../../context/DataProvider";
const GuestLogin = ({ status, text }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showNoConnectionModal, setShowNoConnectionModal] = useState(false);
  const {  fetchData,FetchVideoData} = useDataProvider();


  return (
    <View className="flex-col  items-center">
      <Template
        onPress={() => {
          if (status) {
            setLoading(true);
            signIn({});
            setTimeout(() => {
              setLoading(!loading);
            }, 2000);
            fetchData();
            FetchVideoData();
          } else {
            setShowNoConnectionModal(true);
          }
        }}
      >
        <Image className="h-11 w-11 filter " source={images.user_profile} />
      </Template>
      <Text className="text-lg mt-1">{text} </Text>
      {/* No Internet Connection Modal */}
      <Modal visible={showNoConnectionModal} transparent animationType="fade">
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>No Internet Connection</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowNoConnectionModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* sigin in model */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View className="flex flex-row gap-x-5 px-14 py-5 bg-white items-center  justify-center rounded-md">
            <Text className="text-lg">Signing in...</Text>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GuestLogin;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

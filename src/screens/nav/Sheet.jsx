import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { icons } from "../../constants";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { useAuth } from "../../context/Auth";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
const Sheet = ({ show, setShow }) => {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  const router = useRouter();
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {}, []);

  //close menu
  const handleClose = () => {
    setShow(!show);
  };
  // renders
  return (
    <>
      <StatusBar backgroundColor="#0000003a" />
      {show && (
        <Pressable
          className="absolute flex-1 z-50 w-full h-full bottom-0 left-0  bg-[#0000003a]"
          // underlayColor="transparent"
          onPress={() => setShow(!show)}
        >
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            onClose={() => setShow(!show)}
            enablePanDownToClose={true}
            style={{
              borderWidth: 0,
              backgroundColor: "#f3f3f0",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.9,
              shadowRadius: 6.27,

              elevation: 10,
            }}
          >
            <View className="flex  flex-row  w-full  my-4  ">
              <View className=" gap-y-7 ">
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    router.push("/profile");
                    handleClose();
                  }}
                  className=" pl-12 "
                >
                  <View className="flex-row gap-x-10 w-[100vw] h-12 items-center ">
                    <SvgXml xml={icons.profileCircle} />
                    <Text className="font-bold text-lg pl-7">{t("homepage.bottomsheet.profile")}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    router.push("/help");
                    handleClose();
                  }}
                  className="w-full h-12 pl-12"
                >
                  <View className="flex-row gap-x-10 items-center h-full">
                    <SvgXml xml={icons.Help} />
                    <Text className="font-bold text-lg pl-7">{t("homepage.bottomsheet.help")}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    router.push("/about");
                    handleClose();
                  }}
                  className="w-full h-12 pl-12 "
                >
                  <View className="flex-row gap-x-10  items-center h-full">
                    <SvgXml xml={icons.about} />
                    <Text className="font-bold text-lg pl-7">{t("homepage.bottomsheet.about")}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    signOut();
                    handleClose();
                    setLoading(!loading);
                  }}
                  className="w-full h-12 pl-12  "
                >
                  <View className="flex-row gap-x-10 w-full items-center h-full">
                    <SvgXml xml={icons.logout} />
                    <Text className="font-bold text-lg pl-7">{t("homepage.bottomsheet.logout.title")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        </Pressable>
      )}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View className="flex flex-row gap-x-5 px-14 py-5 bg-white items-center  justify-center rounded-md">
            <Text className="text-lg">{t("homepage.bottomsheet.logout.msgbox")}</Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Sheet;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

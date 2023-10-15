import React from "react";
import { View, Text, Image, StyleSheet, Linking } from "react-native";
import { images } from "../../constants";
import { useTranslation } from "react-i18next";


// routes to /about
export default function About() {
  const {t} = useTranslation();
  return (
    <View style={styles.MainWrapper}>
      <View>
        <View style={styles.LogoWrapper}>
          <Image style={styles.LogoImage} source={images.logo2} />
        </View>
        <View style={styles.TitleHeading}>
          <Text
            style={styles.TitleText}
            className="text-center font-bold text-3xl"
          >
             {t("about.title")}
          </Text>
        </View>
        <View style={styles.DescriptionWrapper}>
          <Text style={styles.DescriptionText} className =" px-2">
          {t("about.desc1")}
          </Text>
          <Text style={styles.DescriptionText} className ="mt-4 px-2">
            {t("about.desc2")}
          </Text>
        </View>
      </View>
      <View className="w-full  flex items-center justify-center h-12 -translate-y-8 rounded-md bg-primary">
        <Text
          className="text-xl text-white"
          onPress={() => {
            Linking.openURL("https://jwalamukhimun.gov.np/");
          }}
        >
          {t("about.button")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainWrapper: {
    flex: 1,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  LogoWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  LogoImage: {
    width: 150,
    height: 150,
  },
  TitleHeading: {
    paddingTop: 0,
  },
  TitleText: {
    // color: "#C70039",
  },
  DescriptionWrapper: {
    width: "100%",
    paddingTop: 20,
  },
  DescriptionText: {
    textAlign: "justify",
    fontSize: 16,
    fontWeight: "400",
  },
  FullLogoWrapper: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  FullLogoImage: {
    width: "80%",
    height: "100%",
    alignItems: "center",
    resizeMode: "contain",
  },
});

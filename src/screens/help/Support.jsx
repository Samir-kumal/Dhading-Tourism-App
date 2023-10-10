import React, { useCallback, useMemo, useRef } from "react";

import * as Svg from "react-native-svg";
import { icons, images } from "../../constants";

import { View, Text, StyleSheet, Image, Linking } from "react-native";
import MainContainer from "../../components/common/MainContainer";

export default function Support() {
  const phoneNumber = "+977-9812345678";
  const email = "info@panautimun.gov.np";

  return (
    <MainContainer>
      <View className="w-full h-[32vh]  bg-primary">
        <Image
          source={images.support}
          className="w-full h-full "
          resizeMode="cover"
        />
      </View>
      <Text style={styles.headText}>Get support for this app</Text>
      <View style={styles.boxWrapper}>
        <View style={styles.box}>
          <View style={styles.iconHolder}>
            <Svg.SvgXml xml={icons.call} />
          </View>
          <View style={styles.textHolder}>
            <Text>Help center:{"\n"}+977 - 9812345678</Text>
          </View>
          <View style={styles.linkHolder}>
            <Text
              style={styles.linkHolderText}
              onPress={() => {
                Linking.openURL(`tel:${phoneNumber}`);
              }}
            >
              Call
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.iconHolder}>
            <Svg.SvgXml xml={icons.email} />
          </View>
          <View style={styles.textHolder}>
            <Text>info@panautimun.gov.np</Text>
          </View>
          <View style={styles.linkHolder}>
            <Text
              style={styles.linkHolderText}
              onPress={() => {
                Linking.openURL(`mailto:${email}`);
              }}
            >
              Send a mail
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.iconHolder}>
            <Svg.SvgXml xml={icons.viber} />
          </View>
          <View style={styles.textHolder}>
            <Text>Viber:{"\n"}+977 - 9812345678</Text>
          </View>
          <View style={styles.linkHolder}>
            <Text
              onPress={() => {
                Linking.openURL(`viber://chat?number=${phoneNumber}`);
              }}
              style={styles.linkHolderText}
            >
              Go to Viber
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.iconHolder}>
            <Svg.SvgXml xml={icons.globe} />
          </View>
          <View style={styles.textHolder}>
            <Text>https://www.panautimun.gov.np/</Text>
          </View>
          <View style={styles.linkHolder}>
            <Text
              style={styles.linkHolderText}
              onPress={() => {
                Linking.openURL(`https://www.panautimun.gov.np/`);
              }}
            >
              Visit Website
            </Text>
          </View>
        </View>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  boxWrapper: {
    width: "100%",
    flex: 1,
    marginBottom: 10,
  },
  box: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    borderColor: "#876CF0",
    borderWidth: 1,
    height: 50,
  },
  iconHolder: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 15,
  },
  textHolder: {
    flex: 4,
    isplay: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  linkHolder: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  linkHolderText: {
    fontWeight: "bold",
    color: "blue",
  },
  headText: {
    width: "100%",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    fontSize: 25,
  },
});

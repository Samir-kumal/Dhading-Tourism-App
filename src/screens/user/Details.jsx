import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../constants";
import MainContainer from "../../components/common/MainContainer";
import { useLocalSearchParams, Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const Details = () => {
  const { name, email, phone } = useLocalSearchParams();
  const {t} = useTranslation();
  return (
    <MainContainer>
      <Stack.Screen options={{ headerTitle: name }} />
      <View className="">
        <Text style={styles.topHeading} className={`font-bold text-3xl mx-5`}>
          Personal Information
        </Text>
      </View>
      <View style={styles.mainWrapper} className="my-8">
        <View style={styles.boxWrapper} className={`pb-5`}>
          <Text style={styles.headingText}>{t("details.full_name")}</Text>
          <Text style={styles.userInfo}>{name}</Text>
          {/* The text elements with styles object as userInfo has its value fetched from database */}
        </View>
        <View style={styles.boxWrapper} className={`pb-5`}>
          <Text style={styles.headingText}>{t("details.email")}</Text>
          <Text style={styles.userInfo}>{email}</Text>
        </View>
        <View style={styles.boxWrapper} className={`pb-5`}>
          <Text style={styles.headingText}>{t("details.phone")}</Text>
          <Text style={styles.userInfo}>{phone? phone : "Not Available"}</Text>
        </View>
        {/* <View style={styles.boxWrapper} className={`pb-5`}>
          <Text style={styles.headingText}>Gender</Text>
          <Text style={styles.userInfo}>Male </Text>
        </View> */}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  topHeading: {
    color: theme.DarkPurple,
  },
  mainWrapper: {
    display: "flex",
  },
  boxWrapper: {
    borderBottomColor: theme.PurpleBorder,
    borderBottomWidth: 1,
    paddingTop: 15,
  },
  headingText: {
    fontSize: 22,
    paddingLeft: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: 500,
    opacity:0.6
  },
});

export default Details;

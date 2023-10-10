import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../constants";
import MainContainer from "../../components/common/MainContainer";
import { useLocalSearchParams, Stack } from "expo-router";

const Details = () => {
  const { name, email, phone } = useLocalSearchParams();
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
          <Text style={styles.headingText}>Full Name</Text>
          <Text style={styles.userInfo}>{name}</Text>
          {/* The text elements with styles object as userInfo has its value fetched from database */}
        </View>
        <View style={styles.boxWrapper} className={`pb-5`}>
          <Text style={styles.headingText}>Email</Text>
          <Text style={styles.userInfo}>{email}</Text>
        </View>
        <View style={styles.boxWrapper} className={`pb-5`}>
          <Text style={styles.headingText}>Phone Number</Text>
          <Text style={styles.userInfo}>{phone}</Text>
        </View>
        <View style={styles.boxWrapper} className={`pb-5`}>
          <Text style={styles.headingText}>Gender</Text>
          <Text style={styles.userInfo}>Male </Text>
        </View>
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
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    paddingLeft: 35,
    fontWeight: 500,
  },
});

export default Details;

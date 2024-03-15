import { View, Text } from "react-native";
import React from "react";
import Button from "../../components/common/Button";
import { useRouter } from "expo-router";
import CircleWrapper from "../../components/common/CircleWrapper";
import Logo from "../../components/common/Logo";

const Welcome = () => {
  const router = useRouter();
  return (
    <View>
      <View className="z-10 h-60">
       <CircleWrapper/>
      </View>
      <View className="w-full h-fit gap-y-12  flex items-center justify-center">
        <View className="flex flex-col items-center justify-center">
          <Logo source="welcome" size={180} />
          
          <View className="flex items-center gap-y-6 mt-4">
            <Text className="text-xl font-bold">WELCOME TO JWALAMUKHI</Text>
            <Text className="text-center px-8">
              Jwalamukhi Rural Municipality is an small yet beautiful place for your tourism destination, where
              a lot of things are available to explore. the place has a unique
              type of beauty of its own
            </Text>
          </View>
        </View>

        <View className="w-full h-fit flex items-center justify-center">
          
          <Button handleSubmit={() => router.push("/signin")}>
            Get Started
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

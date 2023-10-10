import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitle: "",
        tabBarStyle: {
          backgroundColor: "#E9EEF2",
          height: 0,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#ffff",
        },
        headerShown: false,
      }}
    >
      
    </Tabs>
  );
};

export default TabsLayout;

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
      <Tabs.Screen name="likes" 
      options={{
        title: "Home",
        headerShown: false,
        headerTitleStyle: {
          color: "#000",
          fontSize: 25,
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerTitle: "Saved Places",
        

      }}
      />
      
    </Tabs>
  );
};

export default TabsLayout;

import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const MainContainer = (props) => {
  return (
    <SafeAreaView className={`flex-1  relative bg-white ${props.className}`}>
      {props.children}
    </SafeAreaView>
  );
};

export default MainContainer;

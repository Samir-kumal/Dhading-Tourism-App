import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/themes";

const MainContainer = (props) => {
  return (
    <SafeAreaView style = {{backgroundColor:Colors.theme}} className={`flex-1  relative  ${props.className}`}>
      {props.children}
    </SafeAreaView>
  );
};

export default MainContainer;

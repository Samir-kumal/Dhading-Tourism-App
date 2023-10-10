// This component is used to render the package selectors and the content of the package selector.

import React, { useState, useContext } from "react";
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from "react-native";
import { packageMessages } from "../../api/data";
import PopularPackage from "../../containers/packages/PopularPackage";
import { DataContext } from "../../context/DataProvider";
const Packages = () => {
  const [showComponent, setShowComponent] = useState(true);
  const [pressedButton, setPressedButton] = useState("Popular");
  const {datas} = useContext(DataContext);
  const handleButtonPress = (buttonName) => {
    if (buttonName === pressedButton) {
      setShowComponent(false);
      setPressedButton(null);
    } else {
      setShowComponent(true);
      setPressedButton(buttonName);
    }
  };

const filteredData = datas.filter((item) => {
  if (pressedButton === "Popular") {
    return item;
  } else if (item.completeTravel === pressedButton) {
    return item;
  }
});

  return (
    <SafeAreaView className="bg-secondary">
      <View className = " h-12 w-full flex bg-primary justify-center items-center">
      <ScrollView  contentContainerStyle = {{justifyContent: 'center' }} showsHorizontalScrollIndicator = {true} horizontal= {true} className = "bg-secondary h-10 w-full absolute" >
       
       <Text
         onPress={() => handleButtonPress("All Wards")}
         style={[
           styles.selectorButton,
           pressedButton === "All Wards" && styles.pressedButton,
         ]}
       >
        All Wards
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 1")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 1" && styles.pressedButton,
         ]}
       >
         Ward 1
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 2")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 2" && styles.pressedButton,
         ]}
       >
         Ward 2
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 3
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 4
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 5
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 6
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 7
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 8
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 9
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 10
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 11
       </Text>
       <Text
         onPress={() => handleButtonPress("Ward 3")}
         style={[
           styles.selectorButton,
           pressedButton === "Ward 3" && styles.pressedButton,
         ]}
       >
         Ward 12
       </Text>
     </ScrollView>
      </View>
     
  
      {pressedButton === "Day 1" && (
        <View>
          {showComponent && (
            <PopularPackage data={filteredData} packages={packageMessages["Day 1"]} />
          )}
        </View>
      )}
      {pressedButton === "Day 2" && (
        <View>
          {showComponent && (
            <PopularPackage data={filteredData} packages={packageMessages["Day 2"]} />
          )}
        </View>
      )}
      {pressedButton === "Day 3" && (
        <View>
          {showComponent && (
            <PopularPackage data={filteredData} packages={packageMessages["Day 3"]} />
          )}
        </View>
      )}
      {pressedButton === "Popular" && (
        <View>
          {showComponent && <PopularPackage data={filteredData} packages={packageMessages["Day 1"]}  />}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  packageSelectorWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  selectorButton: {
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    flex: 1,
    height: 30,
    paddingHorizontal: 12,
    paddingVertical:2,
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 5,
    marginRight: 5,
    fontWeight: "normal",
    fontSize: 14,
  },
  pressedButton: {
    backgroundColor: "#876CF0",
    color: "white",
    width: "100%",
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
});

export default Packages;

import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PlaceCard from "./PlaceCard";
import { DataContext } from "../../context/DataProvider";
import { FlashList } from "@shopify/flash-list";
import { icons } from "../../constants";
import * as Svg from "react-native-svg";
import Search from "../search/Search";
import { StatusBar } from "expo-status-bar";

const Places = ({ limit, search }) => {
  const { datas } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get("window").height * 0.8;
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(datas);
  const [selectedWardNo, setSelectedWardNo] = useState(null);

  const handleWardNoClick = (wardNo) => {
    setSelectedWardNo(wardNo);
    console.log(wardNo);
  };
  const wardNumbers = Array.from(
    new Set(datas.map((item) => item.wardno)),
    Number
  ).sort((a, b) => a - b);

  const [showOptionsModal, setShowOptionsModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const searchPlace = (placeSlugName) => {
    const lowercaseSlugName = placeSlugName.toLowerCase();
    const lowercaseSearchKeyword = searchKeyword.toLowerCase().trim();
    const firstWord = lowercaseSearchKeyword.split(" ")[0];

    return lowercaseSlugName.startsWith(firstWord) ? placeSlugName : null;
  };

  // Filter the data based on the searchKeyword
  useEffect(() => {
    if (searchKeyword.trim().length > 0) {
      const matchingPlaces = datas.filter((place) =>
        searchPlace(place.slug_name)
      );
      setFilteredData(matchingPlaces);
    } else {
      setFilteredData(datas);
    }
  }, [searchKeyword, datas]);

  // Apply the limit to the data if provided
  useEffect(() => {
    if (limit && Number.isInteger(limit) && limit > 0) {
      setFilteredData((prevData) => prevData.slice(0, limit));
    }
  }, [limit]);

  useEffect(() => {
    if (selectedWardNo !== null) {
      const wardData = datas.filter((place) => {
        const result = parseInt(place.wardno);
        return result === selectedWardNo;
      });
      setFilteredData(wardData);
    }
  }, [selectedWardNo]);
  // Check if data array is null or contains only null elements
  const dataIsNull = filteredData.length === 0;

  return (
    <View style={{ width: "100%", backgroundColor: "white", height: "100%" }}>
      <View className="flex-row items-center pr-4">
        <Search
          searchKeyword={searchKeyword}
          setSearchKeyWord={setSearchKeyword}
          width={"w-[90%]"}
        />
        <TouchableOpacity
          onPress={() => setShowOptionsModal(true)}
          className="h-8 w-8 flex items-center justify-center  bg-[#0000001c] rounded-full"
        >
          <Svg.SvgXml xml={icons.filterSearch} height={15} />
        </TouchableOpacity>
      </View>
      {selectedWardNo && (
        <Text className="text-md  pl-5 mb-2">
          {selectedWardNo ? "Result \n wardno: " + selectedWardNo : ""}
        </Text>
      )}

      <Modal
        visible={showOptionsModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
        <View style={styles.modalContainer}>
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Select Ward No:</Text>
            {/* Step 8: Display the list of ward numbers as options */}
            {wardNumbers.map((wardNo) => (
              <TouchableOpacity
                key={wardNo}
                style={styles.optionItem}
                onPress={() => {
                  handleWardNoClick(wardNo);
                  setShowOptionsModal(false);
                }}
                className=" border-b-[1px] border-[#0000001a] flex flex-row item-center justify-center"
              >
                <Text style={styles.optionText}>{wardNo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {isLoading ? (
        <View
          style={{
            height: height,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={"#8062F8"} />
        </View>
      ) : (
        <>
          {dataIsNull ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Svg.SvgXml xml={icons.noPlaceFound} />
              <Text style={{ fontSize: 20, padding: 5 }}>Place not found</Text>
            </View>
          ) : (
            <FlashList
              data={filteredData}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={360}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <PlaceCard item={item} />}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
  },
});

export default Places;

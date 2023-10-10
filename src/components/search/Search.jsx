import { View, TextInput } from "react-native";
import React from "react";

import { icons } from "../../constants";
import * as Svg from "react-native-svg";

const Search = ({ searchKeyword, setSearchKeyWord, width }) => {
  const handleSearch = (text) => {
    setSearchKeyWord(text);
  };

  const widthVal = width ? width : "w-full";
  return (
    <View className={`px-5 mb-2 ${widthVal}`}>
      <View className="flex flex-row justify-around rounded-lg   items-center border-[1px] bg-white border-primary">
        <Svg.SvgXml className="" xml={icons.search} />
        <TextInput
          className=" w-[80%] h-12 rounded-lg"
          placeholder="Search places"
          value={searchKeyword}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

export default Search;

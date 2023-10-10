import { View, Text,ScrollView } from "react-native";
import React, {useContext} from "react";
import { data } from "../../api/data";
import { useLocalSearchParams } from "expo-router";
import PlaceCard from "../../components/common/PlaceCard"
import { DataContext } from "../../context/DataProvider";

const PackageDetails = () => {
const {datas} = useContext(DataContext);

  const { itemType } = useLocalSearchParams();
const selectedData = datas.filter((item) => item.category === itemType);

  return (
    <ScrollView className = "h-full bg-[#e2e8f0]" >
      {selectedData.map((item)=>(
        <PlaceCard key = {item._id} item = {item}/>
      
      ))}
    </ScrollView>
  );
};

export default PackageDetails;

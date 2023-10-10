import { View, Text, ScrollView } from "react-native";
import React from "react";
import PackagesCard from "../../components/common/PackagesCard";

const PopularPackage = ({ data, packages }) => {
  // const [category, setCatagory] = React.useState();

  const categoryData = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = item;
    }
    return acc;
  }, {});
  const categoryItems = Object.values(categoryData);
 console.log(packages[0])
  const filteredPackages = packages.filter((pkg) =>
    categoryItems.some((item) => item.category === pkg.name)
  );


  return (
    <ScrollView className=" mb-24  mx-auto" showsVerticalScrollIndicator={false}>
      {categoryItems.map((item) => {
        const packageMsg =
          filteredPackages.find((pkg) => pkg.name === item.category)?.message || "";
           // Get the package message that matches the item.type
        return (
          <PackagesCard key={item._id} item={item} packageMsg={packageMsg} />
        );
      })}
    </ScrollView>
  );
};

export default PopularPackage;

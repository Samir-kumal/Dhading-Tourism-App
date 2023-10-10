import { View, Text, FlatList } from "react-native";
import React from "react";
import { PlaceCard } from "../../components/common";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
const PlacesList = React.forwardRef((props, ref) => {
  const { foundPlaces } = props;
  const itemsToRender = foundPlaces.slice(0, 20);

  return (
    <>
      {foundPlaces?.length ? (
        <BottomSheetFlatList
          initialNumToRender={5}
          data={itemsToRender}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <PlaceCard item={item} />;
          }}
        />
      ) : (
        <View className="h-40 flex items-center justify-center ">
          <Text className="font-bold text-2xl"> No places found </Text>
        </View>
      )}
    </>
  );
});

export default PlacesList;

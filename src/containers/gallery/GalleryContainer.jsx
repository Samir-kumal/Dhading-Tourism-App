import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import React from "react";
import GalleryCarousel from "./GalleryCarousel";
import ExpoFastImage from "expo-fast-image";
import { capitalizeWords } from "../../helpers/WordSlice";
const GalleryContainer = ({ data }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [category, setCatagory] = React.useState("");
  const Style = {
    container: "w-[43%] h-60  relative rounded-lg mx-2 ",
    modal:
      "h-fit w-full flex absolute bottom-0 border-[2px]  border-b-0 py-2   justify-end items-center bg-white rounded-t-2xl ",
  };
  const categoryData = data.reduce((acc, item) => {
    if (!acc[item.category.toLowerCase()]) {
      acc[item.category.toLowerCase()] = item;
    }
    return acc;
  }, {});

  const categoryItems = Object.values(categoryData).slice(0, 8);

  console.log(categoryItems[0].images)

  const handlePress = (item) => {
    setModalVisible(true);
    setCatagory(item.category);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="flex flex-col  justify-between gap-y-1">
      
      <View className="h-fit w-full flex items-center justify-center flex-wrap flex-row gap-y-4 ">
        { categoryItems?.length > 0 && categoryItems.map((item) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
            key={item._id}
            className={`${Style.container}`}
          >
            <View className=" bg-[#ffffffa4] w-fit h-fit absolute z-30 rounded p-1 m-1">
              <Text>{capitalizeWords(item.category)}</Text>
            </View>
            <Image
              className="w-full h-full rounded-lg "
              source={{
                //  uri:`http://103.140.1.252/v1/places/image/${item.images[0]}`
                 uri:`http://prayatan.jwalamukhimun.gov.np/v1/places/image/${item.images[0]}`

              }}
            />
      
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          className="backdrop-blur-lg flex-grow-1 h-full w-full "
          onPress={handleCloseModal}
        ></Pressable>
        <View className={`${Style.modal} `}>
          <GalleryCarousel selectedType={category} data={data} />
        </View>
      </Modal>
    </View>
  );
};

export default GalleryContainer;

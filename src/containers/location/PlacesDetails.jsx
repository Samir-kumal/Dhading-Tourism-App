import {
  View,
  Text,
  Animated,
  ScrollView,
  Pressable,
  Dimensions,
  ActivityIndicator,
  colorScheme,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useRef, useMemo, useState, useEffect } from "react";
import StarRating from "../../components/common/StarRating";
import { useLocalSearchParams } from "expo-router";
import InnerMaps from "../../components/Map/InnerMap";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet/";
import { StatusBar } from "expo-status-bar";
import ItemBtns from "../../components/common/ItemBtns";
import { useRouter } from "expo-router";
import * as Svg from "react-native-svg";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { icons } from "../../constants";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import PlaceDetailComponent from "../../components/places/placesDetail/PlaceDetailComponent";

import Colors from "../../constants/themes";
const IMAGE_SCALE_MAX = 100;
const LABEL_HEADER_MARGIN = 100;

const PlacesDetails = () => {
  const {
    title,
    totalRating,
    description,
    coordinates,
    location,
    wardno,
    images,
  } = useLocalSearchParams();
  const delimiter = ",";

  const coordinatesArray = coordinates.split(delimiter);
  const [isLoading, setIsLoading] = useState(true);
  const height = Dimensions.get("window").height * 0.8;
  const [rating, setRating] = useState(0); // Initial rating is 0, you can set your default rating here
  const [showBtn, setShowBtn] = useState(false);
  const parseUrl = JSON.parse(images);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState({
    url: parseUrl[0],
  });
  const [imageArray, setImageArray] = useState(parseUrl);

  const handleClick = () => {
    console.log("clicked");
    setModalVisible(true);
  };

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["65%"], []);

  const [show, setShow] = React.useState(false);
  const pan = React.useRef(new Animated.ValueXY()).current;

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const router = useRouter();

  return (
    <>
      {isLoading ? (
        <View
          className="h-[100%]  flex flex-row items-center justify-center w-full  "
          style={{ height: height }}
        >
          <StatusBar
            style={colorScheme === "dark" ? "light-content" : "dark-content"}
          />
          <ActivityIndicator size={"large"} color={Colors.primary} />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={Colors.theme}
            className=" relative"
            scrollEventThrottle={5}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: pan.y } } }],
              {
                useNativeDriver: false,
              }
            )}
            showsVerticalScrollIndicator={false}
          >
            <StatusBar
              style={colorScheme === "dark" ? "light-content" : "dark-content"}
            />

            <Pressable
              onPress={() => router.back()}
              className="h-10 w-fit px-3 bg-white shadow-xl absolute flex-row rounded-full translate-x-2 translate-y-8 z-20  flex items-center justify-center"
            >
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="black"
              />
              <Text className="text-md font-bold">Back</Text>
            </Pressable>

            <Animated.Image
              resizeMode="cover"
              className=" h-[40vh]  "
              source={{
                // uri: `http://103.140.1.252/v1/places/image/${image.url}`,
                uri: `http://prayatan.jwalamukhimun.gov.np/v1/places/image/${image.url}`,
              }}
              style={{
                transform: [
                  {
                    translateY: pan.y.interpolate({
                      inputRange: [-1000, 0],
                      outputRange: [-100, 0],
                      extrapolate: "clamp",
                    }),
                  },
                  {
                    scale: pan.y.interpolate({
                      inputRange: [-3000, 0],
                      outputRange: [IMAGE_SCALE_MAX, 1],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            />

            <Animated.View
              style={{
                transform: [
                  {
                    translateY: pan.y.interpolate({
                      inputRange: [-1000, 0],
                      outputRange: [IMAGE_SCALE_MAX * LABEL_HEADER_MARGIN, -10],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            >
              <Pressable
                onPress={handleClick}
                className="w-10 h-10 rounded-full z-20 bg-[#000] opacity-80 absolute -top-10 right-2 flex items-center justify-center"
              >
                <AntDesign name="arrowsalt" size={24} color="white" />
              </Pressable>
              {/* Carousel Thumbnails */}
              <View className="m-2 mt-4">
                <FlatList
                  data={imageArray}
                  scrollEnabled={true}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setImage({
                          // uri: `http://prayatan.jwalamukhimun.gov.np/v1/places/image/${item}`
                          url: item,
                        });
                        console.log(image.url);
                      }}
                      className={
                        // item.urls.regular === image.url
                        //   ? "w-20 h-14 bg-slate-300 border-4 border-white shadow-xl rounded-xl mx-2"
                        //   :
                        "w-14 h-12 bg-slate-300 rounded-xl mx-2"
                      }
                    >
                      <Image
                        className="rounded-lg"
                        style={{ width: "100%", height: "100%" }}
                        source={{
                          uri: `http://prayatan.jwalamukhimun.gov.np/v1/places/image/${item}`,
                          // uri: `http://103.140.1.252/v1/places/image/${item}`,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
              {/* Bottom Section */}
              <View className="flex flex-row items-center justify-between mx-4 mt-6">
                <View className="w-60">
                  <Text style={styles.header}>Name: {title} </Text>

                  <Text style={styles.location}>Location: {location} </Text>
                  <View className="flex flex-row">
                    <MaterialIcons
                      name="location-pin"
                      size={28}
                      color={Colors.DarkGreen}
                    />
                    <Text style={styles.subheader}>Ward: {wardno}</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center justify-center gap-1">
                  <FontAwesome name="star" size={24} color="#FF5733" />
                  <View>
                    <Text>Rating</Text>
                    <Text className="text-xs ">{totalRating}</Text>
                  </View>
                </View>
              </View>

              {/* Map and Rating and audio */}
              <View className="mx-4">
                <PlaceDetailComponent description = {description} coordinates = {coordinatesArray} />
              </View>
              {/* Description */}
              <View className="mx-4 mt-8 h-fit flex items-end justify-end bg-slate-100 relative">
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                  }}
                  className="text-justify "
                >
                  {description}
                </Text>
                <TouchableOpacity
                  className=" p-1 bg-primary w-36 m-2 rounded-md"
                  onPress={() => setShow(true)}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      color: "white",
                    }}
                    className="text-green-600"
                  >
                    {" "}
                    Read More...
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
                hardwareBackButton={true}
                supportedOrientations={["portrait", "landscape"]}
                presentationStyle="fullScreen"
              >
                <View
                  style={StyleSheet.absoluteFillObject}
                  className="bg-[#000] relative h-full"
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="w-10 h-10 z-10 bg-white absolute top-6 right-4 flex items-center justify-center  rounded-full"
                  >
                    <Entypo name="cross" size={32} color="black" />
                  </TouchableOpacity>
                  <Image
                    source={{
                      uri: `http://prayatan.jwalamukhimun.gov.np/v1/places/image/${image.url}`,
                      // uri: `http://103.140.1.252/v1/places/image/${image.url}`,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </View>
              </Modal>
            </Animated.View>
          </ScrollView>
          {show && (
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              onClose={handleShow}
              enablePanDownToClose={true}
            >
              <BottomSheetScrollView>
                <Text className="px-3 mt-5 text-xl">{description}</Text>
              </BottomSheetScrollView>
            </BottomSheet>
          )}
        </>
      )}
    </>
  );
};

export default PlacesDetails;
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    opacity: 0.7,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "500",
    color: "grey",
  },
});

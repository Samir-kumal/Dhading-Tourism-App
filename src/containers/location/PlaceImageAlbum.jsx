  // import React, { useState } from "react";
  // import {
  //   ScrollView,
  //   View,
  //   Modal,
  //   TouchableOpacity,
  //   Text,
  // } from "react-native";
  // import ExpoFastImage from 'expo-fast-image';
  // const ImagesArray = ({ images }) => {
  //   const [modalImage, setModalImage] = useState(null);

  //   const openModal = (image) => {
  //     setModalImage(image);
  //   };

  //   const closeModal = () => {
  //     setModalImage(null);
  //   };

  //   return (
  //     <>
  //       <ScrollView horizontal={true} className="flex-1 w-full h-full">
  //         <View className="h-[30vh] w-full flex-row gap-x-4">
  //           {images.map((image, index) => (
  //             <TouchableOpacity
  //               key={image}
  //               onPress={() => openModal(image)}
  //               activeOpacity={0.7}
  //             >

  //               <ExpoFastImage
  //                 className="w-[100vw] h-[100%] rounded-md"
  //                 uri={`http://103.140.1.252/v1/places/image/${image}`}
  //                 cacheKey={image}
  //               />
  //             </TouchableOpacity>
  //           ))}
  //         </View>
  //       </ScrollView>

  //       <Modal visible={!!modalImage} onRequestClose={closeModal} transparent>
  //         <View
  //           style={{
  //             flex: 1,
  //             backgroundColor: "rgba(0, 0, 0, 0.7)",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           {modalImage && (
      
  //             <ExpoFastImage
  //             style={{ width: "95%", aspectRatio: 1, borderRadius: 8 }}
  //             uri={`http://103.140.1.252/v1/places/image/${modalImage}`}
  //             cacheKey={modalImage}
  //           />
  //           )}
  //           <TouchableOpacity onPress={closeModal} style={{ marginTop: 10 }}>
  //             <Text style={{ color: "#fff" }} className="text-lg">
  //               Close
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </Modal>
  //     </>
  //   );
  // };

  // export default ImagesArray;
  import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
  import React, { useState, useEffect, useRef } from "react";
  import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
  } from "react-native-reanimated";
  import Pagination from "../../components/carousel/Pagination";
  import ExpoFastImage from "expo-fast-image";

  const ImagesArray = ({ images, autoPlay, pagination }) => {

    const scrollViewRef = useAnimatedRef(null);
    const interval = useRef();
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const [newData, setNewData] = useState([
      { key: "spacer-left" },
      ...images,
      { key: "spacer-right" },
    ]);

    const { width } = useWindowDimensions();
    const SIZE = width * .95;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        x.value = event.contentOffset.x;
      },
    });


    useEffect(() => {
      if (isAutoPlay === true) {
        let _offSet = offSet.value;
        interval.current = setInterval(() => {
          if (_offSet >= Math.floor(SIZE * (images.length - 1))) {
            _offSet = 0;
            scrollViewRef.current.scrollTo({ x: _offSet, y: 0, animated: false });
          } else {
            _offSet = Math.floor(_offSet + SIZE);
            scrollViewRef.current.scrollTo({ x: _offSet, y: 0, animated: true });
          }
          offSet.value = _offSet;
        }, 10000);
      } else {
        clearInterval(interval.current);
      }

      return () => {
        clearInterval(interval.current);
      };
    }, [
      isAutoPlay,
      images.length,
      offSet.value,
      scrollViewRef,
      SIZE,
    ]);

    return (
      <View className="pt-1">
        <Animated.ScrollView
          ref={scrollViewRef}
          onScroll={onScroll}
          onScrollBeginDrag={() => {
            setIsAutoPlay(false);
          }}
          onMomentumScrollEnd={(e) => {
            offSet.value = e.nativeEvent.contentOffset.x;
            setIsAutoPlay(autoPlay);
          }}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={SIZE}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
        >
          {newData.map((item, index) => {
  if (item.key === "spacer-left" || item.key === "spacer-right") {
    return <View style={{ width: SPACER }} key={index} />;
  } else {
    const image = item;
    const style = useAnimatedStyle(() => {
      const scale = interpolate(
        x.value,
        [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
        [0.9, 1, 0.9]
      );
      return {
        transform: [{ scale }],
      };
    });
    return (
      <View style={{ width: SIZE }} key={index}>
        <Animated.View style={[styles.imageContainer, style]}>
          <ExpoFastImage
            uri={`http://103.140.1.252/v1/places/image/${image}`}
            cacheKey={image}
            style={styles.image}
          />
        </Animated.View>
      </View>
    );
  }
})}
        </Animated.ScrollView>
        {pagination && <Pagination data={images} x={x} size={SIZE} />}
      </View>
    );
  };

  export default ImagesArray;

  const styles = StyleSheet.create({
    imageContainer: {
      borderRadius: 6,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: 200,
    },
  });


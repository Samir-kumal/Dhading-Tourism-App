import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ExpoFastImage from "expo-fast-image";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
} from "react-native-reanimated";
import { limitWordsWithDot } from "../../helpers/WordSlice";
import Pagination from "./Pagination";

const Carousel = ({ data, autoPlay, pagination }) => {
  const scrollViewRef = useAnimatedRef(null);
  const interval = useRef();
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.87;
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
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
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
  }, [isAutoPlay, data.length, offSet.value, scrollViewRef, SIZE]);

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
          if (!item.images) {
            return <View style={{ width: SPACER }} key={index} />;
          }
          const str = item.description;
          const desc = limitWordsWithDot(str, 4);
          return (
            <View style={{ width: SIZE }} key={index}>
              <Animated.View style={[styles.imageContainer, style]}>
                <ExpoFastImage
                  style={styles.image}
                  // uri={`http://103.140.1.252/v1/places/image/${item.images[0]}`}
                     uri ={item.images[0]}
                  cacheKey={item._id}
                />
                <View className="h-fit  mb-6 w-full flex justify-center">
                  <Text className="font-bold my-2 text-2xl">{item.title}</Text>
                  <Text className="text-justify">{desc}</Text>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE} />}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

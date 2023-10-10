import { StyleSheet, View, useWindowDimensions, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
} from "react-native-reanimated";
import Pagination from "./Pagination";
import ExpoFastImage from "expo-fast-image";
import { imageData as data } from "../../api/data";
const Carousel = ({ autoPlay, pagination }) => {
  const scrollViewRef = useAnimatedRef(null);
  const interval = useRef();
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData, setNewData] = useState([
    { key: "spacer-left" },
    ...data,
    { key: "spacer-right" },
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.97;
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
          if (!item.url) {
            return <View style={{ width: SPACER }} key={index} />;
          }

          return (
            <View style={{ width: SIZE }} key={index}>
              <Animated.View style={[styles.imageContainer, style]}>
               
                <Image
                  style={styles.image}
                  source = {{uri: item.url}}
                
                />
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {/* {pagination && <Pagination data={data} x={x} size={SIZE} />} */}
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
    height: 300,
    borderRadius: 10,
  },
});

import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";

const SkeletonCardGallery = () => {
  const width = Dimensions.get("window").width * 0.4;
  const height = Dimensions.get("window").height * 0.75;

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const startLoopAnimation = () => {
    fadeIn();

    setTimeout(() => {
      fadeOut();

      setTimeout(() => {
        startLoopAnimation();
      }, 2000); // Delay before starting the loop again
    }, 2000); // Duration of fade in animation
  };

  React.useEffect(() => {
    startLoopAnimation();

    return () => {
      fadeAnim.stopAnimation();
    };
  }, []);
  const styles = StyleSheet.create({
    mainComponent: {
      display: "flex",
      height: height,
    },
    imageContainer: {
      height: 240,
      width: width,
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 8,
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexWrap: "wrap",
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 10,
      position: "relative",
    },
    fadingContainer: {
      paddingHorizontal: 20,
      width: "90%",
      height: 12,
      borderRadius: 100,
      marginVertical: 7,
      marginHorizontal: 5,
      backgroundColor: "#C7C7C7",
    },
    fadingContainerShort: {
      paddingHorizontal: 20,
      width: 100,
      height: 12,
      borderRadius: 100,
      marginVertical: 7,
      marginHorizontal: 5,
      backgroundColor: "#C7C7C7",
    },
    fadingContainerBig: {
      paddingHorizontal: 20,
      width: "100%",
      height: 200,
      borderRadius: 8,
      marginVertical: 0,

      backgroundColor: "#C7C7C7",
    },
    fadingContainerTop: {
      width: "50%",
      height: 40,
      borderRadius: 8,

      backgroundColor: "#C7C7C7",
    },
    fadingContainerSide: {
      width: "10%",
      height: 40,
      borderRadius: 8,

      backgroundColor: "#C7C7C7",
    },
  });
  return (
    <View style={styles.mainComponent} className="w-full flex gap-y-1  ">
      <View className=" w-full h-fit flex flex-wrap flex-row items-center justify-center ">
        <View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.fadingContainerBig,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>

          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>
        </View>
        <View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.fadingContainerBig,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>

          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>
        </View>
        <View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.fadingContainerBig,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>

          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>
        </View>
        <View style={styles.imageContainer}>
          <Animated.View
            style={[
              styles.fadingContainerBig,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>

          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          ></Animated.View>
        </View>
      </View>
    </View>
  );
};

export default SkeletonCardGallery;

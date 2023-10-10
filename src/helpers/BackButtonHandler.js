import { useEffect, useRef } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import { useNavigation } from "expo-router";

const handleBackPress = (lastBackPressTimeRef) => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastBackPressTimeRef.current;

  if (timeDifference < 2000) {
    // If the time difference between the two back button presses is less than 2 seconds,
    // exit the app.
    BackHandler.exitApp();
  } else {
    // Show a toast message indicating that the user needs to press back again to exit.
    ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
    // Update the lastBackPressTime to the current time.
    lastBackPressTimeRef.current = currentTime;
  }

  // Return true to prevent further handling of the back button by other components.
  return true;
};

export const useBackButtonExit = () => {
  const lastBackPressTimeRef = useRef(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      handleBackPress(lastBackPressTimeRef)
    );

    return () => {
      backHandler.remove();
    };
  }, []);
};

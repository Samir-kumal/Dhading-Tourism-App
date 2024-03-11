import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { useInternet } from "./Internet";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const AuthContext = React.createContext();

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();
  const { status } = useInternet();
  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup && status) {
      router.replace("/onboard");
    } else if (user && inAuthGroup && status) {
      router.replace("(tabs)/home");
    }
  }, [user, segments, status]);
}

export function Provider(props) {

  const router = useRouter();
  const [user, setAuth] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  //get user from localstorage if the user have already logged in
  useEffect(() => {
    setLoading(true);
    const isUserLoggedIn = async () => {
      const userString = await AsyncStorage.getItem("@user");
      const parsedUser = JSON.parse(userString);
      setAuth(parsedUser);
      setLoading(false);
    };
    isUserLoggedIn();
    setLoading(false);
  }, []);

  useProtectedRoute(user);

  const signIn = async (userObj) => {
    setLoading(true);

    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userObj));
      await SecureStore.setItemAsync("user_status", "existing");
      setAuth(userObj);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  //log out the user from session
  const signOut = async () => {
    setLoading(true);
    
    await firebaseSignOut(auth);
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@user_token");
    setAuth(null);
    setLoading(false);

    router.replace("/signin");
  };

  const memoizedValues = useMemo(
    () => ({
      signIn,
      // loading,
      signOut,
      user,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoizedValues}>
      {props.children}
    </AuthContext.Provider>
  );
}

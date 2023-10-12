import React from "react";
import { Stack } from "expo-router";
import { Provider } from "../context/Auth";
import { LikeStateProvider } from "../context/likeStateProvider";
import { InternetProvider } from "../context/Internet";
import { DataProvider } from "../context/DataProvider";
import { RootSiblingParent } from "react-native-root-siblings";
const RootLayout = () => {
  return (
    <RootSiblingParent>
      <InternetProvider>
        <Provider>
          <LikeStateProvider>
            <DataProvider>
              <Stack>
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(auth)/signin"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(auth)/signup"
                  options={{
                    headerShown: false,
                  }}
                />
                
                
                <Stack.Screen
                  name="(auth)/forgot"
                  options={{
                    headerShown: true,
                    headerTitle: "",
                  }}
                />
                <Stack.Screen
                  name="(auth)/onboard"
                  options={{
                    headerShown: false,
                  }}
                />
                

                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="(user)/profile"
                  options={{
                    headerShown: true,
                  }}
                />

                <Stack.Screen
                  name="(places)/detail"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(setting)/help"
                  options={{
                    headerTitle: "Support",
                  }}
                />
                <Stack.Screen
                  name="(setting)/about"
                  options={{
                    headerTitle: "About",
                  }}
                />
                <Stack.Screen
                  name="(places)/packages"
                  options={{
                    headerTitle: "Packages",
                  }}
                />
                <Stack.Screen
                  name="(places)/package_detail"
                  options={{
                    headerTitle: "Package_detail",
                  }}
                />
                <Stack.Screen
                  name="(places)/all_other_places_list"
                  options={{
                    headerTitle: "Places",
                  }}
                />
                <Stack.Screen
                  name="(places)/all_popular_places_list"
                  options={{
                    headerTitle: "Places",
                    headerShadowVisible: false,
                  }}
                />
                <Stack.Screen
                  name="(transport)/transport"
                  options={{
                    headerTitle: "Routes",
                  }}
                />
                   <Stack.Screen
                  name="(places)/nearby_places"
                  options={{
                    headerTitle: "Nearby Places",
                  }}
                />
                   <Stack.Screen
                  name="(places)/homeplacesdetails"
                  options={{
                    headerTitle: "All Places",
                  }}
                />
                   <Stack.Screen
                  name="(places)/sights"
                  options={{
                    headerTitle: "",
                    headerShown:false
                  }}
                />
      
                      <Stack.Screen
                  name="(places)/thingstododetail"
                  options={{
                    headerTitle: "",
                    headerShown:false
                  }}
                />
              </Stack>
            </DataProvider>
          </LikeStateProvider>
        </Provider>
      </InternetProvider>
    </RootSiblingParent>
  );
};

export default RootLayout;

module.exports = {
  name: "Visit Jwalamukhi",
  slug: "visit-jwalamukhi",
  version: "4.0.0",
  orientation: "portrait",
  scheme: "wine-dwine",
  icon: "./assets/Logos/AppLogo/applogo.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/Logos/AppLogo/logo.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    entitlements: {
      "com.apple.developer.networking.wifi-info": true,
    },
    bundleIdentifier: "com.bms.jwalamukhimun",
    buildNumber: "1.0.0",
    config: {
      googleMapsApiKey: "AIzaSyAa0BjHuGpQ0YtaJuVJC23RcbTvw99jh80",
    },
  },
  android: {
    permissions: [
      "INTERNET",
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.FOREGROUND_SERVICE",
    ],
    adaptiveIcon: {
      foregroundImage: "./assets/Logos/AppLogo/logo.png",
      backgroundColor: "#ffffff",
    },
    package: "com.bms.jwalamukhimuni",
    versionCode: 4,
    config: {
      googleMaps: {
        apiKey: "AIzaSyAa0BjHuGpQ0YtaJuVJC23RcbTvw99jh80",
      },
    },
  },
  web: {
    favicon: "./assets/Logos/AppLogo/logo.png",
    bundler: "metro",
  },
  plugins: [
    "expo-localization",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow Dhadhing-app to use your location.",
      },
    ],
    ["@react-native-google-signin/google-signin"],
  ],
  extra: {
    WEATHER_API_KEY: "f873e2396c79be34489bd8d70b7e5f32",
    "eas": {
      "projectId": "cf0cf1a8-7504-46eb-b2cc-089a635edde4"
    }
  },
  owner: "sawmeerrr",
  sdkVersion: "48.0.0",
  platforms: ["ios", "android", "web"],
};

// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import * as resources from "./resources";
// import AsyncStoragePlugin from 'i18next-react-native-async-storage'

// i18n.use(initReactI18next).init({
//   compatibilityJSON: "v3",
//   resources: {
//     ...Object.entries(resources).reduce(
//       (acc, [key, value]) => ({
//         ...acc,
//         [key]: {
//           translation: value,
//         },
//       }),
//       {}
//     ),
//   },
//   lng: "eng",
// });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as resources from "./resources";
import AsyncStoragePlugin from 'i18next-react-native-async-storage'

const detectUserLanguage = (callback) => {
  return Expo
    .DangerZone
    .Localization
    .getCurrentLocaleAsync()
    .then(lng => { callback(lng.replace('_', '-')); })
}

i18n.use(initReactI18next)
  .use(AsyncStoragePlugin(detectUserLanguage))
  .init({
  compatibilityJSON: "v3",
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {}
    ),
  },
  lng: "eng",
});

export default i18n;
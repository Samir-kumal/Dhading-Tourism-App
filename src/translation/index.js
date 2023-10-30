import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as resources from "./resources";
import languageDetectorPlugin from "../plugins/languageDetectorPlugin";


i18n.use(initReactI18next)

  .use(languageDetectorPlugin)
  .init({
  compatibilityJSON: "v3",
  fallbackLng:"eng",
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

  react: {
    useSuspense: false, //in case you have any suspense related errors
  },
  
});

export default i18n;
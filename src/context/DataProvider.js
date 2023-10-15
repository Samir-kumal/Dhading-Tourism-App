import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Constants from "expo-constants";
import i18n from "../translation";
import { set } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const DataContext = createContext();
export function useDataProvider() {
  return React.useContext(DataContext);
}

// Function to get the user's preferred language from AsyncStorage

export const DataProvider = (props) => {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(200);
  const [totalPages, setTotalPages] = useState(1);
  const [lang, setLang] = useState("eng");
  const url = "http://prayatan.jwalamukhimun.gov.np/v1/places/en";
  const url2 = `http://103.140.1.252/v1/places/en?page=${page}&limit=${limit}`;
  const token = "3fba649578447eb76c59";
  const [videoData, setVideoData] = useState([]);

  const fetchNextPage = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      if (nextPage > totalPages) {
        // Reset to page 1 if nextPage exceeds totalPages
        return 1;
      }
      return nextPage;
    });

    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      if (i18n.language === "eng") {
        const response = await axios.get(url, {
          headers: {
            "api-key": "3fba649578447eb76c59",
          },
        });
        // const response = await axios.get( url2

        // );
        const data = response.data.places;
        const Pages = response.data.totalCount;
        setDatas(data);

        setTotalPages(Pages);
      } else {
        const response = await axios.get(url, {
          headers: {
            "api-key": "3fba649578447eb76c59",
          },
        });
        const data = response.data.places.places;
        const Pages = response.data.places.totalCount;

        setDatas(data);
        setTotalPages(Pages);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const FetchVideoData = async () => {
    try {
      const response = await axios.get(
        "http://prayatan.jwalamukhimun.gov.np/v1/video-link"
      );
      setVideoData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    FetchVideoData();
  }, []);
  useEffect(() => {
    fetchData();
    // localizationGet();
  }, [lang]);

  // get the localization value from AsyncStorage
  // const localizationGet = async () => {
  //   try {

  //     const value = await AsyncStorage.getItem("@user_localization");
  //     if (value !== null) {
  //       i18n.changeLanguage(value);
  //       setLang(value);
  //     }
  //   } catch (error) {
  //     console.log("Error retrieving data" + error);
  //   }
  // };

  // const LocalizationSave = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("@user_localization", value);
  //   } catch (error) {
  //     console.log("Error saving data" + error);
  //   }
  // }

  // const handleChange = () => {
  //   if(i18n.language === "nep"){
  //     i18n.changeLanguage("eng");
  //     setLang("eng");
  //     LocalizationSave("eng");

  //   } else {
  //     i18n.changeLanguage("nep")
  //     setLang("nep");
  //     LocalizationSave("nep");
  //   }
  // }

  const contextValue = useMemo(
    () => ({
      datas,
      error,
      loading,
      // handleChange,
      fetchNextPage,
      videoData,
    }),
    [datas, error, loading, videoData]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

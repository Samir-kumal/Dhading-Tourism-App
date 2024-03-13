import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Constants from "expo-constants";
import i18n from "../translation";
import { set } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./Auth";
export const DataContext = createContext();
export function useDataProvider() {
  return React.useContext(DataContext);
}
export const url = "https://dev.castelltech.com/api/v1/";
// const url2 = `http://103.140.1.252/v1/places/en?page=${page}&limit=${limit}`;
// const url2 = "http://prayatan.jwalamukhimun.gov.np/v1/places/ne";
const url2 = "https://dev.castelltech.com/api/v1/";
// Function to get the user's preferred language from AsyncStorage

export const DataProvider = (props) => {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();

  const [page, setPage] = useState(1);
  const [limit] = useState(200);
  const [totalPages, setTotalPages] = useState(1);
  const [lang, setLang] = useState("eng");
  // const url = "http://prayatan.jwalamukhimun.gov.np/v1/places/en";

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

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (
        i18n.language === "eng" ||
        i18n.language === "en-GB" ||
        i18n.language === "en-US" ||
        i18n.language === "en-IN" ||
        i18n.language === "en-CA" ||
        i18n.language === "en-AU" ||
        i18n.language === "en-NZ" ||
        i18n.language === "en-SG" ||
        i18n.language === "en-MY" ||
        i18n.language === "en"
      ) {
        const response = await axios.get(`${url}/places`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "5bdb68c9efa67cf69f3425f908",
          },
        });

        if (response) {
          const data = response.data.data;
          const Pages = 1;
          console.log(data);
          setDatas(data);
          setTotalPages(Pages);
        }
      } else if (i18n.language === "nep") {
        const response = await axios.get(`${url}/places`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "5bdb68c9efa67cf69f3425f908",
          },
        });
        if (response) {
          console.log(response.data);
          const data = response.data.places;
          const Pages = response.data.totalCount;

          setDatas(data);
          setTotalPages(Pages);
        }
      } else {
        const response = await axios.get(`${url}/places`, {
          headers: {
            "api-key": "3fba649578447eb76c59",
          },
        });
        if (response) {
          const data = response.data.places;
          const Pages = response.data.totalCount;
          setDatas(data);
          setTotalPages(Pages);
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  },[user]);

  const FetchVideoData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/videos`);
      setVideoData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  },[]);
  useEffect(() => {
   if(user !==null){
    fetchData();
    FetchVideoData();
   }
  }, [user]);

  const handleLanguageChange = () => {
    fetchData();
  };

  const contextValue = useMemo(
    () => ({
      datas,
      error,
      loading,
      handleLanguageChange,
      fetchNextPage,
      videoData,
      fetchData,
    FetchVideoData
    }),
    [datas, error, loading, videoData, handleLanguageChange]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

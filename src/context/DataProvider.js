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
  // const url2 = `http://103.140.1.252/v1/places/en?page=${page}&limit=${limit}`;
  const url2 = "http://prayatan.jwalamukhimun.gov.np/v1/places/ne";

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

        if (response) {
          const data = response.data.places;
          const Pages = response.data.totalCount;
          setDatas(data);
          setTotalPages(Pages);
        }
      } else if (i18n.language === "nep") {
        const response = await axios.get(url2, {
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
      } else {
        const response = await axios.get(url, {
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
    fetchData();
    FetchVideoData();
  }, []);

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
    }),
    [datas, error, loading, videoData, handleLanguageChange]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Constants from "expo-constants";
import i18n from "../translation";
export const DataContext = createContext();
export function useDataProvider() {
  return React.useContext(DataContext);
}

// Function to get the user's preferred language from AsyncStorage

export const DataProvider = (props) => {
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(200);
  const [totalPages, setTotalPages] = useState(1);
  const [lang, setLang] = useState(null);
  const { WEATHER_API_KEY } = Constants.manifest.extra;
  const url = "http://prayatan.jwalamukhimun.gov.np/v1/places/en";
  const url2 =  `http://103.140.1.252/v1/places/en?page=${page}&limit=${limit}`;
  const token = "3fba649578447eb76c59";

  useEffect(() => {
    const fetchWeatherData = async () => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${27.59375132910493}&lon=${85.52398340333188}&APPID=${WEATHER_API_KEY}&units=metric`
      )
        .then((res) => res.json()) // Convert response to JSON format
        .then((json) => {
          // Update the component state with the fetched weather data
          setTemperature(json.main.temp);
          const { icon } = json.weather[0];
          setIcon(icon);
        });
    };
    fetchWeatherData();
  }, []);
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
        // const response = await axios.get( url, {
        //   headers: {
        //     'Authorization': 'Bearer ' + token,
        //   }
        // });
        const response = await axios.get( url2
          
         
        );
        const data = response.data.places;
        const Pages = response.data.totalCount;
        setDatas(data);
        console.log("Data",data);

        setTotalPages(Pages);
      } else {
        const response = await axios.get(
          "http://prayatan.jwalamukhimun.gov.np/v1/places/en"
        );
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

  useEffect(() => {
    fetchData();
    setLang(i18n.language);
  }, [lang]);

  const contextValue = useMemo(
    () => ({
      datas,
      error,
      loading,
      temperature,
      icon,
      fetchNextPage,
    }),
    [datas, error, loading, temperature, icon]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

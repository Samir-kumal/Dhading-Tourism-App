import React, { createContext, useEffect, useMemo, useState } from "react";
import * as Network from "expo-network";
import NetInfo from '@react-native-community/netinfo';
export const InternetContext = createContext();

export function useInternet() {
  return React.useContext(InternetContext);
}

const InternetProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setStatus(state.isConnected);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component is unmounted
    };
  }, []);
  

  const value = useMemo(() => ({ status }), [status]);

  return (
    <InternetContext.Provider value={value}>
      {children}
    </InternetContext.Provider>
  );
};

export { InternetProvider };

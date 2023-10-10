import OnBoard from "../../src/screens/auth/OnBoard";
import Loading from "../../src/components/status/Loading";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const onboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    async function getUserInfo() {
      try {
        const data = await SecureStore.getItemAsync("user_status");
        console.log(data);
        if (data === "existing") {
          setTimeout(() => {
            setIsLoading(false);
            setUser(true);

            router.replace("/signin");
          }, 2000);
        } else if (data == null) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!user && !isLoading && <OnBoard />}
    </>
  );
};

export default onboard;

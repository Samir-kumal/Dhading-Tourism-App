import { Text, Pressable } from "react-native";
import React, { useEffect } from "react";

import Localization from "./Localization";
import i18n from "../translation";
import Colors from "../constants/themes";

const index = () => {
  const [langModal, setLangModal] = React.useState(false);
  const [langTitle, setTitle] = React.useState(i18n.language);

  useEffect(() => {
    console.log(langTitle, "sweet");
  }, [langTitle]);

  return (
    <>
      <Pressable
        style={{ backgroundColor: Colors.primary }}
        onPress={() => setLangModal(!langModal)}
        className="px-4 py-1  flex-row items-center rounded-2xl border-2 border-primary justify-center"
      >
        <Text className="text-xl">{i18n.language === "nep" ? "🇳🇵" : "🇬🇧"}</Text>
        <Text className="pl-2 ">{langTitle}</Text>
      </Pressable>
      <Localization
        langModal={langModal}
        setLangModal={setLangModal}
        setTitle={setTitle}
      />
    </>
  );
};

export default index;

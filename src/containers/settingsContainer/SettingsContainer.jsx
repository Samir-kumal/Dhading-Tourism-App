import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import LocalizationBtn from "../../Localization/";
import i18n from "../../translation";
const eng = ["My Details", "Language Preferences", "About Our App", "Log Out"];
const nep = [
  "मेरो विवरण",
  "भाषा चयन गर्नुहोस्",
  "हाम्रो एपको बारेमा",
  "बाहिर निस्कनु",
];

const SettingContainer = ({ name, email, phone, signOut }) => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (i18n.language === "eng") {
      setData(eng);
    } else if (i18n.language === "nep") {
      setData(nep);
    } else {
      setData(eng);
    }
  }, [i18n.language]);

  const handleClick = (item) => {
    if (item === "Log Out" || item === "बाहिर निस्कनु") {
      signOut();
    } else if (item === "My Details" || item === "मेरो विवरण") {
      router.push({
        pathname: "/details",
        params: { name, email, phone },
      });
    } else if (item === "About Our App" || item === "हाम्रो एपको बारेमा") {
      router.push({
        pathname: "/about",
      });
    }
  };
  return (
    <View>
      <View>
        <View className="mt-1">
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleClick(item)}
                className="p-5 font-bold border-[2px]  bg-white border-primary my-2 mx-4 flex flex-row justify-between rounded-lg "
              >
                <Text className="text-lg opacity-50 font-semibold">{item}</Text>
                <View>
                  {index === 1 ? (
                    <LocalizationBtn />
                  ) : (
                    <FontAwesome5 name="angle-right" size={24} color="black" />
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingContainer;

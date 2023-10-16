import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Feather } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
import { Menu } from "../../screens/nav";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import i18n from "../../translation";
const Data = {
  eng: [
    {
      id: 1,
      name: "Treking",
      image:
        "https://img.playbook.com/fyljgKtvIgdFRVC1U1QTWbxPQWOW3PxfaiXWl9itBsY/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljL2FhMGU5N41j/LTVjZDItNDk4Ni04/MTZmLTFiZTI2YTY3/YzQ5NQ",
      price: "From $200",
      desc: "Nepal is renowned for its trekking trails, to challenging high-altitude treks in the Himalayas",
      desc2: "Nepal is renowned for its trekking trails, which range from short and easy hikes to challenging high-altitude treks in the Himalayas. The country is home to eight of the world's 14 highest mountains, including Mount Everest, the world's tallest peak."
    },
    {
      id: 2,
      name: "Rafting",
      image:
        "https://img.playbook.com/veXtlxjHklm3Qy_sTp9Nj7WzxFIIP5ORo6NF5dcdHzc/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljLzY0ZGZh44cm/LTBhMWQtNDMxMC04/YjNkLTJmZDZiZGY2/NTJkNA",
      price: "From $200",
      desc: "Rafting in Nepal is an exhilarating experience, pristine rivers and challenging rapids.",
      desc2: "Rafting in Nepal is an exhilarating experience that allows you to navigate the country's pristine rivers and challenging rapids. The country boasts some of the world's best white-water rafting opportunities, thanks to its steep terrain and snow-fed rivers."
    },
    {
      id: 3,
      name: "Bungy Jumping",
      image:
        "https://img.playbook.com/e8Aomst9hTFFdFMJYNhqGfy33XcgBQh4Au7yxQMJ50A/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljLzdmZDJjNmVh/LTBmNjMtmzYwLWzh/Mzc2LTVkODBkZjk1/ZWI0ZQ",
      price: "From $200",
      desc: "Bungee jumping in Nepal is an extreme adventure activity that lets you leap off a high suspension bridge.",
      desc2: "Bungee jumping in Nepal is an extreme adventure activity that lets you leap off a high suspension bridge. The country is home to the world's second-highest bungee jump, which is located 160 meters above the Bhote Koshi River."
    },
    {
      id: 4,
      name: "Hiking",
      image:
        "https://img.playbook.com/DxFpgf8ghFOuvfi_CbKUbbPWtqgPJzVqbkiUJLG2Fzo/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljL2I2ZDIw42b5/LWE1NmEtNDA2NS1i/YzAwLWY0MGz6Ny/A0FmZA",
      price: "From $200",
      desc: "Hiking in Nepal is a great way to explore the country's natural beauty and culture.",
      desc2: "Hiking in Nepal is a great way to explore the country's natural beauty and culture. The country is home to some of the world's most beautiful hiking trails, which take you through lush forests, quaint villages, and snow-capped mountains."
    },
    {
      id: 5,
      name: "Animal Ride",
      image:
        "https://img.playbook.com/1Ly2rN9IAkWVH_0rcWGCYLouvUty1cT6iHzzq1yv11o/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljLzgxNWU5YmTj/LWNlOTYtNDhlNy05/YmQxLWRhNmRmOWQ4/OGQ2ZA",
      price: "From $200",
      desc: "Nepal is not just about mountains; it also offers incredible wildlife experiences.",
      desc2: "Nepal is not just about mountains; it also offers incredible wildlife experiences. National parks and reserves provide opportunities for safaris, where you can spot diverse wildlife species. Wildlife safaris in Nepal allow you to explore dense jungles, grasslands, and riverbanks. You can enjoy activities like jungle walks, jeep safaris, and canoeing while observing the fascinating fauna and flora."
    },
  ],
  nep: [
    {
      id: 1,
      name: "ट्रेकिंग",
      image:
        "https://img.playbook.com/fyljgKtvIgdFRVC1U1QTWbxPQWOW3PxfaiXWl9itBsY/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljL2FhMGU5N41j/LTVjZDItNDk4Ni04/MTZmLTFiZTI2YTY3/YzQ5NQ",
      price: "From $200",
      desc: "नेपाल पर्वाहनका लागि प्रसिद्ध छ, हिमालयमा चुनौतीपूर्ण उच्च गर्ति ट्रेकिंगहरूमा समावेश छ",
      desc2: "नेपाल पर्वाहनका लागि प्रसिद्ध छ, जसले हिमालयको चुनौतीपूर्ण उच्च गर्ति ट्रेकिंगहरूमा समावेश गरेको छ। यस देशमा १४ दुइ उच्च पर्वतमण्डलका ८ वटा छन्, जसमा विश्वको सबैभन्दा उच्च पर्वत, विश्वको सबैभन्दा उच्च शिखरमा समावेश छ, जसमा माउन्ट एभेरेस्ट पर्वत, विश्वको सबैभन्दा उच्च शिखर छ।"
    },
    {
      id: 2,
      name: "राफ्टिंग",
      image:
        "https://img.playbook.com/veXtlxjHklm3Qy_sTp9Nj7WzxFIIP5ORo6NF5dcdHzc/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljLzY0ZGZh44cm/LTBhMWQtNDMxMC04/YjNkLTJmZDZiZGY2/NTJkNA",
      price: "From $200",
      desc: "नेपालमा राफ्टिंग एक रोमाञ्चक अनुभव हो, शुद्ध नदीहरू र चुनौतीपूर्ण र्यापिडमा",
      desc2: "नेपाल प्राकृतिक सौन्दर्य र संस्कृतिलाई अन्वेषण गर्नका लागि राफ्टिंग सबैभन्दा राम्रो तरिका हो।"
    },
    {
      id: 3,
      name: "बञ्जी जम्पिंग",
      image:
        "https://img.playbook.com/e8Aomst9hTFFdFMJYNhqGfy33XcgBQh4Au7yxQMJ50A/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljLzdmZDJjNmVh/LTBmNjMtmzYwLWzh/Mzc2LTVkODBkZjk1/ZWI0ZQ",
      price: "From $200",
      desc: "नेपालमा बञ्जी जम्पिंग एक प्रतिकृया अभिगमन हो जसले तपाईंलाई उच्च प्रतिस्थापन पुलबाट छलफल गर्दछ।",
      desc2: "नेपालमा बञ्जी जम्पिंग एक प्रतिकृया अभिगमन हो जसले तपाईंलाई उच्च प्रतिस्थापन पुलबाट छलफल गर्दछ।"
    },
    {
      id: 4,
      name: "हाइकिङ",
      image:
        "https://img.playbook.com/DxFpgf8ghFOuvfi_CbKUbbPWtqgPJzVqbkiUJLG2Fzo/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljL2I2ZDIw42b5/LWE1NmEtNDA2NS1i/YzAwLWY0MGz6Ny/A0FmZA",
      price: "From $200",
      desc: "नेपालमा हाइकिङ देशको प्राकृतिक सौन्दर्य र संस्कृतिलाई अन्वेषण गर्नका लागि एक ठूलो तरिका हो।",
      desc2: "नेपालमा हाइकिङ देशको प्राकृतिक सौन्दर्य र संस्कृतिलाई अन्वेषण गर्नका लागि एक ठूलो तरिका हो।"
    },
    {
      id: 5,
      name: "पशु सवारी",
      image:
        "https://img.playbook.com/1Ly2rN9IAkWVH_0rcWGCYLouvUty1cT6iHzzq1yv11o/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bgljLzgxNWU5YmTj/LWNlOTYtNDhlNy05/YmQxLWRhNmRmOWQ4/OGQ2ZA",
      price: "From $200",
      desc: "नेपाल भन्दा केहि महासागर; यसले अविश्वासनीय वन्यजन्तु अनुभव पनि प्रदान गर्दछ।",
      desc2: "नेपाल भन्दा केहि महासागर; यसले अविश्वासनीय वन्यजन्तु अनुभव पनि प्रदान गर्दछ।"
    },
  ],
};

  
  const ThingsToDoContainer = () => {
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const {t} = useTranslation();


    useEffect(()=>{
      if (i18n.language === "eng") {
        setData(Data.eng)
      }else {
        setData(Data.nep);
      }
    },[i18n.language])

    console.log(data)

    const [inputData, setInputData] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(Data.eng);

    useEffect(()=>{
      if(i18n.language !== "eng"){
        setFilteredData(Data.nep)
      }else {
        setFilteredData(Data.eng);
      }
    })
  
  
    const handleFilter = (text) => {
      const filteredItems = filteredData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
    };
    return (
    <>
      <ScrollView className="mb-16">
      <StatusBar backgroundColor="transparent"/>

        <SafeAreaView className="relative h-52 w-[100vw]">
          <ImageBackground
            source={require("../../../assets/Events/events.png")}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View className="translate-y-16 ">
              <Text className="text-3xl text-white   font-semibold text-center">
                {t("thingstodo.title")}
              </Text>
            </View>
          </ImageBackground>
        </SafeAreaView>
        <View>
          <View className="relative">
            <View className="absolute z-10 top-10 right-8">
              <Feather name="search" size={24} color="#999" />
            </View>
            <TextInput
            value={inputData}
            onChangeText={(text) =>{
              setInputData(text)
              handleFilter(text);
            } }
              placeholder={t("homepage.firstpage.text_input")}
              className="bg-white py-4 rounded-lg mx-4 mt-6 px-4"
            />
          </View>
          <View className="flex flex-row flex-wrap justify-center">
            {filteredData.map((item) => {
              return (
                <View
                // onPress={()=>handleClick(item)}
                  key={item.id}
                  className="bg-white  w-[90vw] flex flex-row items-center rounded-xl mx-2 h-44 my-4 shadow-lg"
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "40%",
                      height: "95%",
                      borderRadius: 10,
                      marginLeft: 4,
                     
                    }}
                  />
                    <View className="w-60  h-full  bg-opacity-50 p-4">
                      <Text className="text-black text-xl font-semibold">
                        {item.name}
                      </Text>
                      {/* <Text className="text-black opacity-60 text-sm ">
                        {item.price}
                      </Text> */}
                      <Text className="text-black opacity-40 w-44 mt-4 text-left text-xs ">
                        {item.desc}
                      </Text>
                    </View>
                  
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
    );
  };
  
  export default ThingsToDoContainer;
  
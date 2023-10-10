import { View, Text, Image } from 'react-native'
import React, { useEffect,useState } from 'react'

const Logo = ({source,size}) => {
  const [item, setItem] = useState({});

  const items = [
    {
        id: 'welcome',
        image: require('../../../assets/Logos/welcomeLogo.png'),
    },
    {
        id: 'signin',
        image: require('../../../assets/Logos/signInLogo.png'),
    },

   
];


useEffect(()=>{
  setItem(items.find((item)=> item.id === source ));

}, [source])

console.log(item);


  return (
    <View className >
      <Image  style= {{height:size, objectFit:"contain"}} source={item.image}/>
    </View>
  )
}

export default Logo
import { View, Text } from 'react-native'
import React,{ useState,useEffect } from 'react'
import ThingsToDoContainer from '../containers/thingstodo/ThingsToDoContainer'
import { useInternet } from '../context/Internet'
import NoInternetController from '../components/common/NoInternet.controller'
import { Menu } from './nav'

const ThingsToDo = () => {
  const internet = useInternet()
  const [isConnected, setIsConnected] = useState(internet.status)

  useEffect(()=>{
      setIsConnected(internet.status);
  },[internet.status])
  return (
    <>
    {
      !isConnected ? (
        <NoInternetController/>
      ):(

        <ThingsToDoContainer/>

      )
    }
    <Menu/>
    </>
  )
}

export default ThingsToDo
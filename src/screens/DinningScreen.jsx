import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView, Pressable, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Chip, Searchbar } from 'react-native-paper'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

import { DiningRestaurantCard, PopularDining } from '../components'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'

import useStore from '../store/store'
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js'
import { en, bn, hi } from '../i18n'


const DiningScreen = () => {

  const i18n = new I18n()

  const { restaurantsList, cartItems, filters, setFilters, locale, bookingfilter } = useStore((state) => ({
    restaurantsList: state.restaurantsList,
    cartItems: state.cartItems,
    filters: state.filters,
    setFilters: state.setFilters,
    locale: state.locale,
    bookingfilter: state.bookingfilter
  }))

  i18n.fallbacks = true,
    i18n.translations = { en, bn, hi },
    i18n.locale = locale

  const navigation = useNavigation()

  const [data, setData] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const [booking,setBooking] = useState(null)
  // const [locale, setLocale] = useState("en")

  useEffect(() => {
    setData(restaurantsList)
    setBooking(bookingfilter)
  }, [])


  useEffect(() => {
    if (searchQuery.length > 0) {
      const newData = restaurantsList.filter((item) => {
        const itemData = String(item.restaurant_name).toUpperCase();
        const textData = searchQuery.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setData(newData)
    } else {
      setData(restaurantsList)
    }
  }, [searchQuery])

    useEffect(() => {
        // console.log(filters)
        if(filters.length > 0){
            filters.map((item) => {
                if(item === "Nearest"){
                    const newData = data.filter((item) => item.distance <= 10)
                    setData(newData)
                }
                if(item === "Rating 4.0+"){
                    const newData = data.filter((item) => item.rating >= 4)
                    setData(newData)
                }
                if(item === "Pure Veg"){
                    const newData = data.filter((item) => item.special_tag === "Pure veg")
                    setData(newData)
                }
                if(item == "New Arrivals"){
                    const newData = data.filter((item) => item.arrival_tag === "New Arrivals")
                    setData(newData)
                }
                if(item == "Previous Orders"){
                    const newData = data.filter((item) => previous_orders.includes(item.restaurant_name))
                    setData(newData)
                }
            })
        }else{
            setData(restaurantsList)
        }
    }, [filters])


      const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
        'Robotto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Robotto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Robotto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    });

    if(!fontsLoaded)
      return null

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar hidden />


      <View style={{ width: "90%", flexDirection: "row", gap: 4, }}>
        <Searchbar placeholder={i18n.t("homesearch")} style={{ borderRadius: 10, width: "80%", paddingVertical: 0, flex: 6 }}
          onChangeText={(text) => {
            setSearchQuery(text)
          }}
          value={searchQuery}
        />
      </View>

      <View style={{ width: "90%", marginTop: 2 }}>

        <FlatList
          horizontal={true}
          data={booking}
          renderItem={({ item }) => (
              <TouchableOpacity style={{ borderRadius: 12, flex: 1, justifyContent: "center", alignItems: "center", margin: 5, paddingVertical: 5, borderWidth: 1, paddingHorizontal: 8, fontFamily: "Poppins-SemiBold", 
              borderColor: `${filters.includes(item) ? "red" : "green"}`
             }} 
              onPress={() => {
                if (filters.includes(item)) {
                  setFilters(filters.filter((filter) => filter !== item))
                  setData(restaurantsList)
                } else {
                  setFilters([...filters, item])
                }
              }}><Text style={{ color: `${filters.includes(item) ? "red" : "green"}`, fontFamily: "Poppins-SemiBold" }}>{item}</Text>
              </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
        />
        
      </View>
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", marginTop: 10, letterSpacing: 3 }}>Popular Dinings</Text>

        <FlatList
        style={{ width: "90%", marginTop: 5, marginBottom: Number(`${cartItems.length > 0 ? 100 : 60}`) }}
        ListHeaderComponent={() => (
          <>
          <PopularDining />

          <View style={{ width: "90%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", marginTop: 10, letterSpacing: 3 }}>{data.length} {i18n.t("restaurant")}</Text>
          </View>
          </>

  )}
          data={data}
          renderItem={({ item }) => (
            <DiningRestaurantCard
              key={item.id}
              item={item}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", marginTop: 10, letterSpacing: 3 }}>{i18n.t("no restaurants found")}</Text>
              <MaterialIcons name="search-off" size={40} color="gray" />
            </View>
        )}
        />


    </SafeAreaProvider>
  )
}


export default DiningScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "100%",
    backgroundColor: "#28293d",
    paddingTop: StatusBar.currentHeight
  },
})

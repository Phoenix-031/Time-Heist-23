import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Searchbar, Button, Surface, Chip } from 'react-native-paper'
import { useFonts } from 'expo-font'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { ReviewCard } from '../components'

import { I18n } from 'i18n-js'
import { en, bn, hi } from '../i18n'

import useStore from '../store/store'

// import useStore from '../store/store'

const ReviewScreen = ({route}) => {

  const {user} = useStore((state) => ({
    user: state.user
  }))

  const navigation = useNavigation()
  
    const i18n = new I18n()

    const {locale} = useStore((state) => ({
        locale: state.locale
    }))

    i18n.fallbacks = true,
    i18n.translations = {en, bn, hi},
    i18n.locale = locale

  const {restaurantReviews} = route.params
  const review_tags = ["Verified", "With Photos", "Latest", "Detailed", "Most Helpful"]

  const [data, setData] = useState()
  useFocusEffect(
    React.useCallback(() => {
      setData(restaurantReviews)
    }, [])
  )

  useEffect(() => {
    setData(restaurantReviews)
  }, [])

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
    <SafeAreaProvider style={{backgroundColor:"#1c1c27", width:"100%", height:"100%", flexDirection:"column", justifyContent:"flex-start", alignItems:"center", paddingTop:15}}>
      
      <View style={{width:"90%",height:"100%"}}>

        <Searchbar />

        <View style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:12}}>
          <TouchableOpacity style={{color:"white", borderWidth:1, borderColor:"green", borderRadius:12, paddingVertical:6, paddingHorizontal:12 ,fontFamily:"Poppins-Medium", fontSize:15, marginVertical:10}}
          onPress={() => {
            const newData = restaurantReviews.filter((item) => item.review_type === "Delivery")
            setData(newData)
          }}
          >
            <Text style={{color:"white", fontFamily:"Poppins-Medium", fontSize:15}}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{color:"white", borderWidth:1, borderColor:"green", borderRadius:12, paddingVertical:6, paddingHorizontal:12 ,fontFamily:"Poppins-Medium", fontSize:15, marginVertical:10}}
          onPress={() => {
            const newData = restaurantReviews.filter((item) => item.review_type === "Dinning")
            setData(newData)
          }}
          >
            <Text style={{color:"white", fontFamily:"Poppins-Medium", fontSize:15}}>Dinning</Text>
          </TouchableOpacity>
        </View>

      <FlatList
      style={{width:"100%", marginVertical:10}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={review_tags}
        renderItem={({item}) => <Text style={{marginRight:8, backgroundColor:"#28293d", color:"#ffad16", fontFamily:"Poppins-Medium",height:40,paddingHorizontal:10, borderRadius:12}}>{item}</Text>}
        keyExtractor={item => item}
      />


      <FlatList
        data={data}
        renderItem={({item}) => <ReviewCard item={item} />}
        keyExtractor={item => item.id}
      />

      <Button mode='contained' style={{marginVertical:10, backgroundColor:"#ffad16", paddingVertical:6,}} uppercase textColor="white"
      contentStyle={{fontSize:25, fontFamily:"Poppins-Medium"}}
      onPress = {
        ()=> {
          if(user === null)
            navigation.navigate("Login")
          else
            navigation.navigate('WriteReview')
        }
      }
      >{i18n.t("write a review")}</Button>
      </View>

    </SafeAreaProvider>
  )
}

export default ReviewScreen

const styles = StyleSheet.create({})
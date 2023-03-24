import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';

const OrderItems = ({item}) => {
    // console.log(item)
    // console.log(item.items[0].quantity)

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
        'Robotto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'Robotto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        'Robotto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    });
    
  return (
    <View style={{flexDirection:"column", alignItems:"center",width:"100%", backgroundColor:"#28293d", paddingVertical:8, borderRadius:12, marginBottom:10}}>
        <View style={{flexDirection:"row",justifyContent:"space-around", alignItems:"center", width:"100%"}}>
            <Image source={{uri:item.items[0].image_uri, cache: 'only-if-cached'}} style={{width:80, height:80, borderRadius:12}} />
            <View style={{flexDirection:"column", alignItems:"baseline"}}>
                <Text style={{fontFamily:"Poppins-SemiBold", fontSize:18,color:"#ef845d"}}>{item.items[0].restaurant_name}</Text>
            </View>
            <View>
                <Text style={{color:"white", backgroundColor:"green",paddingVertical:6, paddingHorizontal:8, borderRadius:10, fontFamily:"Poppins-Medium"}}>{item.status}</Text>
            </View>
        </View>

        <View style={{width:"100%"}}>

            <FlatList
            //    style={{width:"100%"}}
                data={item.items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => 
                        (<View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"80%", alignSelf:"center", paddingVertical:2}}>
                            <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12,color:"#ef845d"}}>{item.itemname}</Text>
                            <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12,color:"#ef845d"}}>x{item.quantity}</Text>
                        </View>)
                }
            />
        </View>

        <View style={{flexDirection:"column", justifyContent:"space-between",alignItems:"center", width:"100%", paddingHorizontal:10, paddingVertical:6}}>
            <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center", width:"100%", paddingHorizontal:10, paddingVertical:6}}>
            <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12,color:"white"}}>
                {item.address.city},
                {item.address.country},
                {item.address.postalCode}
            </Text>
            <Text style={{fontFamily:"Poppins-SemiBold", fontSize:14,color:"white"}}>
                Rs {item.total}
            </Text>
            </View>

            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"100%", paddingHorizontal:5}}>
                <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12,color:"white"}}>{item.date}</Text>
                <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12,color:"white"}}>{item.time}</Text>
            </View>
        </View>
    </View>
  )
}

export default OrderItems

const styles = StyleSheet.create({})
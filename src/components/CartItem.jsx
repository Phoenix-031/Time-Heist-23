import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native' 
import { useFonts } from 'expo-font'
import { Badge } from 'react-native-paper'
import useStore from '../store/store'

import { MaterialIcons } from '@expo/vector-icons'

const CartItem = ({item}) => {

    const [quan,setQuan] = useState(Number(item.quantity))
    const image_uri = item.image_uri

    const {cartItems, removeFromCart, incrementItem, decrementItem,setTotalPrice, totalPrice, setQuantity} = useStore((state) => ({
        cartItems: state.cartItems,
        removeFromCart: state.removeFromCart,
        incrementItem: state.incrementItem,
        decrementItem: state.decrementItem,
        setTotalPrice: state.setTotalPrice,
        totalPrice: state.totalPrice,
        setQuantity: state.setQuantity,
    }))

    useEffect(() => {
        if(!quan)
            removeFromCart(item.id)
        else
            setQuantity(item.id,quan)
            
    }, [quan])

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
        'SourceSerifPro-Regular': require('../../assets/fonts/SourceSerifPro-Regular.ttf'),
    });

    
  return (
    <View style = {styles.container}>
        <Image source={{uri:image_uri}}  
        style={styles.cartimg}
        />
        <View style={styles.cartcontent}>
            <Text style={{fontFamily:"Poppins-Regular", fontSize:18, color:"#e5e1d8",}}>{item.itemname} </Text>
            <Text style={{fontFamily:'SourceSerifPro-Regular', color:"#e5e1d8", width:"80%", flex:1,}}>{item.description}</Text>
            <Text style={{color:"#e5e1d8"}}>Rs. {item.price}</Text>

        <View style={styles.cartquantity}>
            <MaterialIcons name="delete" size={26} color="#D10000" 
            onPress={() => {
                removeFromCart(item.id)
                setTotalPrice(totalPrice - item.price*quan)
            }}
            />
            <View style={{flexDirection:"row",gap:20}}>
                <Badge style={{backgroundColor:"#ffad16", borderRadius:5, color:"#000", fontSize:20, width: 30 ,height: 30, justifyContent:"center", alignItems:"center"}}
                onPress={() => {
                    setQuan((quan) => quan + 1)
                    // incrementItem(item.id,quan+1)
                    setTotalPrice(totalPrice + item.price)
                }}
                >+</Badge>
                <Text style={{color:"#e5e1d8", fontSize:20}}>{quan}</Text>
                <Badge style={{backgroundColor:"#ffad16", borderRadius:5, color:"#000", fontSize:20, width: 30 ,height: 30, justifyContent:"center", alignItems:"center"}}
                onPress={() => {
                        setQuan((quan) => quan - 1)
                        setTotalPrice(totalPrice - item.price)
                }}
                >-</Badge>
            </View>
        </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor:"gray",
        flexDirection: 'row',
        gap:10,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:5,
        backgroundColor:"#28293d",
        marginBottom:10,
    },
    cartimg:{
        width: 100,
        height: 100,
        borderRadius: 12,
        resizeMode: 'cover',
        flex:1,
    },
    cartcontent:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'baseline',
        color:"#313539",
        gap:1,
        fontWeight: 'semi-bold',
        flex:2,
        
    },
    cartquantity:{
        flexDirection: 'row',
        justifyContent:'space-between',
        width:"100%",
        alignItems:'center',
        flex:1,
        alignSelf:'flex-end',
        gap:1,
    }
})

export default CartItem
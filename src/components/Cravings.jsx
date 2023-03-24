import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Avatar } from 'react-native-paper'

import { userCravings } from '../data/userCravings'

import { useNavigation } from '@react-navigation/native'

import {I18n} from 'i18n-js'
import { en, bn, hi } from '../i18n'    

import useStore from '../store/store'

const Cravings = () => {
    
    const {locale} = useStore((state) => ({
        locale: state.locale
    }))

    const i18n = new I18n()
    i18n.fallbacks = true,
    i18n.translations = {en, bn, hi},
    i18n.locale = locale

    
    const navigation = useNavigation()

    const [cravings, setCravings] = useState('')

    useEffect(() => {
        setCravings(userCravings)
    }, [])
    
  return (
            <View style={{height:85, flexDirection:"row",justifyContent:"center", alignItems:"center"}}>

                <FlatList
                    data={cravings}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                                <Pressable style={{width:90, height:85,backgroundColor:"#1c1c27", borderRadius:10, margin:5, justifyContent:"flex-start", alignItems:"center", flex:1, flexDirection:"column", gap:2}}
                                onPress={() => {
                                    // console.log(item.name)
                                    navigation.navigate('Search',{
                                        screen:"SearchScreen",
                                        params: {
                                            data: item.name
                                        }
                                    })

                                }}
                                >
                                    <Avatar.Image style={{ alignSelf:"center",}} size={60} source={{uri:item.image, cache: 'only-if-cached'}} />
                                    <Text style={{color:"white"}}>{i18n.t(item.name)}</Text>
                                </Pressable>
                    )}
                />
            </View>
  )
}

export default Cravings

const styles = StyleSheet.create({})
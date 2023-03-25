import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";

export default function BookingScreen({route}) {

  // console.log(route)
  const navigation =  useNavigation()
  const { restaurant_name, rating, distance, reviews, cusines, filters, res_items, restaurant_image } = route.params.item;

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

    <SafeAreaProvider style={{ backgroundColor: "#1c1c27", width: "100%", height: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: 15 }}>
               <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 12, marginBottom: 10, backgroundColor: "#28293d", }}>

              <View style={{ paddingHorizontal: 10, paddingVertical: 15, flex: 3, }}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 18, color: "#e5e1d8" }}>{restaurant_name}</Text>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 10, color: "#e5e1d8" }}>
                  {cusines.map((item, index) => {
                    return item + (index < cusines.length - 1 ? ", " : "")
                  })}
                </Text>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 9, color: "gray" }}>Sealdah, Kolkata</Text>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 12, color: "#e5e1d8" }}>40-45 min | {distance}km away</Text>
              </View>

              <Pressable style={{ flex: 1, marginRight: 10, borderRadius: 12, height: 110, paddingVertical: 12, backgroundColor: "#1c1c27" }}
              >
                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, alignSelf: "center", color: "#ef845d", height: "40%" }}>{rating}</Text>

                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", alignSelf: "center", height: "60%" }}>
                  <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12, color: "#ffad16" }}>{reviews}</Text>
                  <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12, color: "#ffad16" }}>Reviews</Text>
                </View>
              </Pressable>

            </View>

            <View style={{width:"100%", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
              <Button 
               onPress={() => navigation.navigate("BookingOptionScreen",{item:route.params.item})}
               style={{paddingVertical:5, paddingHorizontal:10, borderWidth:1, borderColor:"#ef845d", borderRadius:10}}
               textColor="#ffad16"
               fontFamily="Poppins-Medium"
               
              >Book a Table</Button>
              <Button
              style={{paddingVertical:5, paddingHorizontal:10, borderWidth:1, borderColor:"#ef845d", borderRadius:10}}
              textColor="#ffad16"

              >Pay Bill</Button>
            </View>
    </SafeAreaProvider>
 
  );
}

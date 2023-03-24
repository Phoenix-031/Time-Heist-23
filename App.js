import { Pressable, Text, View } from 'react-native';
import { RootNavigator } from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { 
  MapScreen, 
  OrderList, 
  ReviewScreen, 
  LoginScreen, 
  RegisterScreen, 
  RestaurantScreen, 
  MyReviewsScreen, 
  CommentScreen, 
  OtpInput, 
  BookingScreen, 
  BookingOptionScreen,
  FavouriteOrders,
  LikedRestaurantsScreen,
  UserProfile,
  WriteReview,
  OrderMapView,
  OrderTrackingScreen,
 } from './src/screens';


import useStore from './src/store/store';

import { Entypo } from '@expo/vector-icons';

import { StripeProvider } from '@stripe/stripe-react-native';


const Stack = createNativeStackNavigator()


export default function App() {

const {user} = useStore((state) => ({
  user: state.user,
  }))

      const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Robotto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Robotto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Robotto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    });

    if(!fontsLoaded)
      return null

  return (
    <StripeProvider publishableKey='pk_test_51MnT0pSBE9PwAuPZOpvhaH0QAMlHm7uSXuZgI84HyrK3N4UyKu9QESQJQjL7PBZjWz6bSERWthF7zN6gQxRtoyT900geCkrQiW'>
      <PaperProvider>
        <NavigationContainer>

          <Stack.Navigator
            initialRouteName='Login'
          >


            {
              user === null ? (
                <>
                  <Stack.Screen name="Login" component={LoginScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="Register" component={RegisterScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="OtpInput" component={OtpInput}
                    options={{
                      headerShown: false,
                    }}
                  />
                </>
              ) : (null)
            }
          
            <Stack.Screen name="Home" component={RootNavigator}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen name="RestaurantScreen" component={RestaurantScreen}
              options={{
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>{route.params.item.restaurant_name}</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="MapScreen" component={MapScreen}
              options={{
                headerShown: false,
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>Delivery Location</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="WriteReview" component={WriteReview}
              options={{
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>{route.name}</Text>
                    </View>
                  )
                }
              }} />
            
            <Stack.Screen name="OrderHistoryScreen" component={OrderList}
              options={{
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>{route.name}</Text>
                    </View>
                  )
                }
              }} />
            <Stack.Screen name="ReviewScreen" component={ReviewScreen}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  // console.log(route, navigation)
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>{route.name}</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="FavouriteOrders" component={FavouriteOrders}
              options={{
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>{route.name}</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="LikedRestaurantsScreen" component={LikedRestaurantsScreen}
              options={{
                header: ({ navigation }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>Liked</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="UserProfile" component={UserProfile}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>Profile</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="MyReviewsScreen" component={MyReviewsScreen}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>Reviews</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="CommentScreen" component={CommentScreen}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>Review</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="OTP" component={OtpInput}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  // console.log(route, navigation)
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>Verify</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="BookingScreen" component={BookingScreen}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  // console.log(route, navigation)
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18, color: "#e5e1d8", paddingTop: 5 }}>Book a table</Text>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="BookingOptionScreen" component={BookingOptionScreen}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  // console.log(route, navigation)
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="OrderMapView" component={OrderMapView}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  // console.log(route, navigation)
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                    </View>
                  )
                }
              }}
            />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen}
              options={{
                headerShown: true,
                header: ({ navigation, route }) => {
                  // console.log(route, navigation)
                  return (
                    <View style={{
                      backgroundColor: "#1c1c27",
                      borderBottomWidth: 0,
                      paddingHorizontal: 20,
                      paddingTop: 20,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      <Pressable
                        onPress={() => navigation.goBack()}
                      ><Entypo name="chevron-left" size={24} color="#e5e1d8" /></Pressable>
                    </View>
                  )
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StripeProvider>
  );
}




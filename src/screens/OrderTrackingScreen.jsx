import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Avatar } from 'react-native-paper';
import { useFonts } from 'expo-font';

import { Feather, Entypo } from '@expo/vector-icons';

const OrderTrackingScreen = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });

      const marker1 = { latitude: location.coords.latitude + 0.045, longitude: location.coords.longitude + 0.045, title: 'Marker 1' };
      const marker2 = { latitude: location.coords.latitude - 0.045, longitude: location.coords.longitude - 0.045, title: 'Marker 2' };
      setMarkers([marker1, marker2]);
    })();
  }, []);

  function getPointsAlongLine(lat1, lon1, lat2, lon2, nPoints) {
    const R = 6371e3;
    const dLat = (lat2 - lat1) / nPoints;
    const dLon = (lon2 - lon1) / nPoints;
    let points = [];
    for (let i = 0; i <= nPoints; i++) {
      const φ = lat1 + i * dLat;
      const λ = lon1 + i * dLon;
      const x = R * Math.cos(φ) * Math.cos(λ);
      const y = R * Math.cos(φ) * Math.sin(λ);
      points.push({ latitude: φ, longitude: λ, x, y });
    }
    return points;
  }

  const polyline = markers.length === 2 ? getPointsAlongLine(markers[0].latitude, markers[0].longitude, markers[1].latitude, markers[1].longitude, 10) : [];

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
    <>
    <View style={styles.container}>
      {region ? (
        <MapView style={styles.map} initialRegion={region}>
          {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker} title={marker.title} />
          ))}
          {polyline.length > 0 && (
            <Polyline
              coordinates={polyline.map((point) => ({ latitude: point.latitude, longitude: point.longitude }))}
              strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={2}
            />
          )}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>

    <View style={{position:"absolute", bottom:10,zIndex:10,backgroundColor:"#1c1c27", width:"90%", alignSelf:"center", borderRadius:12, paddingVertical:8, paddingHorizontal:8, flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
      <Entypo name="user" size={24} color="white" />
      <View>
        <Text style={{color:"white", fontSize:16, fontWeight:"bold"}}>Driver Name</Text>
        <Text style={{color:"white", fontSize:16, fontWeight:"bold"}}>Driver Phone</Text>
      </View>
      <Feather name="phone-call" size={24} color="red" />
    </View>

    <View style={{position:"absolute", top:10,zIndex:10,backgroundColor:"#1c1c27", width:"90%", alignSelf:"center", borderRadius:12, paddingVertical:10, paddingHorizontal:8, flexDirection:"column", justifyContent:"space-around", alignItems:"center"}}>
      <View style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:10, paddingVertical:10}}>
        <Text style={{color:"white", fontSize:16, fontWeight:"bold"}}>Delivery status</Text>
        <Text style={{backgroundColor:"#28293d",color:"#ef845d", paddingVertical:8, paddingHorizontal:12, borderRadius:10, alignSelf:"center", borderColor:"green", borderWidth:2}}>Pending</Text>
      </View>
      <Text style={{color:"white", fontSize:16, fontWeight:"bold"}}>Arriving in 30 mins</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default OrderTrackingScreen;

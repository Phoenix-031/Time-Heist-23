import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';


export default function BookingOptionScreen({ route }) {
  // console.log(route.params.item)

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedClockIndex, setSelectedClockIndex] = useState(null);
  const handlePress = (index) => {
    setSelectedItem(index);
  };
  const handleClockClick = (index) => {
    setSelectedClockIndex(index);
  };
  const days = ['Today', 'Tomorrow', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dates = ['22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar', '30 Mar', '31 Mar'];
  const clocks = ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM']

  const dayDate = days.map((day, index) => {
    const isSelected = selectedDay === day && selectedDate === dates[index];
    const backgroundColor = isSelected ? '#ffad16' : '#1c1c27';
    const textColor = isSelected ? 'white' : '#ffad16';
    return {
      day: day,
      date: dates[index],
      backgroundColor,
      textColor,
      onPress: () => {
        setSelectedDay(day);
        setSelectedDate(dates[index]);
      },
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantname}>TGI FRIDAYS</Text>
      <Text style={styles.restaurantplace}>Elgin,Kolkata</Text>
      <Text style={styles.step1}>Step 1 of 2: Select Date and Time</Text>
      <ScrollView scrollEventThrottle={16}>
        <View style={{ flex: 1, backgroundColor: '#1c1c27', paddingTop: 20 }}>
          <Text style={styles.whatday}>What Day?</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {dayDate.map((item, index) => {
              return (
                <TouchableOpacity style={[styles.cardtext, { backgroundColor: item.backgroundColor }]} key={index} onPress={item.onPress}>
                  <Text style={{ color: item.textColor }}>{item.day}</Text>
                  <Text style={{ color: item.textColor }}>{item.date}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        <View style={{ flex: 1, backgroundColor: '#1c1c27', paddingTop: 20 }}>
          <Text style={styles.whatday}>How Many People?</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              const isSelected = selectedItem === index;
              const cardStyle = {
                ...styles.cardtext,
                backgroundColor: isSelected ? '#ffad16' : '#1c1c27',
              };
              const textStyle = {
                color: isSelected ? 'white' : '#ffad16',
                fontSize: 18,
              };
              return (
                <TouchableOpacity
                  key={index}
                  style={cardStyle}
                  onPress={() => handlePress(index)}
                >
                  <Text style={textStyle}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ flex: 1, backgroundColor: '#1c1c27', paddingTop: 20 }}>
          <Text style={styles.whatday}>What Time?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {clocks.map((item, index) => {
              const isSelected = selectedClockIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.cardtext, isSelected && styles.selectedItem]}
                  onPress={() => handleClockClick(index)}
                >
                  <Text style={[{ color: isSelected ? 'white' : '#ffad16' }]}>{item}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

      </ScrollView>

      <Button mode="contained">Book</Button>

    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8,
    backgroundColor: "#1c1c27"
  },
  selectedItem: {
    backgroundColor: '#ffad16',
    borderWidth: 2,

  },
  cardtext: {
    borderWidth: 2,
    borderRadius: 12,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    margin: 10,
    fontFamily: "Poppins-SemiBold",
    borderColor: "#ef845d"
  },
  cardtextpeople: {
    borderWidth: 2,
    borderRadius: 12,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    fontFamily: "Poppins-SemiBold",
    borderColor: "#ef845d"
  },
  restaurantname: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#ef845d"
  },
  restaurantplace: {
    color: 'grey',
    fontFamily: "Poppins-SemiBold",
    color: "#ef845d"
  },

  step1: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#ef845d",
  },

  whatday: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    backgroundColor: "#1c1c27",
    color: "white",
    paddingLeft: 5,
  },
});

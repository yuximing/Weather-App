import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import WeatherInfo from './WeatherInfo';

const API_KEY = '6280937c8b9027a6d736998a1f909ee1';

const WeatherApp = () => {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // fetch geo data
  //   const fetchGeoData = async (city) => {
  //     try {
  //       const response = await fetch(
  //         `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${API_KEY}`
  //       );
  //       if (response.status == 200) {
  //         const geoData = await response.json();
  //         setGeoData(data);
  //       } else {
  //         setGeoData(null);
  //       }
  //     } catch (error) {
  //       Alert.alert('Error', error.message);
  //     }
  //   };

  // fetch the weather data
  const fetchWeatherData = async ({ lat, lon }) => {
    try {
      //   fetchGeoData(city);
      // null?
      console.log('im in fetchWeatherData');
      console.log(lat);
      console.log(lon);
      const response = await fetch(
        // `https://api.openweathermap.org/data/2.5/weather?q=Kingston,CA&appid=${API_KEY}`
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}`
      );
      //   if (response.status == 200) {
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
      console.log(weatherData);
      setIsLoaded(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(async () => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=Kingston&limit=5&appid=${API_KEY}`
    );
    const data = await response.json();
    const myKingston = data[1];
    console.log(data);
    console.log(myKingston);
    let lat = myKingston.lat;
    let lon = myKingston.lon;
    console.log(lat, lon);
    fetchWeatherData({ lat, lon });
  }, []);

  // if not loaded, display a loading page
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='black' />
      </View>
    );
  }

  // data successfully loaded, display the data
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather</Text>
      </View>
      <WeatherInfo weatherData={weatherData} />
    </View>
  );
};

export default WeatherApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

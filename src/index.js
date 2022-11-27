import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import WeatherInfo from './WeatherInfo';

const API_KEY = '6280937c8b9027a6d736998a1f909ee1';

const WeatherApp = () => {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // fetch the weather data
  const fetchWeatherData = async ({ lat, lon }) => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        // `https://api.openweathermap.org/data/2.5/weather?q=Kingston,CA&appid=${API_KEY}`
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      // check if response is ok
      setWeatherData(data);
      setIsRefreshing(false);
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
  if (!weatherData) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' color='black' />
      </SafeAreaView>
    );
  }

  // data successfully Refreshing, display the data
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() =>
              fetchWeatherData({ lat: 44.230687, lon: -76.481323 })
            }
          />
        }
      > */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather</Text>
      </View>
      <WeatherInfo weatherData={weatherData} />
      {/* </ScrollView> */}
    </SafeAreaView>
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

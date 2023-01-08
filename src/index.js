import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import WeatherInfo from './WeatherInfo';
import Search from './Search';
import * as Location from 'expo-location';
import Home from './Home';

const API_KEY = '6280937c8b9027a6d736998a1f909ee1';

const WeatherApp = () => {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetch the weather data
  const fetchWeatherData = async ({ lat, lon }) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        setWeatherData(data);
      })
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setIsLoading(false));
  };

  // listen to geoData, whenever updated, refetch weather data
  useEffect(() => {
    // initially, geoData is null, ask for user's permision and render weather for current location
    if (!geoData) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        // permission not granted
        if (status !== 'granted') {
          setWeatherData(null);
          return;
        }
        // permission granted, call fetchWeatherData
        let location = await Location.getCurrentPositionAsync({});
        let lat = location.coords.latitude;
        let lon = location.coords.longitude;
        fetchWeatherData({ lat, lon });
      })();
    } else {
      let lat = geoData.lat;
      let lon = geoData.lon;
      console.log(geoData);
      fetchWeatherData({ lat, lon });
    }
  }, [geoData]);

  // if info not loaded, display a loading page
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' color='black' />
      </SafeAreaView>
    );
  }

  // data successfully Loaded, display the data
  if (weatherData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Weather</Text>
        </View>
        <Search setGeoData={setGeoData} />
        <WeatherInfo weatherData={weatherData} geoData={geoData} />
      </SafeAreaView>
    );
  }
  // render a welcome page, if the user does not agree to share location
  else {
    return (
      <SafeAreaView style={styles.container}>
        <Home setGeoData={setGeoData} />
      </SafeAreaView>
    );
  }
};

export default WeatherApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2aa',
    // paddingTop: Constants.statusBarHeight,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    // color: '#262626',
    color: '#131415',
  },
  welcome: {
    margin: 30,
    marginTop: 60,
    justifyContent: 'center',
    zIndex: -1,
  },
  welcomeText1: {
    fontSize: '40',
    fontWeight: 'bold',
    paddingBottom: 13,
    color: '#33334d',
  },
  welcomeText2: {
    fontSize: '20',
    fontWeight: '450',
    color: '#9494b8',
    width: 250,
    fontWeight: 'bold',
  },
});

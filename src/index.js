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

const API_KEY = '6280937c8b9027a6d736998a1f909ee1';

const WeatherApp = () => {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGeoData = async (city) => {
    let isZipcode = /^\d{5}(-\d{4})?$/.test(city);
    // this zipcode part does not work for now
    if (isZipcode) {
      console.log('it is a zipcode input');
      console.log(typeof parseInt(city));
      fetch(
        `http://api.openweathermap.org/geo/1.0/zip?zip=10016,us&appid=${API_KEY}`
      )
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          // console.log(data);
          // console.log('#######^^^^^^HELLO');
          setGeoData(data);
        })
        .catch((err) => Alert.alert('Error', err.message));
    } else {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      )
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          // console.log(data);
          // console.log('#######^^^^^^');
          setGeoData(data[1]);
        })
        .catch((err) => Alert.alert('Error', err.message));
    }
  };
  // fetch the weather data
  const fetchWeatherData = async ({ lat, lon }) => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
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
          //   console.log('permit noooo');
          setWeatherData(null);
          return;
        }
        // permission granted, call fetchWeatherData
        // console.log('permit yesss');
        let location = await Location.getCurrentPositionAsync({});
        let lat = location.coords.latitude;
        let lon = location.coords.longitude;
        fetchWeatherData({ lat, lon });
      })();
    } else {
      let lat = geoData.lat;
      let lon = geoData.lon;
      //   console.log(lat, lon);
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
        <Search fetchGeoData={fetchGeoData} setGeoData={setGeoData} />
        <WeatherInfo weatherData={weatherData} geoData={geoData} />
      </SafeAreaView>
    );
  }
  // render a welcome page, if the user does not agree to share location
  else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Weather</Text>
        </View>

        <Search fetchGeoData={fetchGeoData} setGeoData={setGeoData} />
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Hello!</Text>
          <Text style={styles.welcomeText}>
            {'Search for a city to check out the weather:)'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
};

export default WeatherApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dce7ef',
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#262626',
  },
  welcome: {
    margin: 30,
    marginTop: 70,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '300',
  },
});

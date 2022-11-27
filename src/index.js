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
import Search from './Search';
import * as Location from 'expo-location';

const API_KEY = '6280937c8b9027a6d736998a1f909ee1';

const WeatherApp = () => {
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGeoData = async (city) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    )
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data[1]);
        console.log('#######^^^^^^');
        setGeoData(data[1]);
      })
      .catch((err) => Alert.alert('Error', err.message));
  };
  // fetch the weather data
  const fetchWeatherData = async ({ lat, lon }) => {
    setIsLoading(true);
    // await fetchGeoData(city);
    // console.log('hello from fetchweatherdata');
    // console.log(geoData);
    fetch(
      // `https://api.openweathermap.org/data/2.5/weather?q=Kingston,CA&appid=${API_KEY}`
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data);
        // console.log('^^^^^^');
        // console.log(await getGeoData());
        console.log('&&&&&&&');
        setWeatherData(data);
      })
      .catch((err) => Alert.alert('Error', err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // const response = await fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=Kingston&limit=5&appid=${API_KEY}`
    // );
    // const data = await response.json();
    // const myKingston = data[1];
    // console.log(data);
    // console.log(myKingston);
    // console.log('hello from use effect');
    // console.log(geoData);
    // console.log(geoData.lat, geoData.lon);
    // let lat = myKingston.lat;
    // let lon = myKingston.lon;
    // console.log(lat, lon);
    console.log('hello from use effect');
    // console.log(geoData);
    if (!geoData) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('permit noooo');
          setWeatherData(null);
          return;
        }
        console.log('permit yesss');
        let location = await Location.getCurrentPositionAsync({});
        // console.log('location: ', location);
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
    // if geoData is null, set it to current location
    // fetchWeatherData({ lat: 44.230687, lon: -76.481323 });
  }, [geoData]);

  // if not loaded, display a loading page
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' color='black' />
      </SafeAreaView>
    );
  }

  // data successfully Loading, display the data
  if (weatherData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Weather</Text>
        </View>
        <Search fetchGeoData={fetchGeoData} />
        <WeatherInfo weatherData={weatherData} geoData={geoData} />
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Weather</Text>
        </View>

        <Search fetchGeoData={fetchGeoData} />
        <Text>Hello!</Text>
        <Text>Search for a city to check out the weather!</Text>
      </SafeAreaView>
    );
  }
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

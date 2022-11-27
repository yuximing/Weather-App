import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  console.log('im in weatherinfo');
  console.log(weatherData);
  // when swich to lon and lat, need to cheng the name prop to timezone
  const {
    timezone,
    // weather: [{ main, icon }],
    current: {
      temp,
      humidity,
      wind_speed,
      weather: [{ main, icon }],
    },
    // wind: { wind_speed },
    // rain: { onehr },
    daily: [
      {
        temp: { min, max },
      },
    ],
  } = weatherData;
  console.log(humidity);
  console.log('^^^^^^^^^');
  return (
    <SafeAreaView style={styles.container}>
      {/* city name (title)*/}
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>{timezone}</Text>
      </View>
      {/* icon & current temp */}
      <View style={styles.currWeather}>
        <Image
          style={styles.largeIcon}
          source={{ uri: `http://openweathermap.org/img/w/${icon}.png` }}
        />
        <Text style={styles.currTemp}>{temp}</Text>
      </View>
      {/* description & min - max */}
      <Text style={styles.centerText}>{main}</Text>
      <Text style={styles.centerText}>
        L:{min} H:{max}
      </Text>
      {/* extra info: wind_speed, precipitation, humidity */}
      <View style={styles.extraInfo}>
        {/* wind_speed */}
        <View style={styles.smallInfoCard}>
          <View style={styles.smallInfoCardHeader}>
            <FontAwesome5 name='wind' size={24} color='black' />
            <Text style={styles.smallInfoCardText}>Wind</Text>
          </View>
          <Text style={styles.smallInfoCardText}>{wind_speed}</Text>
        </View>
        {/* precipitation */}
        <View style={styles.smallInfoCard}>
          <View style={styles.smallInfoCardHeader}>
            <Entypo name='water' size={24} color='black' />
            <Text style={styles.smallInfoCardText}>Precipitation</Text>
          </View>
          <Text style={styles.smallInfoCardText}>rainfall(mm)</Text>
        </View>
        {/* humidity */}
        <View style={styles.smallInfoCard}>
          <View style={styles.smallInfoCardHeader}>
            <FontAwesome5 name='water' size={24} color='black' />
            <Text style={styles.smallInfoCardText}>Humidity</Text>
          </View>
          <Text style={styles.smallInfoCardText}>{humidity}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  currWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeIcon: {
    width: 120,
    height: 120,
  },
  currTemp: {
    // textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  smallInfoCard: {
    // width: Dimensions.get('screen').width / 3.5,
    padding: 7,
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
  },
  smallInfoCardHeader: {
    flexDirection: 'row',
  },
  smallInfoCardText: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 3,
  },
});

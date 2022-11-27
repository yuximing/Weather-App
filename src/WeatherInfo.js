import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  SectionList,
  FlatList,
} from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  console.log(weatherData);
  console.log('^^^^^^^^^');
  // when swich to lon and lat, need to cheng the name prop to timezone
  const {
    timezone,
    current: {
      temp,
      humidity,
      wind_speed,
      weather: [{ main, icon }],
    },
    daily: [
      {
        temp: { min, max },
      },
    ],
  } = weatherData;
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
        <Text style={styles.currTemp}>{Math.round(temp)}°</Text>
      </View>
      {/* description & min - max */}
      <Text style={styles.centerText}>{main}</Text>
      <Text style={styles.centerText}>
        L:{Math.round(min)}° H:{Math.round(max)}°
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
      <View>
        <Text>7-Day Forcast</Text>
        <FlatList
          horizontal={false}
          data={weatherData.daily.slice(1, 8)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(day) => {
            const weather = day.item.weather[0];
            const temp = day.item.temp;
            var dt = new Date(day.item.dt * 1000);
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var dayOfWeek = days[dt.getDay()];
            console.log(weather);
            return (
              <View style={styles.forcastInfoCard}>
                <View style={styles.forcastInfoLeft}>
                  <Image
                    style={styles.smallIcon}
                    source={{
                      uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                    }}
                  />
                  <View style={styles.forcastInfoMain}>
                    <Text>{dayOfWeek}</Text>
                    <Text>{weather.description}</Text>
                  </View>
                </View>
                <Text>
                  {Math.round(temp.min)}° ~ {Math.round(temp.max)}°
                </Text>
              </View>
            );
          }}
        />
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
  forcastInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  smallIcon: {
    width: 70,
    height: 70,
  },
  forcastInfoLeft: {
    flexDirection: 'row',
  },
  forcastInfoMain: {
    padding: 10,
  },
});

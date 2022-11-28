import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

const WeatherInfo = ({ weatherData, geoData }) => {
  const {
    current: {
      temp,
      feels_like,
      humidity,
      wind_speed,
      weather: [{ description, icon }],
    },
    daily: [
      {
        temp: { min, max },
      },
    ],
  } = weatherData;
  const { name } = geoData;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const forcast = weatherData.daily.slice(1, 8);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* city name (title)*/}
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>{name}</Text>
        </View>
        {/* icon & current temp */}
        <View style={styles.currWeather}>
          <Text style={styles.currTemp}>{Math.round(temp)}°</Text>
          <Image
            style={styles.largeIcon}
            source={{ uri: `http://openweathermap.org/img/w/${icon}.png` }}
          />
        </View>
        {/* description & min - max */}
        <Text style={styles.centerText}>{description}</Text>
        <Text style={styles.centerText}>
          {Math.round(min)}° / {Math.round(max)}°
        </Text>
        {/* extra info: feels_life, wind_speed, precipitation, humidity */}
        <View style={styles.extraInfo}>
          {/* feels_like */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <FontAwesome5 name='temperature-high' size={24} color='black' />
              <Text style={styles.smallInfoCardHeaderText}>Feels like</Text>
            </View>
            <Text style={styles.smallInfoCardText}>
              {Math.round(feels_like)}°
            </Text>
          </View>
          {/* humidity */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <FontAwesome5 name='water' size={24} color='black' />
              <Text style={styles.smallInfoCardHeaderText}>Humidity</Text>
            </View>
            <Text style={styles.smallInfoCardText}>{humidity}%</Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          {/* wind_speed */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <FontAwesome5 name='wind' size={24} color='black' />
              <Text style={styles.smallInfoCardHeaderText}>Wind</Text>
            </View>
            <Text style={styles.smallInfoCardText}>{wind_speed} m/s</Text>
          </View>
          {/* precipitation */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <Entypo name='water' size={24} color='black' />
              <Text style={styles.smallInfoCardHeaderText}>Precipitation</Text>
            </View>
            <Text style={styles.smallInfoCardText}>0 mm</Text>
            <Text style={styles.smallInfoCardText}> for the last hour</Text>
          </View>
        </View>

        <View style={styles.forcast}>
          <Text style={styles.forcastTitle}>7-Day Forcast</Text>
          <View style={styles.forcastList}>
            {forcast.map((day) => {
              const weather = day.weather[0];
              const temp = day.temp;
              var dt = new Date(day.dt * 1000);
              var dayOfWeek = days[dt.getDay()];
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
                      <Text style={styles.forcastInfoDay}>{dayOfWeek}</Text>
                      <Text style={styles.forcastInfoText}>
                        {weather.description}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.forcastInfoRight}>
                    {Math.round(temp.min)}° / {Math.round(temp.max)}°
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262626',
  },
  currWeather: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeIcon: {
    marginTop: -13,
    marginBottom: -14,
    width: 115,
    height: 115,
  },
  currTemp: {
    // textAlign: 'center',
    fontSize: 75,
    // fontFamily: 'Open Sans',
    marginTop: 4,
    marginBottom: -10,
    color: '#333333',
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 3,
    fontSize: 18,
    color: '#262626',
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  smallInfoCard: {
    width: Dimensions.get('screen').width / 2.5,
    height: 70,
    padding: 7,
    backgroundColor: '#ffffff',
    // borderColor: 'black',
    borderRadius: 15,
    // borderWidth: 1,
    shadowColor: '#323232',
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 2 },
  },
  smallInfoCardHeader: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 3,
  },
  smallInfoCardHeaderText: {
    paddingLeft: 15,
    paddingTop: 4,
    font: 13,
    fontWeight: 'bold',
    color: '#262626',
  },
  smallInfoCardText: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 0,
    font: 13,
    color: '#262626',
  },
  forcast: {
    flex: 1,
    margin: 10,
  },
  forcastTitle: {
    fontSize: 20,
    paddingLeft: 21,
    fontWeight: 'bold',
    color: '#262626',
  },
  forcastList: {
    margin: 10,
  },
  forcastInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    margin: 10,
    backgroundColor: '#ffffff',
    // borderColor: 'black',
    borderRadius: 15,
    // borderWidth: 1,
    shadowColor: '#323232',
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 2 },
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
    marginTop: 5,
  },
  forcastInfoDay: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#262626',
  },
  forcastInfoText: {
    paddingTop: 2,
    color: '#262626',
  },
  forcastInfoRight: {
    marginTop: 20,
    fontSize: 21,
    marginRight: 13,
    color: '#262626',
    fontWeight: '500',
  },
});

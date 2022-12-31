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
import { LinearGradient } from 'expo-linear-gradient';

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
        <View style={styles.currWeather}>
          <LinearGradient
            // style={styles.currWeather}
            style={{
              borderRadius: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            colors={['#68e2d3aa', '#00bcff', '#5aa6f0']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.85, 0.95]}
          >
            <View style={styles.currLeft}>
              <Image
                style={styles.largeIcon}
                source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
              />
              <Text style={styles.currText}>{description}</Text>
              <Text style={styles.currText}>
                H: {Math.round(max)}° L: {Math.round(min)}°
              </Text>
            </View>
            <View style={styles.currRight}>
              <Text style={styles.location}>{name}</Text>
              <Text style={styles.currTemp}>{Math.round(temp)}°</Text>
              {/* description & min - max */}
            </View>
          </LinearGradient>
        </View>
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
    zIndex: -1,
  },
  location: {
    width: '100%',
    // textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f2f2f2',
  },
  currWeather: {
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { height: 7, width: 3 },
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    // marginVertical: 10,
    marginBottom: 10,
    marginHorizontal: 19,
    backgroundColor: 'transparent',

    // borderWidth: 1,

    borderRadius: 30,
  },
  currLeft: {
    padding: 15,
    paddingBottom:20,
    marginLeft: 10,
    display: 'flex',
    paddingLeft: 20,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-start',
  },
  currRight: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: 10,
    paddingRight: 15,
    marginRight: 10,
  },
  largeIcon: {
    marginTop: -13,
    marginBottom: -25,
    marginLeft: -27,
    width: 130,
    height: 130,
  },
  currTemp: {
    // textAlign: 'center',
    fontSize: 75,
    // fontFamily: 'Open Sans',
    marginTop: -4,
    marginBottom: -10,
    color: '#f2f2f2',
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 3,
    fontSize: 18,
    color: '#262626',
  },
  currText: {
    fontSize: 18,
    color: '#f2f2f2',
    // fontWeight: 'bold',
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

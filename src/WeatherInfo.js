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
  const forecast = weatherData.daily.slice(1, 8);
  const icons = {
    '01d': require('./../assets/Icons/01d.png'),
    '01n': require('./../assets/Icons/01n.png'),
    '02d': require('./../assets/Icons/02d.png'),
    '02n': require('./../assets/Icons/02n.png'),
    '03d': require('./../assets/Icons/03d.png'),
    '03n': require('./../assets/Icons/03n.png'),
    '04d': require('./../assets/Icons/04d.png'),
    '04n': require('./../assets/Icons/04n.png'),
    '09d': require('./../assets/Icons/09d.png'),
    '09n': require('./../assets/Icons/09n.png'),
    '10d': require('./../assets/Icons/10d.png'),
    '10n': require('./../assets/Icons/10n.png'),
    '11d': require('./../assets/Icons/11d.png'),
    '11n': require('./../assets/Icons/11n.png'),
    '13d': require('./../assets/Icons/13d.png'),
    '13n': require('./../assets/Icons/13n.png'),
    '50d': require('./../assets/Icons/50d.png'),
    '50n': require('./../assets/Icons/50n.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Current weather info card */}
        <View style={styles.currWeather}>
          <LinearGradient
            style={{
              borderRadius: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%',
            }}
            colors={['#aecdff', '#5896fd']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.85]}
          >
            <View style={styles.currLeft}>
              <Text style={styles.currText}>{description}</Text>
              <Text style={styles.currText}>
                H: {Math.round(max)}° L: {Math.round(min)}°
              </Text>
            </View>
            <View style={styles.currRight}>
              <Text style={styles.location}>{name}</Text>
              <Text style={styles.currTemp}>{Math.round(temp)}°</Text>
            </View>
          </LinearGradient>
          <View>
            <Image style={styles.largeIcon} source={icons[icon]} />
          </View>
        </View>
        {/* extra info: feels_life, wind_speed, precipitation, humidity */}
        <View style={styles.extraInfo}>
          {/* feels_like */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <FontAwesome5 name='temperature-high' size={24} color='#6a55f7' />
              <Text style={styles.smallInfoCardHeaderText}>Feels like</Text>
            </View>
            <Text style={styles.smallInfoCardText}>
              {Math.round(feels_like)}°
            </Text>
          </View>
          {/* humidity */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <FontAwesome5 name='water' size={24} color='#6a55f7' />
              <Text style={styles.smallInfoCardHeaderText}>Humidity</Text>
            </View>
            <Text style={styles.smallInfoCardText}>{humidity}%</Text>
          </View>
          {/* wind_speed */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <FontAwesome5 name='wind' size={24} color='#6a55f7' />
              <Text style={styles.smallInfoCardHeaderText}>Wind</Text>
            </View>
            <Text style={styles.smallInfoCardText}>{wind_speed} m/s</Text>
          </View>
          {/* precipitation */}
          <View style={styles.smallInfoCard}>
            <View style={styles.smallInfoCardHeader}>
              <Entypo name='water' size={24} color='#6a55f7' />
              <Text style={styles.smallInfoCardHeaderText}>Rainfall</Text>
            </View>
            <Text style={styles.smallInfoCardText}>
              {weatherData.minutely[0].precipitation} mm
            </Text>
          </View>
        </View>

        <View style={styles.forecast}>
          <Text style={styles.forecastTitle}>7-Day Forecast</Text>
          <View style={styles.forecastList}>
            {forecast.map((day) => {
              const weather = day.weather[0];
              const temp = day.temp;
              var dt = new Date(day.dt * 1000);
              var dayOfWeek = days[dt.getDay()];
              var iconID = weather.icon;
              return (
                <View style={styles.forecastInfoCard} key={dayOfWeek}>
                  <View style={styles.forecastInfoLeft}>
                    <Image
                      style={styles.smallIcon}
                      key={iconID}
                      source={icons[iconID]}
                    />
                    <View style={styles.forecastInfoMain}>
                      <Text style={styles.forecastInfoDay}>{dayOfWeek}</Text>
                      <Text style={styles.forecastInfoText}>
                        {weather.description}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.forecastInfoRight}>
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
    shadowColor: '#5896fd',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { height: 9, width: 4 },
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 19,
    backgroundColor: 'transparent',
    borderRadius: 30,
    height: 180,
    overflow: 'visible',
  },
  currLeft: {
    padding: 15,
    paddingBottom: 20,
    marginLeft: 20,
    display: 'flex',
    paddingLeft: 10,
    justifyContent: 'flex-end',
  },
  currRight: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: 10,
    paddingRight: 15,
    marginRight: 15,
    flexDirection: 'column',
  },
  largeIcon: {
    position: 'absolute',
    width: 210,
    height: 210,
    top: -250,
    left: -10,
  },
  currTemp: {
    fontSize: 80,
    marginTop: -4,
    marginBottom: -10,
    color: '#f2f2f2',
    fontWeight: '800',
    textShadowColor: '#000000',
    textShadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.2,
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
    fontWeight: '900',
    padding: 2,
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 19,
    marginVertical: 10,
  },
  smallInfoCard: {
    width: 73,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    shadowColor: '#323232',
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 2 },
    paddingTop: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  smallInfoCardHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingTop: 4,
  },
  smallInfoCardHeaderText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#c2c2d6',
    paddingTop: 5,
  },
  smallInfoCardText: {
    textAlign: 'center',
    alignItems: 'center',
    font: 13,
    fontWeight: 'bold',
    color: '#404040',
    paddingBottom: 9,
  },
  forecast: {
    flex: 1,
  },
  forecastTitle: {
    fontSize: 20,
    paddingLeft: 26,
    fontWeight: 'bold',
    color: '#262626',
    paddingVertical: 8,
  },
  forecastList: {
    // margin: 10,
  },
  forecastInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginHorizontal: 19,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    shadowColor: '#323232',
    shadowColor: '#5896fd',
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 2 },
    overflow: 'visible',
    height: 70,
  },
  smallIcon: {
    width: 70,
    height: 70,
    marginTop: -8,
  },
  forecastInfoLeft: {
    flexDirection: 'row',
  },
  forecastInfoMain: {
    padding: 8,
    marginTop: 5,
  },
  forecastInfoDay: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#262626',
  },
  forecastInfoText: {
    paddingTop: 2,
    fontWeight: 'bold',
    color: '#5896fd',
  },
  forecastInfoRight: {
    marginTop: 18,
    fontSize: 21,
    marginRight: 13,
    color: '#808080',
    fontWeight: '600',
  },
});

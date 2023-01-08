import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Search from './Search';

const Home = (props) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather</Text>
      </View>
      <Search fetchGeoData={props.fetchGeoData} setGeoData={props.setGeoData} />
      <View style={styles.welcome}>
        <Text style={styles.welcomeText2}>
          {'Search for a city to check out the weather ;)'}
        </Text>
      </View>
      <Image
        style={styles.icon1}
        source={require('./../assets/Icons/01d.png')}
      />
      <Image
        style={styles.icon2}
        source={require('./../assets/Icons/02n.png')}
      />
      <Image
        style={styles.icon3}
        source={require('./../assets/Icons/13d.png')}
      />
    </View>
  );
};

export default Home;

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
    fontSize: '21',
    fontWeight: '450',
    color: '#9494b8',
    fontWeight: 'bold',
    paddingTop: 160,
  },
  icon1: {
    width: 400,
    height: 400,
    position: 'absolute',
    left: 150,
  },
  icon2: {
    width: 350,
    height: 350,
    position: 'absolute',
    left: -140,
    top: 310,
  },
  icon3: {
    width: 330,
    height: 330,
    position: 'absolute',
    left: 145,
    top: 440,
  },
});

import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Search = ({ fetchGeoData }) => {
  const [city, setCity] = useState('');
  return (
    <View style={styles.searchBar}>
      <Ionicons name='search' size={24} color='black' />
      <TextInput
        style={styles.searchTextbox}
        placeholder='Search for a city'
        value={city}
        onChangeText={(text) => setCity(text)}
        onSubmitEditing={() => fetchGeoData(city)}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 19,
    padding: 10,
    backgroundColor: '#cbdbe7',
    shadowColor: '#323232',
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 2 },
  },
  searchTextbox: {
    marginLeft: 10,
    height: 20,
  },
});

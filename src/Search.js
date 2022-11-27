import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Search = ({ fetchGeoData }) => {
  const [city, setCity] = useState('');
  return (
    <View style={styles.searchBar}>
      <Ionicons name='search' size={24} color='black' />
      <TextInput
        placeholder='Search for a city'
        value={city}
        onChangeText={(text) => setCity(text)}
        onSubmitEditing={() => fetchGeoData(city)}
        // onSubmitEditing={() => console.log(city)}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
});

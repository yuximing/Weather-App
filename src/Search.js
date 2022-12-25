import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '6280937c8b9027a6d736998a1f909ee1';

const Search = (props) => {
  const [input, setInput] = useState('');
  const [geoList, setGeoList] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fetchGeoList = async (input) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
    )
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setGeoList(data);
      })
      .catch((err) => Alert.alert('Error', err.message));
  };

  // listen to geoList, if it is updated and it is not null
  // set submitted to true so that the dropdown list can be displayed
  useEffect(() => {
    if (geoList) setSubmitted(true);
  }, [geoList]);

  return (
    <View>
      <View style={styles.searchBar}>
        <Ionicons name='search' size={24} color='black' />
        <TextInput
          style={styles.searchTextbox}
          placeholder='Search for a city'
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={() => {
            fetchGeoList(input);
          }}
        />
      </View>
      {submitted && (
        <View style={styles.optionList}>
          {geoList.map((item) => {
            return (
              <TouchableOpacity
                style={styles.option}
                // set submitted back to false so that the option list is removed
                // set the geoData to the selected option so that the weather info is updated and displayed
                onPress={() => {
                  setSubmitted(false);
                  props.setGeoData(item);
                }}
              >
                {/* vv need to address the case where state is empty */}
                <Text>
                  {item.name}, {item.state}, {item.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
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
  option: {
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 19,
    padding: 10,
    backgroundColor: '#cccccc',
  },
});

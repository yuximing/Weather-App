import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const API_KEY = '6280937c8b9027a6d736998a1f909ee1';

const Search = (props) => {
  const [input, setInput] = useState('');
  const [geoList, setGeoList] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchGeoList = async (input) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
    )
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
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
    <View style={{ zIndex: 1 }}>
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
      {/* {submitted && (
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
              > */}
      {/* remove the state field if empty */}
      {/* {item.state ? (
                  <Text>
                    {item.name}, {item.state}, {item.country}
                  </Text>
                ) : (
                  <Text>
                    {item.name}, {item.country}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )} */}
      <Modal transparent={true} visible={submitted} animationType='fade'>
        <TouchableOpacity
          onPress={() => setSubmitted(false)}
          style={{
            backgroundColor: '#808080aa',
            flex: 1,
          }}
        >
          <View
            style={{
              ...styles.searchBar,
              marginTop: Constants.statusBarHeight + 45,
            }}
          >
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
                    {/* remove the state field if empty */}
                    {item.state ? (
                      <Text style={{ fontSize: 15 }}>
                        {item.name}, {item.state}, {item.country}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 15 }}>
                        {item.name}, {item.country}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: -10,
    marginHorizontal: 19,
    padding: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#323232',
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 2 },
  },
  searchTextbox: {
    marginLeft: 10,
    marginRight: 25,
    height: 20,
    fontSize: 17,
  },
  optionList: {
    borderRadius: 20,
    marginHorizontal: 19,
    backgroundColor: '#e6e6e6',
    marginTop: 30,
  },
  option: {
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    marginLeft: 12,
    padding: 10,
  },
});

import 'react-native-get-random-values';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState } from 'react';
import {View, StyleSheet, FlatList, Alert, StatusBar} from 'react-native';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import ClearItems from './components/ClearItems';

const App = () => {
  const KEY = '@storage_Key';

  const storeData = async (value) => {
    try {
      let jsonValue = JSON.stringify(value);
      console.log('jsonValue (before storing): ' + jsonValue);
      await AsyncStorage.setItem(KEY, jsonValue);
    } catch (e) {
      console.error('Error: Could not store data.');
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY);
      console.log('jsonValue (after retrieval): ' + jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error('Error: Problem retrieving stored data (if any).');
    }
  }

  const [items, setItems] = useState([]);

  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id != id));

  }

  const addItem = (text) => {
    if (text !== '') {
      setItems(prevItems => [{id: uuid.v4(), text}, ...prevItems]);
      setItems(prevItems => prevItems.sort((a, b) => a.text.localeCompare(b.text)));
      storeData(items)
        .then(() => console.log(getData()));
    }
    else
      Alert.alert('Nothing to add. Please enter an item.')
  }

  const clearItems = () => setItems([])

  

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem} items={items}/>
      <FlatList 
        data={items}
        renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem}/>}
      />
      <StatusBar />
      {!!items.length && <ClearItems clearItems={clearItems}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
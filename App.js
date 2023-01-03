import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

import { MMKVLoader } from 'react-native-mmkv-storage';

import React, { useState, useEffect } from 'react';
import {View, StyleSheet, FlatList, Alert, StatusBar, Platform} from 'react-native';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import ClearItems from './components/ClearItems';

const App = () => {
  const KEY = 'data';
  const MMKV = new MMKVLoader().initialize();

  const storedData = JSON.parse(MMKV.getString(KEY));
  //console.log(storedData);

  const [items, setItems] = useState((storedData === null || storedData === '') ? [] : storedData);

  useEffect(() => {
    const data = JSON.stringify(items);
    try {
      MMKV.setStringAsync(KEY, data);
      //console.log(MMKV.getString(KEY));
    } catch(e) {
      //console.log(e);
    }
  }, [items]);

  const deleteItem = (id) => setItems(prevItems => prevItems.filter(item => item.id != id));

  const addItem = (text) => {
    if (text !== '') {      
      setItems(prevItems => [{id: uuid.v4(), text: text.trim()}, ...prevItems]);
      setItems(prevItems => prevItems.sort((a, b) => a.text.localeCompare(b.text)));
    }
    else {
        Alert.alert(
          'Empty shopping list...', 
          'Please enter one or more items.',
          [
            {text: 'Got it'}
          ],
          Platform.OS === 'android' && {
            cancelable: true
          }
        );
    }
  }

  const clearItems = () => {
    const alertTitle = 'Think twice...';
    const alertSubtitle = 'Are you sure you want to delete all shopping items?';
    const cancelBtnTxt = 'Cancel';
    const deleteBtnTxt = 'delete all';

    Alert.alert (
      alertTitle, 
      alertSubtitle,
      [
        {
          text: cancelBtnTxt,
          style: "cancel",
        },
        {
          text: deleteBtnTxt,
          onPress: () => setItems([]),
          style: 'destructive'
        }
      ],
      Platform.OS === 'android' && {
        cancelable: true,
      }
    );
  }

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
  },
  desctructive: {
    color: 'red'
  }
});

export default App;
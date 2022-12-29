import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

import React, { useState } from 'react';
import {View, StyleSheet, FlatList, Alert, StatusBar} from 'react-native';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import ClearItems from './components/ClearItems';

const App = () => {
  const KEY = '@storage_Key';


  const [items, setItems] = useState([]);

  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id != id));

  }

  const addItem = (text) => {
    if (text !== '') {
      setItems(prevItems => [{id: uuid.v4(), text}, ...prevItems]);
      setItems(prevItems => prevItems.sort((a, b) => a.text.localeCompare(b.text)));
    }
    else
      Alert.alert('Nothing to add. Please enter an item.')
  }

  const clearItems = () => {
    Alert.alert('Think twice...', 
      'Are you sure you want to delete all shopping items?',
      [
        {
          text: 'Cancel',
          style: "cancel",
        },
        {
          text: 'delete all',
          onPress: () => setItems([]),
          style: 'destructive'
        }
      ],
      {
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
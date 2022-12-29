import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome';

const AddItem = ({addItem, items}) => {
    const [text, setText] = useState('');

    const onChange = (textValue) => setText(textValue);
    const clearTextInput = () => setText(''); 
    
    return (
        <View>
            <TextInput placeholder='Add item...' style={styles.input} onChangeText={onChange} value={text}/>
            <TouchableOpacity style={styles.btn} onPress={() => {
                addItem(text);
                clearTextInput();
            }} autoCorrect={false}>
                <Text style={styles.btnText}>
                    <Icon name='plus' size={20} />Add Item
                </Text>
            </TouchableOpacity>
            {!items.length && <Text style={styles.noItems}>No items</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center'
    },
    noItems: {
        color: 'red',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20,
        alignSelf: 'center'
    }
});

export default AddItem;
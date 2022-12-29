import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ClearItems = ({clearItems}) => {
    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={() => clearItems()} autoCorrect={false}>
                <Text style={styles.btnText}>Clear Items</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#f66',
        padding: 9,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 30

    },
    btnText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default ClearItems;
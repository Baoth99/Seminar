import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import ProductForm from './ProductForm';

const ProductFunction = () => {
    return (
        <View style={styles.container}>
            <Button icon="camera" mode="contained" style={styles.button} onPress={() => console.log('Pressed')}>
                Press me
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10
    },
    button: {
      flex: 1,
      margin: 5
    }
  });
export default ProductFunction;

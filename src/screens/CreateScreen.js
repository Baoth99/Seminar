import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import ProductForm from '../components/ProductForm';

const CreateScreen = ({ navigation }) => {
    return (
        <>
            <ProductForm/>
            <View style={styles.container}>
                <Button mode="contained"
                        styles={styles.goToHomeButton}
                        onPress={() => navigation.navigate('Home')}>
                            Go to home
                        </Button>
            </View>
            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goToHomeButton: {
        borderRadius: 10,
        justifyContent: 'center',
    }
})

export default CreateScreen;

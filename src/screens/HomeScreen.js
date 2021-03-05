import React from 'react';
import ProductTable from '../components/ProductTable';

import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const reload = React.useRef();

    const handleReload = () => {
        console.log('reload');
         reload.current.handleReload();        
    }

    return (
        <>
            <ProductTable ref={reload}/>
            <View style={styles.container}>
                <Button  mode="contained" 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Create Product')}>
                    Create Product
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => handleReload()}>
                    Reload
                </Button>
                
            </View>
            
        </>
        
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 20
    },
    button: {
      flex: 1,
      margin: 5
    }
  });

export default HomeScreen;

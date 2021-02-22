import React from 'react';
import { DataTable, Button, ActivityIndicator} from 'react-native-paper';
import { StyleSheet , ScrollView} from 'react-native';
import ProductRow from './ProductRow';
import {ApiGetNoParams} from '../api/ApiCaller';
import { createStackNavigator } from '@react-navigation/stack';

const ProductTable = () => {
    const [data, setData] = React.useState([]);
    
    const featchData = async () => {
        await ApiGetNoParams('product').then(res => {
            setData(res.data);
        }).catch(err => {
            console.log(err);
        })
    }


    React.useEffect(() => {
        featchData();
    }, [0])


    return (
        <ScrollView style={{marginTop: -1}}>
            <DataTable style={styles.container}>
                <DataTable.Header>
                    <DataTable.Title>Code</DataTable.Title>
                    <DataTable.Title numeric>Name</DataTable.Title>
                    <DataTable.Title numeric>Quantity</DataTable.Title>
                    <DataTable.Title numeric>Origin</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                </DataTable.Header>
                {data.map((item, index) => <ProductRow product={item} key={index}/>)}
                
            </DataTable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 10
    },
  });

export default ProductTable;

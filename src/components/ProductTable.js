import React, {forwardRef, useImperativeHandle} from 'react';
import { DataTable, Button, ActivityIndicator} from 'react-native-paper';
import { StyleSheet , ScrollView} from 'react-native';
import ProductRow from './ProductRow';
import {ApiGetNoParams} from '../api/ApiCaller';
import { useIsFocused } from '@react-navigation/native';


const ProductTable = forwardRef((props, ref) => {
    const isFocused = useIsFocused();
    const [data, setData] = React.useState(() => {
        return [];
    });

    const featchData = async () => {
        await ApiGetNoParams('product').then(res => {
            setData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    React.useEffect(() => {
        featchData();
    },[isFocused])

    useImperativeHandle(
        ref,
        () => ( {
            async handleReload() {
                await featchData();
            }
        }),
    )



    


    return (
        <ScrollView style={{marginTop: -1}}>
            <DataTable style={styles.container}>
                <DataTable.Header>
                    <DataTable.Title>No.</DataTable.Title>
                    <DataTable.Title>Code</DataTable.Title>
                    <DataTable.Title numeric>Name</DataTable.Title>
                    <DataTable.Title numeric>Quantity</DataTable.Title>
                    <DataTable.Title numeric>Origin</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                </DataTable.Header>
                {data.map((item, index) => <ProductRow product={item} no={index + 1} key={index}/>)}
                
            </DataTable>
        </ScrollView>
    );
})

const styles = StyleSheet.create({
    container: {
      padding: 10
    },
  });

export default ProductTable;

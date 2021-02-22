import React from 'react';
import { DataTable, Button, TextInput, Dialog, Portal, ActivityIndicator } from 'react-native-paper';
import {TouchableOpacity, StyleSheet, View } from 'react-native';
import {ApiPut, ApiDelete} from '../api/ApiCaller';
import Toast from 'react-native-tiny-toast';


const ProductRow = ({product}) => {
    const [visible, setVisible] = React.useState(false);
    const {id,code, name, quantity, origin, price} = product;
    const [data, setData] = React.useState(product)


    const productDetail = () => {
        setVisible(true)
    }

    const onHandleUpdate = async () => {
        Toast.show('This is a default toast');
        await ApiPut(`product/${id}`, data).then(res => {
            console.log(res.status);
        })
        setVisible(false);
    }

    const onHandleDelete = async () => {
        await ApiDelete(`product/${id}`).then(res => {
            console.log(res.status);
        })

        setVisible(false)
    }
    return (
        <>
            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title>Product Detail</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.container}>
                        <TextInput label="Code" value={data.code} style={styles.field} disabled/> 
                        <TextInput label="Name" value={data.name} style={styles.field} 
                                                onChangeText={(val) => setData({...data, name: val})}/> 
                        <TextInput label="Origin" value={data.origin} style={styles.field} 
                                                onChangeText={(val) => setData({...data, origin: val})}/> 
                        <TextInput label="Quantity" style={styles.field} value={data.quantity.toString()} 
                                                onChangeText={(val) => setData({...data, quantity: val})}/> 
                        <TextInput label="Price" style={styles.field} value={data.price.toString()} 
                                                onChangeText={(val) => setData({...data, price: val})}/> 
                    </View>    
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => onHandleDelete()}>Delete</Button>
                    <Button onPress={() => onHandleUpdate()}>Update</Button>
                    <Button onPress={() => setVisible(false)}>Done</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
            <TouchableOpacity onPress={() => productDetail()}>
                <DataTable.Row>
                    <DataTable.Cell>{code}</DataTable.Cell>
                    <DataTable.Cell numeric>{name}</DataTable.Cell>
                    <DataTable.Cell numeric>{quantity}</DataTable.Cell>
                    <DataTable.Cell numeric>{origin}</DataTable.Cell>
                    <DataTable.Cell numeric>{price}</DataTable.Cell>
                </DataTable.Row>
            </TouchableOpacity>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: 300
    },
    field: {
        marginBottom: 10,
        borderRadius: 10
    },
    childContainer: {
      marginBottom: 30,
      flexDirection: 'row'
    },
    childField: {
      marginBottom: 10,
      flex: 1,
      margin: 5
    },
    button: {
      flex: 1,
      margin: 5
    }
  });

export default ProductRow;
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button , Dialog, Portal, Paragraph, ActivityIndicator} from 'react-native-paper';
import {IsEmpty} from '../utils/Validation';
import {ApiPost} from '../api/ApiCaller';

const ProductForm = ({navigation}) => {

    const errorMessage = {
      title: 'Error',
      content: 'Fields are empty !'
    }

    const errorCreate = {
      title: 'Error',
      content: 'Create product unsuccessfully !'
    }

    const successMessage = {
      title: 'Success',
      content: 'Create new Product Successfully !'
    }

    const initialData = {
      code: '',
      name: ''  ,
      quantity: '',
      price: '',
      origin: ''
    }

    const [data, setData] = React.useState(initialData);
    const [modelVisible, setModelVisible] = React.useState(false);
    const [modelTitle, setModelTitle] = React.useState(errorMessage);
    const [waiting, setWaiting] = React.useState(false);

    const onHandleCreate = async () => {
      console.log(data)
      if(IsEmpty(data.code) || IsEmpty(data.name)
        ||IsEmpty(data.origin) || IsEmpty(data.price) || IsEmpty(data.quantity)) {
          setModelTitle(errorMessage);
          setModelVisible(true);
      } else {
        setWaiting(true);
        await ApiPost('product', data).then(res => {
          if(res.status === 201) {
            setModelTitle(successMessage)
            setModelVisible(true);
            setData(initialData);
          }
        }).catch(err => {
          console.log(err);
          setModelTitle(errorCreate)
          setModelVisible(true);
        });
        setWaiting(false);
      }
    }

    return (
        <View style={styles.container}>
            <TextInput label="Code" style={styles.field} value={data.code} onChangeText={val => setData({...data, code: val})}/> 
            <TextInput label="Name"style={styles.field} value={data.name} onChangeText={val => setData({...data, name: val})}/>
            <View style={styles.childContainer}>
                <TextInput label="Quantity" style={styles.childField} value={data.quantity} onChangeText={(val) => setData({...data, quantity: val})}/>
                <TextInput label="Price" style={styles.childField} value={data.price} onChangeText={(val) => setData({...data, price: val})}/>
            </View>
            <TextInput label="Origin" style={styles.field} value={data.origin} onChangeText={(val) => setData({...data, origin: val})}/>


            <Portal>
              <Dialog visible={waiting}>
                <ActivityIndicator animating={waiting} size='large' style={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}/>  
              </Dialog>
            </Portal>
            <ActivityIndicator animating={false} size='large' />  


            <View style={styles.childContainer}>
              <Button mode="contained" style={styles.button} onPress={() => onHandleCreate()}>
                Create
              </Button>
              <Button mode="contained" style={styles.button} onPress={() => setData(initialData)}>
                Clear
              </Button>
            </View>
          

            <Portal>
              <Dialog visible={modelVisible} onDismiss={() => setModelVisible(false)}>
                <Dialog.Title>{modelTitle.title}</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{modelTitle.content}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setModelVisible(false)}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      margin:30,
      padding: 10,
      height: 450,
      width: 350,
      backgroundColor: '#775B82',
      justifyContent: 'center',
      borderRadius: 10
    },
    field: {
        marginBottom: 10,
        borderRadius: 10
    },
    childContainer: {
      flexDirection: 'row',
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

export default ProductForm;

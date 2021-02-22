import axios from 'axios';
import {baseUrl} from '../enviroment';

export const ApiGetNoParams = async (endpoint) => {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/${endpoint}`,
    }).catch(err => {
        console.log(err);
    })
}


export const ApiGet = async (endpoint, parameters) => {
    return await axios({
        method: 'GET',
        url: `${baseUrl}/${endpoint}`,
        params: parameters
    })``
}


export const ApiPost = async (endpoint, body) => {
    return await axios({
        method: 'POST',
        url: `${baseUrl}/${endpoint}`,
        data: body
    })
}

export const ApiPut = async (endpoint, body) => {
    return await axios({
        method: 'PUT',
        url: `${baseUrl}/${endpoint}`,
        data: body
    })
}


export const ApiDelete = async (endpoint) => {
    return await axios({
        method: 'DELETE',
        url: `${baseUrl}/${endpoint}`,
    })
}


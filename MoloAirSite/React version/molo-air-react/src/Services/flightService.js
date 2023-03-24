import axios from 'axios';
import React from 'react';

export async function getAllFlights(){
    try{
        const response = await axios.get('http://localhost:8202/flights');
        console.log('response: ', response.data)
        return response.data;
    } catch(error){
        return [];
    }
}


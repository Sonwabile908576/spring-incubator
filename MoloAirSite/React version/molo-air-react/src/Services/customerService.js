import axios from 'axios';

export async function getAllCustomers(){
    try{
        const response = await axios.get('http://localhost:8201/customers');
        return response.data;
    } catch(error){
        return [];
    }
}

export async function makeCustomer(customer){
    try{
        const response = await axios.post('http://localhost:8201/customers', customer);
        return response.data;
    } catch(error){
        return [];
    }
}
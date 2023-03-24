import axios from 'axios';

export async function makeBooking(booking){
    try{
        const response = await axios.post('http://localhost:8200/bookings', booking);
        return response.data;
    } catch(error){
        return [];
    }
}
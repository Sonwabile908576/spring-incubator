import { Component, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Box, TextField, InputAdornment, Button } from "@mui/material";
import './booking.css';
import { makeBooking } from "../Services/bookingService";

class Booking extends Component{
render(){
    return (
            <>
                <BookingPage/>
            </>
        )
    }
}

function BookingPage(){
    const[bookingMade, setBookingMade] = useState(false);
    const[customer, setCustomer] = useState([])
    const[bookingResponse, setBookingResponse] = useState([])
    const[theFlight, setTheFlight] = useState([])
    const[theNumber, setTheNumber] = useState(1);
    const[thePrice, setThePrice] = useState(theFlight.seatCost);

    const [bookingRequest, setBookingRequest] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setBookingRequest(location.state.booking);
        setCustomer(JSON.parse(location.state.customer));
        setTheFlight(JSON.parse(location.state.flight))
    }, [location]);

    useEffect(() => {
        setThePrice(theFlight.seatCost * theNumber);
    }, [theNumber]);

    const seatPrice = e => {
        e.preventDefault();
        setTheNumber(e.target.value)
    }

    const bookFlight = async () => {
        let response = await makeBooking(bookingRequest)
        if(response !== null && response !== []){
            setBookingMade(true);
            setBookingResponse(response.data)
        } else {
            alert("something went wrong")
        }
        
    }


    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Card className="bigCard">
                    {bookingMade ? "View Booking" : "Finalize your Booking"}
                    <Box className="cardsContainer">
                        <Card className="customerCard">
                            <h2>Customer Details</h2>
                            <p><strong>CustomerID: </strong>{customer.id}</p>
                            <p><strong>Username: </strong>{customer.username}</p>
                            <p><strong>FirstName: </strong>{customer.firstName}</p>
                            <p><strong>LastName: </strong>{customer.lastName}</p>
                            <p><strong>PassportNumber: </strong>{customer.passportNumber}</p>
                            <p><strong>Email: </strong>{customer.email}</p>
                            <p><strong>PhoneNumber: </strong>{customer.phoneNumber}</p>
                        </Card>
                        <Card className="flightCard">
                            <h2>Flight Details</h2>
                            <p><strong>FlightID: </strong>{theFlight.id}</p>
                            <p><strong>FlightNumber: </strong>{theFlight.flightNumber}</p>
                            <p><strong>Origin: </strong>{theFlight.origin}</p>
                            <p><strong>Destination: </strong>{theFlight.destination}</p>
                            <p><strong>Departure Time: </strong>{formatMyDate(theFlight.departureTime)}</p>
                            <p><strong>Arrival Time: </strong>{formatMyDate(theFlight.arrivalTime)}</p>
                            <p><strong>Seats Available: </strong>{theFlight.seatsAvailable}</p>
                            <p><strong>Number of Seats to purchase: </strong></p>
                            <form>
                                <input type="number" min="1" step="1" onChange={seatPrice} value={theNumber}/>
                            </form>
                            <p><strong>{bookingMade ? "Price paid: ": "Price to pay: "}</strong>R{thePrice}</p>
                        </Card>
                        {bookingMade ? (
                            <Card className="bookingCard">
                                <h2>Booking Details</h2>
                                <p><strong>BookingID: </strong>{bookingResponse.bookingId}</p>
                                <p><strong>CustomerID: </strong>{bookingResponse.customerId}</p>
                                <p><strong>FlightID: </strong>{bookingResponse.flightId}</p>
                                <p><strong>Reference Number: </strong>{bookingResponse.referenceNumber}</p>
                            </Card>
                        ) : <div></div>}
                        <Button class="myBtn" onClick={() => bookFlight}>{bookingMade ? "Go to profile" : "Confirm"}</Button>
                    </Box>
                    
                    
                </Card>
            </Box>
        </>
    )
}

function formatMyDate(dateTimeString){
    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    const formattedTime = new Date(dateTimeString).toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    const formatted = formattedDate + ' ' + formattedTime;
    return formatted;
}


export default Booking;
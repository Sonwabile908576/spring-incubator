import { Component, useEffect, useRef, useState } from "react";
import './flights.css';
import { Table, TableBody, Box, TableContainer, TableCell, TableHead, DialogActions, TableRow, Paper, Tab, Tabs, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import { AirplaneTicket } from "@mui/icons-material";
import { getAllCustomers, makeCustomer } from '../Services/customerService'
import PropTypes from 'prop-types';
import { makeBooking } from "../Services/bookingService";


class Flights extends Component{
    render(){
        return (
            <>
                <FlightsTable/>
            </>
        )
    }
}

function FlightsTable(){

    const navigate = useNavigate();

    //last minute lazy patch up
    const [specificFlight, setSpecific] = useState([]);

    const [flights, setFlights] = useState([]);
    const location = useLocation();

    const[flightIdentification, setFlightIdentification] = useState(0);

    useEffect(() => {
        const flightsList = JSON.parse(location.state);
        setFlights(flightsList);
    }, [location]);

    // Dialog opening methods
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    function handleClickOpen (){
        setOpen(true);
    }

    function saveFlight(flightID){
        setFlightIdentification(flightID);
    }

    // Dialog Tab values
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    // Form detail things
    const [username, setUsername] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const submitForm = async e => {
        e.preventDefault();
        const customersList = await getAllCustomers();
        for(const arrayItem of Object.entries(customersList)){
            for(const person of arrayItem){
                /* if value === 0, check for name in customer list and login else register customer and book flight */
                if(value === 0){
                    if(person.username === username && person.email === email){
                        let bookingRequest = { customerId: person.id, flightId: flightIdentification}
                            navigate("/bookings", {state: { booking: bookingRequest, customer: JSON.stringify(person), flight: JSON.stringify(specificFlight)}});
                    }
                    else{
                        console.log("invalid login details");
                    }
                }
                else{//make customer
                    let customer = { "id": null, "username": username, "firstName": firstName, "lastName": lastName, "passportNumber": passportNumber, "email": email, "phoneNumber": phoneNumber }
                    let CustomerResponse =  await makeCustomer(customer);
                    if(CustomerResponse !== [] && CustomerResponse !== null){
                        let bookingRequest = { customerId: CustomerResponse.id, flightId: flightIdentification}
                        navigate("/bookings", {state: { booking: bookingRequest, customer: JSON.stringify(CustomerResponse), flight: JSON.stringify(specificFlight)}})
                    }
                }
            }
        }
        setOpen(false);
    }

    return (
        <div className="thePage">
            <TableContainer className="centerTable" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Flight ID</b></TableCell>
                            <TableCell><b>Flight Number</b></TableCell>
                            <TableCell><b>Origin</b></TableCell>
                            <TableCell><b>Destination</b></TableCell>
                            <TableCell><b>Departure Time</b></TableCell>
                            <TableCell><b>Arrival Time</b></TableCell>
                            <TableCell><b>Seats Available</b></TableCell>
                            <TableCell><b>Seat Cost</b></TableCell>
                            <TableCell><b>Make a Booking</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {flights.map((flight) => (
                        <TableRow>
                            <TableCell>{flight.id}</TableCell>
                            <TableCell>{flight.flightNumber}</TableCell>
                            <TableCell>{flight.origin}</TableCell>
                            <TableCell>{flight.destination}</TableCell>
                            <TableCell>{formatMyDate(flight.departureTime)}</TableCell>
                            <TableCell>{formatMyDate(flight.arrivalTime)}</TableCell>
                            <TableCell>{flight.seatsAvailable}</TableCell>
                            <TableCell>{flight.seatCost}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    id="bookButton"
                                    onClick={() => {handleClickOpen(); saveFlight(flight.id); setSpecific(flight);}}
                                >
                                    <AirplaneTicket/>
                                    Book
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {open && (
                <>
                    <div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Customer Login/ Registration</DialogTitle>
                            <DialogContent>
                                <Box>
                                    <Tabs value={value} onChange={handleChange}>
                                        <Tab label="Login"/>
                                        <Tab label="Register"/>
                                    </Tabs>
                                    {value === 0 && (
                                        <>
                                            <form className="dialogForm">
                                                <br></br>
                                                <TextField label="Username" onChange={event => setUsername(event.target.value)}/>
                                                <br></br>
                                                <TextField label="Email Address" onChange={event => setEmail(event.target.value)}/>
                                                <br></br>
                                            </form>
                                        </>
                                        
                                        
                                    )}
                                    {value === 1 && (
                                        <>
                                            <form className="dialogForm">
                                                <br></br>
                                                <TextField label="Username" onChange={event => setUsername(event.target.value)}/>
                                                <br></br>
                                                <TextField label="First Name" onChange={event => setFirstname(event.target.value)}/>
                                                <br></br>
                                                <TextField label="Last Name" onChange={event => setLastName(event.target.value)}/>
                                                <br></br>
                                                <TextField label="Passport Number" onChange={event => setPassportNumber(event.target.value)}/>
                                                <br></br>
                                                <TextField label="Email" onChange={event => setEmail(event.target.value)}/>
                                                <br></br>
                                                <TextField label="Phone Number" onChange={event => setPhoneNumber(event.target.value)}/>
                                                <br></br>
                                            </form>
                                        </>
                                    )}
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitForm} variant="contained" className="loginBtn">
                                    {value === 0 ? "Login" : "Register"}
                                </Button>
                                <Button onClick={handleClose}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </>
            )}

        </div>
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

export default Flights;
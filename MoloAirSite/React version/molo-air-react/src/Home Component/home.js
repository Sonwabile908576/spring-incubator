import { Component } from "react";
import { Card, Box, TextField, InputAdornment, Button } from "@mui/material";
import { FlightTakeoff, FlightLand, Search } from "@mui/icons-material";
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './home.css'
import { getAllFlights } from "../Services/flightService"

class Home extends Component{
    render(){
        return (
            <>
                <SearchCard props={this.props}/>
            </>
        )
    }
}

function SearchCard(props){
    const navigate = useNavigate();

    const goToFlights = async () => {
      
      const searchFlightRequest = null;
      console.log('made it to the part just before calling the search method in the service')
      const response = await getAllFlights()

      if (response){
        alert("Search Successful");
        navigate("/flights", {state: JSON.stringify(response)});
      }
    }


    return (
        <div className="thePage">
            <Card className="search">
                <h1>Search for a flight</h1>
                <form>
                    <Box>
                        <TextField id="outlined-basic" label="Days To Departure" variant="outlined" />
                    </Box>
                    <br></br>
                    <Box>
                        <TextField 
                            id="outlined-basic" 
                            label="Origin" 
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FlightTakeoff />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <br></br>
                    <Box>
                        <TextField 
                            id="outlined-basic" 
                            label="Destination" 
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FlightLand />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <br></br>
                    <Box>
                        <Button 
                            variant="contained"
                            id="searchButton"
                            onClick={goToFlights}
                            >
                            <Search/>
                            Search
                        </Button>
                    </Box>
                </form>
            </Card>
        </div>
        
    )
}

export default Home;
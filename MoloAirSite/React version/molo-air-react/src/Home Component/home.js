import { Component } from "react";
import { Card, Box, TextField, InputAdornment, Button } from "@mui/material";
import { FlightTakeoff, FlightLand, Search } from "@mui/icons-material";
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import './home.css'

class Home extends Component{
    render(){
        return (
            SearchCard()
        )
    }
}

function SearchCard(){

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
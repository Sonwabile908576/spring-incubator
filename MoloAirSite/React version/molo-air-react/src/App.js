import './App.css';
import Home from './Home Component/home.js';
import Profile from './Profile Component/profile';
import Flights from './Flights Component/flights';
import Booking from './Booking Component/booking'
import { Toolbar, IconButton, Button} from '@mui/material';
import { Person, ConnectingAirports } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header/>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/flights" element={<Flights />} />
                <Route exact path="/bookings" element={<Booking />} />
            </Routes>
      </Router>
    </>
  );
}

// extrapolated functions

function Header(){
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate("/profile");
    };
  

  return (
    <Toolbar className='toolbar'>
      <div>
        <IconButton>
          <ConnectingAirports fontSize='large'/>
          Molo Air
          </IconButton>
      </div>
      <span style={{flexGrow: 1}}></span>
      <div>
        <Button onClick={handleLogin}>
          <Person/>
          Login
        </Button>
      </div>
    </Toolbar>
  )
}

export default App;

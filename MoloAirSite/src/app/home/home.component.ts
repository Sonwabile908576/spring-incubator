import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFlightRequest } from '../models/SearchFlightRequest';
import { SearchType } from '../models/SearchType';
import { FlightService } from '../services/Flight/flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  DaysToDepature: Number | undefined;
  DepartureDateFrom: Date | undefined;
  DepartureDateTo: Date | undefined;
  Origin: String | undefined;
  Destination: String | undefined;

  constructor(public flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
  }

  changeDateFormat(event: any) {
    const data = event;
    this.DepartureDateFrom = data;
  }

  searchFlights(){

    if(this.DaysToDepature != null ){
      const searchFlightRequest = new SearchFlightRequest(SearchType.DAYS_TO_DEPARTURE_SEARCH, this.DaysToDepature, this.DepartureDateFrom, this.DepartureDateTo, this.Origin, this.Destination);
      this.flightService.searchFlights(searchFlightRequest).subscribe(
        (response) => {
          if(response != null){
            alert("Search successful");
            this.router.navigate(['/flights'], { queryParams: { flightsList: JSON.stringify(response.body) } });
          }
        });
    }
    else if(this.DepartureDateFrom != null && this.DepartureDateTo != null){
      const searchFlightRequest = new SearchFlightRequest(SearchType.DEPARTURE_TIME_SEARCH, this.DaysToDepature, this.DepartureDateFrom, this.DepartureDateTo, this.Origin, this.Destination);
      this.flightService.searchFlights(searchFlightRequest).subscribe(
        (response) => {
          if(response != null){
            alert("Search successful");
            this.router.navigate(['/flights'], { queryParams: { flightsList: JSON.stringify(response.body) } });
          }
        });
    }
    else if(this.Origin != null && this.Destination != null){
      const searchFlightRequest = new SearchFlightRequest(SearchType.ORIGIN_DESTINATION_SEARCH, this.DaysToDepature, this.DepartureDateFrom, this.DepartureDateTo, this.Origin, this.Destination);
      this.flightService.searchFlights(searchFlightRequest).subscribe(
        (response) => {
          if(response != null){
            alert("Search successful");
            this.router.navigate(['/flights'], { queryParams: { flightsList: JSON.stringify(response.body) } });
          }
        });
    }
    else{
      this.flightService.getFlights().subscribe(
        (response) => {
          if(response != null){
            alert("Search successful");
            console.log(JSON.stringify(response.body))
            this.router.navigate(['/flights'], { queryParams: { flightsList: JSON.stringify(response.body) } });
          }
        });
    }
  }

}

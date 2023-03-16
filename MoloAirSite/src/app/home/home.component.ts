import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/Flight/flight.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  DaysToDepature: number | undefined;
  DepartureDate: Date | undefined;

  constructor(public flightService: FlightService) { }

  ngOnInit(): void {
  }

  changeDateFormat(event: any) {
    const data = event;
    this.DepartureDate = data;
  }

}

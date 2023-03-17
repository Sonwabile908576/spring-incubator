import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from '../models/Flight';
import { FlightService } from '../services/Flight/flight.service';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  displayedColumns: string[] = ['flightId','flightNumber', 'origin', 'destination', 'departureTime', 'arrivalTime', 'seatsAvailable', 'seatCost', 'actions'];
  dataSource = new MatTableDataSource<Flight>();

  constructor(private flightService: FlightService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe(
      response => {
        if (response.body != null) { // add a null check here
          this.dataSource.data = response.body;
        }
      }
    );
  }

  bookFlight(flightId: number) { 
    let dialogRef = this.dialog.open(LoginDialogComponent, { data: { flightId: flightId }});
    
  }
  
}

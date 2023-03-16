import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    flightNumber: new FormControl('', Validators.required),
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
    arrivalTime: new FormControl('', Validators.required),
    seatsAvailable: new FormControl('', Validators.required),
    seatCost: new FormControl('', Validators.required)
  });

  getFlights(): Observable<HttpResponse<Flight[]>> {
    return this.http.get<Flight[]>('http://localhost:8202/flights', { observe: 'response' });
  }
}

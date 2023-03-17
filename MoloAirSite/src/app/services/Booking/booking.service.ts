import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/Booking';
import { NewBookingRequest } from 'src/app/models/NewBookingRequest';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private url = 'http://localhost:8200/bookings'

  constructor(private http: HttpClient) { }

  createBooking(newBookingRequest: NewBookingRequest): Observable<HttpResponse<Booking>> {
    return this.http.post<Booking>(this.url, newBookingRequest, { observe: 'response' });
  }
}

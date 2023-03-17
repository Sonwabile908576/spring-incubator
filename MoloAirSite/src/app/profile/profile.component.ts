import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../models/Booking';
import { Customer } from '../models/Customer';
import { BookingService } from '../services/Booking/booking.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer!: Customer;
  bookings: Booking[] | undefined;


  constructor(private route: ActivatedRoute, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customer = JSON.parse(params['customer']);
    });

    this.bookingService.getBookings().subscribe(
      response => {
        if (response.body != null) { 
          this.bookings = response.body;
          console.log(this.bookings)
          this.bookings = this.bookings.filter(booking => booking.customerId == this.customer.id);

          console.log(this.bookings)
        }
      });
  }


}

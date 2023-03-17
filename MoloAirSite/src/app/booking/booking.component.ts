import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/Customer';
import { NewBookingRequest } from '../models/NewBookingRequest';
import { BookingService } from '../services/Booking/booking.service';
import { CustomerService } from '../services/Customer/customer.service';
import { FlightService } from '../services/Flight/flight.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingMade = false;

  customer: Customer | undefined;
  customerId: Number = 0;
  username: String = '';
  firstName: String = '';
  lastName: String = '';
  passportNumber: String = '';
  email: String = '';
  phoneNumber: String = '';

  bookingId: Number = 0;
  referenceNumber: String = '';

  flightId: Number = 0;
  flightNumber: String = '';
  origin: String = '';
  destination: String = '';
  departureTime: Date = new Date();
  arrivalTime: Date = new Date();
  seatsAvailable: Number = 0;
  seatCost: Number = 0;

  constructor(private dialog: MatDialog,private route: ActivatedRoute, private flightService: FlightService, private customerService: CustomerService, private bookingService: BookingService, private router: Router) { }

  /*
  - after all these stuff, make customer profile page
  - show customer bookings
  - fix flight search feature
  - sleep - we dont do that :(

  
  */

  myForm = new FormGroup({
    myNumber: new FormControl(1)
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['customerId'];
      this.flightId = params['flightId'];
    });
    this.getflightDetails();
    this.getCustomerDetails();

    
    
  }

  getflightDetails() {
    this.flightService.getFlightById(this.flightId).subscribe(
      (response) => {
        if(response.body != null) {
          this.flightNumber = response.body.flightNumber;
          this.origin = response.body.origin;
          this.destination = response.body.destination;
          this.departureTime = response.body.departureTime;
          this.arrivalTime = response.body.arrivalTime;
          this.seatsAvailable = response.body.seatsAvailable;
          this.seatCost = response.body.seatCost; 
        }
      }
    );
  }

  getCustomerDetails() {
    this.customerService.getCustomerById(this.customerId).subscribe(
      (response) => {
        if(response.body != null) {
          this.username = response.body.username;
          this.firstName = response.body.firstName;
          this.lastName = response.body.lastName;
          this.passportNumber = response.body.passportNumber;
          this.email = response.body.email;
          this.phoneNumber = response.body.phoneNumber;

          this.customer = new Customer(this.customerId, this.username, this.firstName, this.lastName, this.passportNumber, this.email, this.phoneNumber);
        }
      }
    );
  }

  makeBooking() {
    if(this.bookingMade == false)
    {
      const newBookingRequest = new NewBookingRequest(this.customerId, this.flightId);

      this.bookingService.createBooking(newBookingRequest).subscribe(
        (response) => {
          if(response.body != null) {
            this.bookingId = response.body.bookingId;
            this.referenceNumber = response.body.referenceNumber;

            let dialogRef = this.dialog.open(SuccessDialogComponent);

            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
              this.bookingMade = true;
            });
          }
        }
      );
    }
    else
    {
      this.router.navigate(['/profile'], { queryParams: { customer: JSON.stringify(this.customer) }})
    }
  }

  seatPrice(): any {
    if(this.myForm.value.myNumber != null){
      return this.myForm.value.myNumber * this.seatCost.valueOf();
    }
  }
}

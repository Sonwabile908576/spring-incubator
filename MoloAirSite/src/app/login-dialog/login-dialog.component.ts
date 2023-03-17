import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/Customer/customer.service';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

    constructor(private customerService: CustomerService, private router: Router, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<LoginDialogComponent>) { }

    loginForm : FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    registerForm : FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      passportNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
    });

    onRegister() {
      if(this.data.flightId == 0){
        const customer = new Customer(null, this.registerForm.value.username, this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.passportNumber, this.registerForm.value.email, this.registerForm.value.phoneNumber);
        this.customerService.registerCustomer(customer).subscribe(
          response => {
            if (response.body != null) {
              console.log("success");
              console.log(response.body.id);
  
              this.router.navigate(['/profile'], { queryParams: { customer: JSON.stringify(customer) }})
              this.dialogRef.close();
            }
          }
        );
      }
      else{
        const customer = new Customer(null, this.registerForm.value.username, this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.passportNumber, this.registerForm.value.email, this.registerForm.value.phoneNumber);
        this.customerService.registerCustomer(customer).subscribe(
          response => {
            if (response.body != null) {
              console.log("success");
              console.log(response.body.id);
  
              this.router.navigate(['/booking', { queryParams: { customerId: response.body.id, flightId: this.data.flightId }}]);
              this.dialogRef.close();
            }
          }
        );
      }
      
    }

    //A LOT NEEDS TO BE CLEANED UP AND REFACTORED HERE :(
    onLogin(){
      if(this.data.flightId == 0){
        const username = this.loginForm.value.username;
        const email = this.loginForm.value.email; 

        this.customerService.getAllCustomers().subscribe(
          response => {
            if (response.body != null) {
              let customers: Customer[];
              customers = response.body;
  
              for(let customer of customers){
                if(customer.username == username && customer.email == email)
                {
                  console.log(customer.id);
                  this.router.navigate(['/profile'], { queryParams: { customer: JSON.stringify(customer) }})
                  this.dialogRef.close();
                }
                else{
                  this.dialog.open(ErrorDialogComponent);
                }
              }
            }
          }
        );
        
        
      }
      else{
        const username = this.loginForm.value.username;
        const email = this.loginForm.value.email; 
        
        console.log(`so itchy: ${this.data.flightId}`)
  
        this.customerService.getAllCustomers().subscribe(
          response => {
            if (response.body != null) {
              let customers: Customer[];
              customers = response.body;
  
              for(let customer of customers){
                if(customer.username == username && customer.email == email)
                {
                  console.log(customer.id);
                  this.router.navigate(['/booking'], { queryParams: { customerId: customer.id, flightId: this.data.flightId }});
                  this.dialogRef.close();
                }
                else{
                  this.dialog.open(ErrorDialogComponent);
                }
              }
            }
          }
        );
      }
      
    }
}

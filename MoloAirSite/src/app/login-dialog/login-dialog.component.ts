import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/Customer/customer.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  
    constructor(private customerService: CustomerService) { }

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
      const customer = new Customer(null, this.registerForm.value.username, this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.passportNumber, this.registerForm.value.email, this.registerForm.value.phoneNumber);
      this.customerService.registerCustomer(customer).subscribe(
        response => {
          if (response.body != null) {
            console.log(response.body);
          }
        }
      );
    }

    onLogin(){

    }
}

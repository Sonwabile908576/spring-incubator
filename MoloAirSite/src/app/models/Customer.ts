export class Customer {
    customerId: number;
    username: String;
    firstName: String;
    lastName: String;
    passportNumber: String;
    email: String;
    phoneNumber: String;

    constructor(customerId: number, username: String, firstName: String, lastName: String, passportNumber: String, email: String, phoneNumber: String){
        this.customerId = customerId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passportNumber = passportNumber;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
export class Customer {
    id: Number | null;
    username: String;
    firstName: String;
    lastName: String;
    passportNumber: String;
    email: String;
    phoneNumber: String;

    constructor(id: Number | null, username: String, firstName: String, lastName: String, passportNumber: String, email: String, phoneNumber: String){
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passportNumber = passportNumber;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
export class Booking{
    bookingId: number;
    customerId: number;
    flightNumber: number;
    referenceNumber: String;

    constructor(bookingId: number, customerId: number, flightNumber: number, referenceNumber: String){
        this.bookingId=bookingId;
        this.customerId = customerId;
        this.flightNumber = flightNumber;
        this.referenceNumber = referenceNumber;
    }

}
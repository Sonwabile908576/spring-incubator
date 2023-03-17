export class Booking{
    bookingId: Number;
    customerId: Number;
    flightId: Number;
    referenceNumber: String;

    constructor(bookingId: Number, customerId: Number, flightId: Number, referenceNumber: String){
        this.bookingId=bookingId;
        this.customerId = customerId;
        this.flightId = flightId;
        this.referenceNumber = referenceNumber;
    }

}
export class NewBookingRequest{
    customerId: Number;
    flightId: Number;

    constructor(customerId: Number, flightId: Number){
        this.customerId = customerId;
        this.flightId = flightId;
    }
}
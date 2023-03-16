export class Flight{
    id: number;
    flightNumber: String;
    origin: String;
    destination: String;
    departureTime: Date;
    arrivalTime: Date;
    seatsAvailable: Number;
    seatCost: Number;

    constructor(id: number, flightNumber: String, origin: String, destination: String, departureTime: Date, arrivalTime: Date, seatsAvailable: Number, seatCost: Number){
        this.id = id;
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.seatsAvailable = seatsAvailable;
        this.seatCost = seatCost;
    }
}
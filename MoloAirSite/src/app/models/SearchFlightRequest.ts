import { SearchType } from "./SearchType";

export class SearchFlightRequest{
    searchType: SearchType;
    daysToDeparture: Number | undefined;
    departureDateFrom: Date | undefined;
    departureDateTo: Date  | undefined;
    origin: String | undefined;
    destination: String | undefined;

    constructor(searchType: SearchType, daysToDeparture: Number | undefined, departureDateFrom: Date | undefined , departureDateTo: Date | undefined, origin: String | undefined, destination: String | undefined){
        this.searchType = searchType;
        this.daysToDeparture = daysToDeparture;
        this.departureDateFrom = departureDateFrom;
        this.departureDateTo = departureDateTo;
        this.origin = origin;
        this.destination = destination;
    }
}
import { Customer } from "./Customer";

export interface CustomerPage{
    data: Customer[];
    pageSize: number;
    pageNumber : number;
    totalRecords : number;
}
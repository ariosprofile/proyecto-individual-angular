export interface Lease {
    id: number;
    leaseDate: Date;
    returnDate: Date;
    totalCost: number;
    libraryUserId: number;
    stockTypeId: number
}

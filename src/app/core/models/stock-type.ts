export interface StockType {
    id: number;
    stock: number;
    type: number;
    costPerDay: number;
    bookId: number;
    leasesIds: number[];
}

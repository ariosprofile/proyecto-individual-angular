export interface LibraryUser {
    id?: number;
    address: string;
    email: string;
    password: string;
    userName: string;
    creditCard?: string;
    role: number;
    leasedBooksIds: number[]
}

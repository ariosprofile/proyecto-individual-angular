export interface LibraryUser {
    id: number;
    address: string;
    email: string;
    password: string;
    userName: string;
    role: number;
    leasedBooksIds: number[]
}

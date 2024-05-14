export interface Book {
    id?: number;
    author: string;
    genre: string;
    title: string;
    synopsis: string;
    pictureUrl: string;
    stockTypesIds: number[]
}

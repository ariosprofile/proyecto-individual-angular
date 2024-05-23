import { environment } from "../../../environments/environment.development";

export const BOOK_API_URL = environment.endpointUrl + 'book';

export const BOOK_ROUTES = {
  list: () => `${BOOK_API_URL}`,
  get: (id: number) => `${BOOK_API_URL}/${id}`,
  create: () => `${BOOK_API_URL}`,
  update: (id: number | undefined) => `${BOOK_API_URL}/${id}`,
  delete: (id: number | undefined) => `${BOOK_API_URL}/${id}`,
  findByGenre: (genre: string) => `${BOOK_API_URL}/genre/${genre}`,
  findByTitle: (title: string) => `${BOOK_API_URL}/title/${title}`,
  findByAuthor: (author: string) => `${BOOK_API_URL}/author/${author}`
};
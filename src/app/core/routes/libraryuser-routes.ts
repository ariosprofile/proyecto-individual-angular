import { environment } from "../../../environments/environment.development";

export const LIBRARYUSER_API_URL = environment.endpointUrl + 'libraryUser';

export const LIBRARYUSER_ROUTES = {
  list: () => `${LIBRARYUSER_API_URL}`,
  get: (id: number) => `${LIBRARYUSER_API_URL}/${id}`,
  create: () => `${LIBRARYUSER_API_URL}`,
  update: (id: number | undefined) => `${LIBRARYUSER_API_URL}/${id}`,
  delete: (id: number | undefined) => `${LIBRARYUSER_API_URL}/${id}`,
  findByUserName: (userName: string) => `${LIBRARYUSER_API_URL}/userName/${userName}`,
  findByRole: (role : number) => `${LIBRARYUSER_API_URL}/role/${role}`,
  findByAuthor: (author: string) => `${LIBRARYUSER_API_URL}/author/${author}`,
  login: () => `${LIBRARYUSER_API_URL}/login`,
};
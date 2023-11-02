import { ResponceType } from "./apiResponseType";

const baseUrl = 'https://swapi.dev/api/';

export enum ApiEndpoints {
  people = 'people',
  planets = 'planets',
  films = 'films',
  species = 'species',
  vehicles = 'vehicles',
  starships = 'starships'
}

export const fetchApi = async (endpoint: string, search?: string) => {

  const seachArg = search ? `?search=${search}` : '';

  const response: ResponceType = await fetch(`${baseUrl}${endpoint}/${seachArg}`)
    .then((val: Response) => val.json());

  return response
}
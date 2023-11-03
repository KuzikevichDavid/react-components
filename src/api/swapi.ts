import { json } from 'react-router-dom';
import { PagedResponseType, ResponceType } from './apiResponseType';

const baseUrl = 'https://swapi.dev/api/';

export enum ApiEndpoints {
  people = 'people',
  planets = 'planets',
  films = 'films',
  species = 'species',
  vehicles = 'vehicles',
  starships = 'starships',
}

const defaultPerPage = 10;

const throwNotFound = () => {
  throw json({ status: 404, statusText: 'Not found' })
};

const calcPageCount = (count: number, perPage: number) => +(count / perPage).toFixed(0) + 1;

export const fetchPaged = async (endpoint: string, page: number = 1, perPage: number = defaultPerPage, search?: string): Promise<PagedResponseType> => {
  const { count, results } = await fetchApi(endpoint, search);
  const allPerPage = results.length;
  const allPageCount = calcPageCount(count, allPerPage);

  if (search) {
    if (page != 1) throwNotFound;
  }


  return { page, pageCount: allPageCount, itemsPerPage: allPerPage, results };

  // if (page > allPageCount) throwNotFound;

  // const virtualPageCount = calcPageCount(count, perPage)
  // const realPage = (perPage * page / allPerPage);
  // }

  // return {}
  // return { page, pageCount, itemsPerPage, results };
}

export const fetchApi = async (endpoint: string, search?: string) => {
  const seachArg = search ? `?search=${search}` : '';

  const response: ResponceType = await fetch(`${baseUrl}${endpoint}/${seachArg}`)
    .then((val: Response) => val.json())
    .then((parsedResponse: ResponceType) => parsedResponse);

  return response;
};

import { json } from 'react-router-dom';
import { Items, PagedResponseType, ResponceType } from './apiResponseType';

const baseUrl = 'https://swapi.dev/api/';

export enum ApiEndpoints {
  people = 'people',
  planets = 'planets',
  films = 'films',
  species = 'species',
  vehicles = 'vehicles',
  starships = 'starships',
}

export const defaultPerPage = 10;

const makeParams = (urlOptions: Record<string, string>): string => {
  let url = `?`;

  Object.keys(urlOptions).forEach((key) => {
    url += `${key}=${urlOptions[key]}&`;
  });

  return url.slice(0, -1);
};

export const fetchApi = async (endpoint: string, search?: string, page = 1) => {
  const options: Record<string, string> = {};
  if (search) options.search = search;
  if (page) options.page = `${page}`;
  const params = makeParams(options);

  const response: ResponceType = await fetch(`${baseUrl}${endpoint}/${params}`)
    .then((val: Response) => val.json())
    .then((parsedResponse: ResponceType) => parsedResponse);

  return response;
};

const throwNotFound = () => {
  throw json({ status: 404, statusText: 'Not found' });
};

const calcPageCount = (count: number, perPage: number) => Math.ceil(count / perPage);

const calcRealPageAndIndex = (offset: number) => {
  const page = Math.floor(offset / defaultPerPage) + 1;
  const index = offset % defaultPerPage;
  return { page, index };
};

export const fetchPaged = async (
  endpoint: string,
  page = 1,
  perPage: number = defaultPerPage,
  search?: string
): Promise<PagedResponseType> => {
  const { count, results } =
    perPage === defaultPerPage
      ? await fetchApi(endpoint, search, page)
      : await fetchApi(endpoint, search);

  const pageCount = calcPageCount(count, defaultPerPage);

  if (perPage === defaultPerPage || !results.length) {
    return { page, pageCount, itemsPerPage: defaultPerPage, results };
  }

  const virtualPageCount = calcPageCount(count, perPage);
  if (page > virtualPageCount) throwNotFound();

  const realStart = calcRealPageAndIndex(perPage * (page - 1));
  const realEnd = calcRealPageAndIndex(perPage * page - 1);
  const virtualResults: Items = [];
  if (realStart.page === realEnd.page) {
    const response = await fetchApi(endpoint, search, realStart.page);
    virtualResults.push(...response.results.slice(realStart.index, realEnd.index + 1));
  } else
    for (
      let curPage = realStart.page;
      curPage <= realEnd.page && curPage <= pageCount;
      curPage += 1
    ) {
      const pageResponse = await fetchApi(endpoint, search, curPage);
      if (curPage === realStart.page) {
        virtualResults.push(...pageResponse.results.slice(realStart.index));
      } else if (curPage === realEnd.page) {
        virtualResults.push(...pageResponse.results.slice(0, realEnd.index + 1));
      } else {
        virtualResults.push(...pageResponse.results);
      }
    }
  return { page, pageCount: virtualPageCount, itemsPerPage: perPage, results: virtualResults };
};

export const fetchId = async (url: string) => {
  const response: ResponceType = await fetch(url)
    .then((val: Response) => val.json())
    .then((parsedResponse: ResponceType) => parsedResponse);

  return response;
};

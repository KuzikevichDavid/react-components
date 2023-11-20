import { http, HttpResponse } from 'msw';
import { PagedResponseType } from '../../api/apiResponseType';
import { ApiEndpoints, baseUrl } from '../../api/swapi';
import { cloneFakeItem } from '../CardFakes';
import { fakeDetailLoader } from '../detailFakes';

const pagedResolver = () => {
  const data: PagedResponseType = {
    page: 1,
    itemsPerPage: 1,
    pageCount: 1,
    results: [cloneFakeItem()],
  };
  return HttpResponse.json(data);
};

const detailResolver = async () => {
  return HttpResponse.json(await fakeDetailLoader());
};

const handlers = [
  http.all(`${baseUrl}${ApiEndpoints.people}/`, pagedResolver),
  http.all(`${baseUrl}${ApiEndpoints.people}/*`, detailResolver),
];

export { handlers };

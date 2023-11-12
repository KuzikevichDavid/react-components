import { Item, PagedResponseType } from '../api/apiResponseType';

export const fakeItemFieldsCount = 4;

export const fakeItem: Required<Item> = {
  name: 'fake name',
  url: 'fake url',
  title: 'fake title',
  model: 'fake model',
};

export const cloneFakeItem = (): Item => ({ ...fakeItem });

export const fakeLoader = (itemsCount: number, pageCount = 10): PagedResponseType => {
  const res = Array<Item>(itemsCount);
  for (let index = 0; index < res.length; index++) {
    res[index] = cloneFakeItem();
  }
  return {
    itemsPerPage: itemsCount,
    page: 1,
    pageCount,
    results: res,
  };
};

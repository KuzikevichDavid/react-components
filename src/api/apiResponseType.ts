export interface ResponceType {
  count: number;
  next: string | null;
  previous: string | null;
  results: Items;
}

export interface PagedResponseType {
  page: number;
  pageCount: number;
  itemsPerPage: number;
  results: Items;
}

export interface Item {
  name?: string;
  title?: string;
  model?: string;
}

export type Items = Item[];

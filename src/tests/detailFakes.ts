import { ResponceType as Res } from '../api/apiResponseType';
import { cloneFakeItem } from './CardFakes';

export async function fakeDetailLoader(): Promise<Res> {
  return {
    count: 1,
    next: null,
    previous: null,
    results: [cloneFakeItem()],
  };
}

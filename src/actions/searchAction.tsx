import { paginationFormName } from '../components/pagination/Pagination';
import { storageAPIKey, storageKey } from '../components/search/storageKeys';
import { RequestType } from './types';

export default async function searchAction({ request, params }: RequestType) {
  console.log('action', request, params);

  const data = await request.formData();
  const formData: Record<string, string> = Object.fromEntries<string>(data);

  if (formData.formName !== paginationFormName) {
    localStorage.setItem(storageKey, formData.searchArg);
    localStorage.setItem(storageAPIKey, formData.apiEnpoint);
  }

  return null;
}

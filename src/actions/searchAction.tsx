import { storageAPIKey, storageKey } from '../components/search/storageKeys';
import { RequestType } from './types';

export default async function searchAction({ request, params, context }: RequestType) {
  console.log('action', request, params, context);
  const data = await request.formData();

  const formData: Record<string, string> = Object.fromEntries<string>(data);
  console.log(formData);

  localStorage.setItem(storageKey, formData.searchArg);
  localStorage.setItem(storageAPIKey, formData.apiEnpoint);
  return null;
}

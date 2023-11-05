import { RequestType } from './types';

export default async function detailAction({ request, params, context }: RequestType) {
  console.log('detailAction', request, params, context);
  const data = await request.formData();

  const formData: Record<string, string> = Object.fromEntries<string>(data);
  console.log('detailAction ');

  console.log(formData.url);
  localStorage.setItem('url', formData.url);

  return null;
}

import { RequestType } from './types';

const searchAction = async ({ request, params }: RequestType) => {
  console.log('action', request, params);
  return null;
}

export default searchAction;

import { RequestType } from './types';

const searchAction = ({ request, params }: RequestType) => {
  console.log('action', request, params);
  return null;
};

export default searchAction;

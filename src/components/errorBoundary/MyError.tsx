import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Fallback from './Fallback';

interface ErrorData {
  message: string;
}

interface RouteErrorType {
  status: number;
  statusText: string;
  data: ErrorData;
}

function MyError() {
  const error: RouteErrorType = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <Fallback />
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }
  console.log(error);
  return (
    <div>
      <Fallback />
    </div>
  );
}

export default MyError;

import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

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
        <h1>Oops! We’ve got a problem.</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }
  console.log(error);
  return <div>Oops</div>;
}

export default MyError;

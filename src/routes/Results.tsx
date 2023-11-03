import { useLoaderData } from 'react-router-dom';
import ShowResults from '../components/ShowResults';
import { ResponceType } from '../api/apiResponseType';

function Results() {
  const { results }: ResponceType = useLoaderData();

  return <ShowResults resultItems={results} />;
}

export default Results;

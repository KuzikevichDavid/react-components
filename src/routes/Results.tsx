import { useLoaderData } from 'react-router-dom';
import ShowResults from '../components/ShowResults';
import { PagedResponseType } from '../api/apiResponseType';
import Pagination from '../components/pagination/Pagination';

function Results() {
  const pagedResponce: PagedResponseType = useLoaderData();
  const { results } = pagedResponce;

  return (
    <>
      <Pagination pagination={pagedResponce} />
      <ShowResults resultItems={results} />
    </>
  );
}

export default Results;

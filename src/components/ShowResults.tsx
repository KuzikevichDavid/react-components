import { Form } from 'react-router-dom';
import { PagedResponseType, Item } from '../api/apiResponseType';

import ShowItem from './ShowItem';

const showedCount = 4;

interface PropType {
  response: Partial<PagedResponseType>;
}

const resultSectionClass = 'apiCallResults';

function ShowResults({ response: { page, results: resultItems } }: PropType) {
  if (resultItems) {
    const results = Object.entries(resultItems);
    if (results.length > 0) {
      return (
        <section className={resultSectionClass}>
          {results.map(function a(mapVal: [string, Item]) {
            const [, val] = mapVal;
            return (
              <Form
                method="get"
                className="card"
                key={`${Math.random()}`}
                action={`/search/${page}/${val.name ?? val.title}`}
              >
                <button type="submit">
                  <ShowItem item={val} showedCount={showedCount} />
                </button>
              </Form>
            );
          })}
        </section>
      );
    }
    return <p>Nothing to show</p>;
  }
  return null;
}

export default ShowResults;

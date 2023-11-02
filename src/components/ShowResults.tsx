import { Items, Item } from './apiResponseType';

const showedCount = 4;

interface PropType {
  resultItems: Items;
}

const resultSectionClass = 'apiCallResults';

function ShowResults({ resultItems }: PropType) {
  if (resultItems) {
    const results = Object.entries(resultItems);
    if (results.length > 0) {
      return (
        <section className={resultSectionClass}>
          {results.map(function a(mapVal: [string, Item]) {
            const [, val] = mapVal;
            return (
              <div className="card" key={`${Math.random()}`}>
                {Object.entries(val).map(function b(entry: [string, string], index: number) {
                  if (index <= showedCount) {
                    const [entryKey, value] = entry;
                    return (
                      <div className="obj-cart__property" key={`${Math.random()}`}>
                        {entryKey}: {value}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
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

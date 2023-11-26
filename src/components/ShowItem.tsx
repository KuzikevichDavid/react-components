import { Item } from '../api/apiResponseType';

interface PropType {
  item: Item;
  showedCount: number;
}

function ShowItem({ item, showedCount }: PropType) {
  return (
    <>
      {item && Object.entries(item).map(function b(entry: [string, string], index: number) {
        const [entryKey, value] = entry;
        if (index <= showedCount && entryKey !== 'url') {
          return (
            <div className="obj-cart__property" key={`${Math.random()}`}>
              {entryKey}: {value}
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

export default ShowItem;

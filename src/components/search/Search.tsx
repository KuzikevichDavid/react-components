import { useEffect } from 'react';
import { Items, ResponceType } from '../../api/apiResponseType';
import { fetchApi } from '../../api/swapi';

interface PropType {
  handleShowItems: (newItems: Items) => void;
  handleLoad: (isLoad: boolean) => void;
  isLoad: boolean;
}

const searchInputClass = 'section-search__input';
const searchOptionClass = 'section-search__select';
const searchBtnClass = 'section-search__btn-search';

const storageKey = 'searchStartValue';
const storageAPIKey = 'selectedSearchAPI';

const inputStartValue = localStorage.getItem(storageKey) ?? '';
const apiStartValue = localStorage.getItem(storageAPIKey) ?? 'people';

function Search({ handleShowItems, handleLoad, isLoad }: PropType) {
  function onSearch() {
    handleLoad(true);
    const input: HTMLInputElement = document.querySelector(`.${searchInputClass}`)!;
    const inputValue = input.value;
    const select: HTMLSelectElement = document.querySelector(`.${searchOptionClass}`)!;
    const selectValue = select.value;

    localStorage.setItem(storageKey, inputValue);
    localStorage.setItem(storageAPIKey, selectValue);

    fetchApi(selectValue, inputValue)
      .then((data: ResponceType) => handleShowItems(data.results))
      .catch(console.log);
  }

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <section className="section-search">
      <select className={searchOptionClass} defaultValue={apiStartValue}>
        <option value="people">people</option>
        <option value="planets">planets</option>
        <option value="films">films</option>
        <option value="species">species</option>
        <option value="vehicles">vehicles</option>
        <option value="starships">starships</option>
      </select>
      <input
        className={searchInputClass}
        type="text"
        defaultValue={inputStartValue}
        placeholder="Type seach query to API"
      />
      <button
        className={searchBtnClass}
        type="button"
        onClick={() => onSearch()}
        disabled={!!isLoad}
      >
        Search
      </button>
    </section>
  );
}

export default Search;

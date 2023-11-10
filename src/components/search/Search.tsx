import { useContext } from 'react';
import { Form } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import { storageAPIKey, storageKey } from './storageKeys';

const searchInputClass = 'section-search__input';
const searchOptionClass = 'section-search__select';
const searchBtnClass = 'section-search__btn-search';

const startPage = 1;

function Search() {
  const {
    endpoint: [selectedApi, setSelectedApi],
    search: [searchText, setSearchText],
  } = useContext(SearchContext);

  const handleSelectApi = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    localStorage.setItem(storageAPIKey, select.value);
    setSelectedApi(select.value);
  };

  const handleSeachText = (e: Event) => {
    const input = e.target as HTMLInputElement;
    localStorage.setItem(storageKey, input.value);
    setSearchText(input.value);
  };

  return (
    <Form method="get" action={`${selectedApi}/search/${startPage}`}>
      <select
        className={searchOptionClass}
        name="apiEnpoint"
        defaultValue={selectedApi}
        onChange={(e: Event) => handleSelectApi(e)}
      >
        <option value="people">people</option>
        <option value="planets">planets</option>
        <option value="films">films</option>
        <option value="species">species</option>
        <option value="vehicles">vehicles</option>
        <option value="starships">starships</option>
      </select>
      <input
        className={searchInputClass}
        name="searchArg"
        type="search"
        defaultValue={searchText}
        placeholder="Type seach query to API"
        onChange={(e: Event) => handleSeachText(e)}
      />
      <input type="hidden" name="formName" value="search" />
      <button type="submit" className={searchBtnClass}>
        <span>Search</span>
      </button>
    </Form>
  );
}

export default Search;

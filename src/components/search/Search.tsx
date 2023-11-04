import { Form } from 'react-router-dom';
import { storageAPIKey, storageKey } from './storageKeys';

const searchInputClass = 'section-search__input';
const searchOptionClass = 'section-search__select';
const searchBtnClass = 'section-search__btn-search';

const inputStartValue = localStorage.getItem(storageKey) ?? '';
const apiStartValue = localStorage.getItem(storageAPIKey) ?? 'people';

interface ParamType {
  startPage: number;
}

function Search({ startPage }: ParamType) {
  return (
    <Form method="post" action={`/search/${startPage}`}>
      <select className={searchOptionClass} name="apiEnpoint" defaultValue={apiStartValue}>
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
        type="text"
        defaultValue={inputStartValue}
        placeholder="Type seach query to API"
      />
      <input type="hidden" name="formName" value="search" />
      <button type="submit" className={searchBtnClass}>
        <span>Search</span>
      </button>
    </Form>
  );
}

export default Search;

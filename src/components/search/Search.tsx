import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-router-dom';
import { setEndpoint, setSearch } from '../../store/reducers/search/searchSlice';
import { RootState } from '../../store/RootState';

const searchInputClass = 'section-search__input';
const searchOptionClass = 'section-search__select';
const searchBtnClass = 'section-search__btn-search';

const startPage = 1;

function Search() {
  const dispatch = useDispatch();

  const search = useSelector((state: RootState) => state.search);
  const { searchText, endpoint } = search;

  const handleSelectApi = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    dispatch(setEndpoint(select.value));
  };

  const handleSeachText = (e: Event) => {
    const input = e.target as HTMLInputElement;
    dispatch(setSearch(input.value));
  };

  return (
    <Form method="post" action={`${endpoint}/search/${startPage}`}>
      <select
        className={searchOptionClass}
        name="apiEnpoint"
        defaultValue={endpoint}
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

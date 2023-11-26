import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEndpoint, setItemsPerPage, setSearch } from '../../store/reducers/search/searchSlice';

const searchInputClass = 'section-search__input';
const searchOptionClass = 'section-search__select';
const searchBtnClass = 'section-search__btn-search';

const startPage = 1;

const parseQuery = (query: NodeJS.Dict<string | string[]>) => {
  const { prePage, search, page, endpoint } = query;
  return {
    perPage: +(prePage as string),
    search: search as string,
    page: +(page as string),
    endpoint: endpoint as string,
  };
};

function Search() {
  const dispatch = useDispatch();
  const router = useRouter();
  const parsed = parseQuery(router.query);

  const search = useSelector((state: RootState) => state.search);
  const { searchText, endpoint, perPage } = search;

  const handleSelectApi = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    dispatch(setEndpoint(select.value));
  };

  const handleSeachText = (e: Event) => {
    const input = e.target as HTMLInputElement;
    dispatch(setSearch(input.value));
  };

  const actionPath = `/${endpoint}?page=${startPage}${perPage ? `&perPage=${perPage}` : ''}${searchText ? `&search=${searchText}` : ''
    }`;

  const handleSearchClick = async (): Promise<void> => {
    await router.push(actionPath);
  };

  useEffect(() => {
    if (parsed.endpoint) dispatch(setEndpoint(parsed.endpoint));
  }, [parsed.endpoint]);

  useEffect(() => {
    if (parsed.search) dispatch(setSearch(parsed.search));
    else dispatch(setSearch(''));
  }, [parsed.search]);

  useEffect(() => {
    if (parsed.perPage) dispatch(setItemsPerPage(parsed.perPage));
  }, [parsed.perPage]);

  return (
    <form method="post" action={actionPath}>
      <select
        className={searchOptionClass}
        name="apiEnpoint"
        defaultValue={parsed.endpoint}
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
        defaultValue={parsed.search}
        placeholder="Type seach query to API"
        onChange={(e: Event) => handleSeachText(e)}
      />
      <input type="hidden" name="formName" value="search" />
      <button className={searchBtnClass} type="button" onClick={() => handleSearchClick()}>
        <span>Search</span>
      </button>
    </form>
  );
}

export default Search;

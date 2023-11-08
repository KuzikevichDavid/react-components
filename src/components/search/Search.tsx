import { SelectHTMLAttributes, useContext, useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import { storageAPIKey, storageKey } from './storageKeys';

const searchInputClass = 'section-search__input';
const searchOptionClass = 'section-search__select';
const searchBtnClass = 'section-search__btn-search';

// const inputStartValue = localStorage.getItem(storageKey) ?? '';
// const apiStartValue = localStorage.getItem(storageAPIKey) ?? 'people';

interface ParamType {
  startPage: number;
}

function Search({ startPage }: ParamType) {
  const { endpoint: [selectedApi, setSelectedApi],
    search: [searchText, setSearchText] } = useContext(SearchContext)
  const submit = useSubmit();
  // const select: SelectHTMLAttributes = 
  const handleSelectApi = (e: Event) => {
    const select = e.target as HTMLSelectElement
    setSelectedApi(select.value)
  }

  const handleSeachText = (e: Event) => {
    const input = e.target as HTMLInputElement
    setSearchText(input.value)
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    submit(formData, {
      method: "post",
      action: `${selectedApi}/search/${startPage}`,
    })
  }

  return (
    <Form method="post" /* action={`/search/${startPage}`} */
      onSubmit={(e: Event) => { handleSubmit(e) }}>
      <select className={searchOptionClass} name="apiEnpoint" defaultValue={selectedApi}
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
        type="text"
        defaultValue={searchText}
        placeholder="Type seach query to API"
        onChange={(e: Event) => handleSeachText(e)}
      />
      <input type="hidden" name="formName" value="search" />
      <button type="submit" className={searchBtnClass} >
        <span>Search</span>
      </button>
    </Form >
  );
}

export default Search;

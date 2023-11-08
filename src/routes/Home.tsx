import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { defaultPerPage } from '../api/swapi';
import TestErrorBoundary from '../components/errorBoundary/TestErrorBoundary';
import Search from '../components/search/Search';
import { storageKey, storageAPIKey, storageItemsPerPageKey } from '../components/search/storageKeys';
import SearchContext from '../contexts/SearchContext';

function Home() {
  const search = localStorage.getItem(storageKey) ?? '';
  const endpoint = localStorage.getItem(storageAPIKey) ?? 'people';
  const perPage = localStorage.getItem(storageItemsPerPageKey) ?? defaultPerPage;
  return (
    <SearchContext.Provider value={{ search: useState(search), endpoint: useState(endpoint), perPage: useState(perPage), response: useState() }} >
      <TestErrorBoundary />
      <Search startPage={1} />
      <Outlet context={{ search: useState(search), endpoint: useState(endpoint), perPage: useState(perPage), response: useState() }} />
    </SearchContext.Provider>
  );
}

export default Home;

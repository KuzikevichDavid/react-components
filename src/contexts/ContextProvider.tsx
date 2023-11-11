import { useContext, useMemo, useState } from 'react';
import SearchContext, { SearchContextType } from './SearchContext';

interface PropType {
  children: React.ReactNode[];
}

function ContextProvider({ children }: PropType) {
  const context = useContext(SearchContext);
  const {
    endpoint: [startApi],
    search: [startSearchText],
    perPage: [startPerPage],
    response: [startResponse],
  } = context;

  const endpoint = useState(startApi);
  const search = useState(startSearchText);
  const perPage = useState(startPerPage);
  const response = useState(startResponse);

  const contextValue: SearchContextType = useMemo<SearchContextType>(() => {
    return { endpoint, search, perPage, response };
  }, [endpoint, search, perPage, response]);
  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

export default ContextProvider;

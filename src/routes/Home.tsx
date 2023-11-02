import { useState } from 'react';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import TestErrorBoundary from '../components/errorBoundary/TestErrorBoundary';
import Search from '../components/search/Search';
import ShowResults from '../components/ShowResults';
import Loader from '../components/loader/Loader';
import { Items } from '../api/apiResponseType';

function Home() {
  const [items, setItems] = useState<Items>();
  const [isLoad, setLoad] = useState(false);

  const handleShowItems = (newItems: Items) => {
    setLoad(false);
    setItems(newItems);
  };

  const handleLoad = (newIsLoad: boolean) => setLoad(newIsLoad);

  return (
    <ErrorBoundary>
      <TestErrorBoundary />
      <Search handleShowItems={handleShowItems} handleLoad={handleLoad} isLoad={isLoad} />
      {isLoad ? <Loader /> : <ShowResults resultItems={items} />}
    </ErrorBoundary>
  );
}

export default Home;

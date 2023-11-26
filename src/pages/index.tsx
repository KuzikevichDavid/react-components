import Search from '@/components/search/Search';
import { ReactElement } from 'react';
import { wrapper } from '@/store/store';
import RootLayout from '@/layouts/RootLayout';
import Loader from '@/components/loader/Loader';

function Home() {
  return <Search />;
}

Home.getLayout = (page: ReactElement, isLoading = false) => {
  return (
    <RootLayout>
      {page}
      {isLoading && <Loader />}
    </RootLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  console.log('index');
  return {
    props: {},
  };
});

export default Home;

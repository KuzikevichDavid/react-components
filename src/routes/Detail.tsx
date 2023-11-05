import { useEffect } from 'react';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { ResponceType } from '../api/apiResponseType';
import ShowItem from '../components/ShowItem';
import styles from './Detail.module.css';

export interface ContextType {
  isClose: boolean;
  setIsClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function Detail() {
  const navigate = useNavigate();
  const respose: ResponceType = useLoaderData();
  const { isClose, setIsClose } = useOutletContext<ContextType>();
  function handleClose() {
    navigate('..');
  }

  useEffect(() => {
    if (isClose) {
      console.log('close');

      setIsClose(false);
      handleClose();
    }
  }, [isClose]);

  const { results } = respose;
  return (
    <div className={styles['datail-wrapper']}>
      <h2>detail</h2>
      <button type="button" onClick={() => handleClose()}>
        <span>Close</span>
      </button>
      <div>
        <ShowItem item={results[0]} showedCount={100} />
      </div>
    </div>
  );
}

export default Detail;

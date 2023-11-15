import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ResponceType } from '../api/apiResponseType';
import ShowItem from '../components/ShowItem';
import { closeDetail } from '../features/detailIsShowedSlice';
import { detailSectionEndLoading } from '../features/loadingFlag/loadingFlagSlice';
import { RootState } from '../store/store';
import styles from './Detail.module.css';

export interface ContextType {
  isClose: boolean;
  setIsClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function Detail() {
  const navigate = useNavigate();
  const respose = useLoaderData() as ResponceType;

  const dispatch = useDispatch();

  const detailIsShowed = useSelector((state: RootState) => state.detailIsShowed);

  function handleClose() {
    navigate('..');
  }

  useEffect(() => {
    dispatch(detailSectionEndLoading());
    if (!detailIsShowed) {
      console.log('closeDetail');

      handleClose();
    }
    return () => {
      dispatch(closeDetail());
    };
  }, [detailIsShowed]);

  const { results } = respose;
  return (
    <div className={styles['datail-wrapper']} title='"Detail" section'>
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

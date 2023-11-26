import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ResponceType } from '../api/apiResponseType';
import ShowItem from '../components/ShowItem';
import { closeDetail } from '../store/reducers/detailIsShowed/detailIsShowedSlice';
import { setResponse } from '../store/reducers/response/responceSlice';
import { RootState } from '../store/RootState';
import styles from './Detail.module.css';

export interface ContextType {
  isClose: boolean;
  setIsClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function Detail() {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as ResponceType;

  const dispatch = useDispatch();

  const detailIsShowed = useSelector((state: RootState) => state.detailIsShowed.isShowed);

  const response = useSelector((state: RootState) => state.detailResponse.response);

  const { results } = response;

  function handleClose() {
    navigate('..');
  }

  useEffect(() => {
    if (!detailIsShowed) {
      console.log('closeDetail');

      handleClose();
    }
    return () => {
      dispatch(closeDetail());
    };
  }, [detailIsShowed]);

  useEffect(() => {
    dispatch(setResponse(loaderData));
  }, [loaderData]);

  return results.length ? (
    <div className={styles['datail-wrapper']} title='"Detail" section'>
      <h2>detail</h2>
      <button type="button" onClick={() => handleClose()}>
        <span>Close</span>
      </button>
      <div>
        <ShowItem item={results[0]} showedCount={100} />
      </div>
    </div>
  ) : null;
}

export default Detail;

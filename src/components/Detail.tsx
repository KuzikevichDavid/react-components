import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ShowItem from './ShowItem';
import { closeDetail } from '../store/reducers/detailIsShowed/detailIsShowedSlice';
import styles from './Detail.module.css';

function Detail() {
  const dispatch = useDispatch();

  const detailIsShowed = useSelector((state: RootState) => state.detailIsShowed.isShowed);

  const response = useSelector((state: RootState) => state.detailResponse.response);

  const { results } = response;

  function handleClose() {
    dispatch(closeDetail());
  }

  useEffect(() => {
    if (!detailIsShowed) {
      console.log('closeDetail');

      handleClose();
    }
  }, [detailIsShowed]);

  return results?.length ? (
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

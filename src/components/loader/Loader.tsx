import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles['loader-wrapper']}>
      <span className={styles['loader-title']}>Loading...</span>
      <span className={styles.loader} />
    </div>
  );
}

export default Loader;

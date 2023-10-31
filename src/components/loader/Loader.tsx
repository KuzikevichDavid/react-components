import { Component, ReactNode } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
  render(): ReactNode {
    return (
      <div className={styles['loader-wrapper']}>
        <span className={styles['loader-title']}>Loading...</span>
        <span className={styles.loader} />
      </div>
    );
  }
}

export default Loader;

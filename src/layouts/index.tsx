import React from 'react';
import { WingBlank } from 'antd-mobile';
import styles from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <WingBlank>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to umi!</h1>
        {props.children}
      </div>
    </WingBlank>
  );
};

export default BasicLayout;

import React from 'react';
import styles from './index.css';
import { WingBlank } from 'antd-mobile';

const BasicLayout: React.FC = props => {
	return (
		<WingBlank size="md">
			< div className={styles.normal} >
				{props.children}
			</div >
		</WingBlank>
	);
};

export default BasicLayout;

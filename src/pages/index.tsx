import React from 'react';
import { Button } from 'antd-mobile';
import styles from './index.css';
import PullToRefreshComponent from '../components/PullToRefreshComponent'


export default function () {
	return (
		<div className={styles.normal}>
			<PullToRefreshComponent />
		</div>
	);
}

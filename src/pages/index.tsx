import React from 'react';
import { Button } from 'antd-mobile';
import styles from './index.css';
import MeetingRoomList from '../components/MeetingRoomList'


export default function () {
	return (
		<div className={styles.normal}>
			<MeetingRoomList />
		</div>
	);
}

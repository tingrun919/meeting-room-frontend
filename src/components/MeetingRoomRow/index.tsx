
import React from 'react';
import { Tag, Card } from 'antd-mobile';
import dayjs from '@/utils/dayjs';
import styles from './index.less';

import MeetingRoomDetail from '../MeetingRoomDetail'

const MeetingRoomRow = ({ rowData, rowID }) => {
	let current = {
		creator: '暂无'
	};
	let next = {
		creator: '暂无'
	};
	//当前预约
	if (rowData.currentReservation) {
		current.creator = `${rowData.currentReservation.creator}`
		current.time = `${dayjs(rowData.currentReservation.startTime).format('YY-MM-DD HH:mm')}` + '至' + `${dayjs(rowData.currentReservation.endTime).format('YY-MM-DD HH:mm')}`
	}
	//下个预约
	if (rowData.nextReservation) {
		next.creator = `${rowData.nextReservation.creator}`
		next.time = `${dayjs(rowData.nextReservation.startTime).format('YY-MM-DD HH:mm')}` + '至' + `${dayjs(rowData.nextReservation.endTime).format('YY-MM-DD HH:mm')}`
	}
	return (
		<Card
			key={rowID}
		>
			<Card.Body>
				{/* meeting-room description jsx start */}
				<MeetingRoomDetail
					meetingRoom={rowData}
				/>
				{/* meeting-room descrption jsx end */}
				{/* reservation jsx start */}
				<div className={`${styles.marginTop10} ${styles.roomDescrption}`}>
					<div className={styles.roomDescrption}>
						<span>当前预约：{current.creator}</span>
						{current.time ?
							<span>时间：{current.time}</span>
							: null
						}
					</div>
					<div className={styles.lineDashedGray}></div>
					<div className={`${styles.fontWeight300} ${styles.roomDescrption}`}>
						<span>下个预约：{next.creator}</span>
						{next.time ?
							<span>时间：{next.time}</span>
							: null
						}
					</div>
				</div>
				{/* reservation jsx end */}
			</Card.Body>
		</Card >
	);
}

export default MeetingRoomRow

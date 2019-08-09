
import React from 'react';
import { Tag, Card } from 'antd-mobile';
import dayjs from '@/utils/dayjs';
import styles from './index.less';

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
				<div className={styles.flex}>
					<div className={styles.roomImgFlex}>
						<img className={styles.roomImg} src={rowData.imgPath} alt="" />
					</div>
					<div className={styles.roomDescrption}>
						<div>
							<span className={styles.fontSize20}>{rowData.name}</span>
						</div>
						<div className={styles.marginTop3}>
							<span className={styles.roomAddress}>会议室地点：{rowData.alias}</span>
						</div>
						<div className={styles.marginTop10}>
							{rowData.tags ?
								rowData.tags.map((item: string, index: number) => <Tag className={styles.tagCustom} small={true} key={index}>{item}</Tag>) : null}
						</div>
					</div>
				</div>
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

import React from 'react';
import { Tag } from 'antd-mobile';
import styles from '../MeetingRoomRow/index.less';

import { MeetingRoom } from '@/apis/MeetingRoom';

export default class MeetingRoomDetail extends React.PureComponent<{ meetingRoom: MeetingRoom }> {

	render() {
		const { meetingRoom } = this.props
		return (
			<div className={styles.flex}>
				<div className={styles.roomImgFlex}>
					<img className={styles.roomImg} src={meetingRoom.imgPath} alt="" />
				</div>
				<div className={styles.roomDescrption}>
					<div>
						<span className={styles.fontSize20}>{meetingRoom.name}</span>
					</div>
					<div className={styles.marginTop3}>
						<span className={styles.roomAddress}>会议室地点：{meetingRoom.alias}</span>
					</div>
					<div className={styles.marginTop10}>
						{meetingRoom.tags ?
							meetingRoom.tags.map((item, index) => <Tag className={styles.tagCustom} small={true} key={index}>{item}</Tag>) : null}
					</div>
				</div>
			</div>
		)
	}

}

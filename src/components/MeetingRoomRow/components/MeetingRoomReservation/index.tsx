import React from 'react';
import styles from '../../index.less'
import dayjs from '@/utils/dayjs';

export default class MeetingRoomReservation extends React.PureComponent<{ reservationData: any }> {

  render() {
    let current: any = {
      creator: '暂无'
    };
    let next: any = {
      creator: '暂无'
    };
    const { reservationData } = this.props

    //当前预约
    if (reservationData.currentReservation) {
      current.creator = `${reservationData.currentReservation.creator}`
      current.time = `${dayjs(reservationData.currentReservation.startTime).format('YY-MM-DD HH:mm')}` + '至' + `${dayjs(reservationData.currentReservation.endTime).format('YY-MM-DD HH:mm')}`
    }
    //下个预约
    if (reservationData.nextReservation) {
      next.creator = `${reservationData.nextReservation.creator}`
      next.time = `${dayjs(reservationData.nextReservation.startTime).format('YY-MM-DD HH:mm')}` + '至' + `${dayjs(reservationData.nextReservation.endTime).format('YY-MM-DD HH:mm')}`
    }
    return (
      <div className={`${styles.marginTop10} ${styles.roomDescrption}`}>
        <div className={styles.roomDescrption}>
          <span>当前预约：{current.creator}</span>
          {current.time ?
            <span>时间：{current.time}</span>
            : null
          }
        </div>
        <div className={styles.lineDashedGray} />
        <div className={`${styles.fontWeight300} ${styles.roomDescrption}`}>
          <span>下个预约：{next.creator}</span>
          {next.time ?
            <span>时间：{next.time}</span>
            : null
          }
        </div>
      </div>
    )
  }
}

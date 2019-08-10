import React, { useEffect } from 'react';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { Card } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RoomUseRecord, RecordStatus } from '@/apis/RoomUseRecord';

import styles from './ReservationList.less';

interface ReservationListProps {
  roomId: string;
  dispatch: any;
  reservationList: RoomUseRecord[];
  loading: boolean;
}

function ReservationList({
  roomId,
  dispatch,
  reservationList,
  loading
}: ReservationListProps) {
  useEffect(() => {
    dispatch({
      type: 'roomItem/fetch',
      payload: {
        roomId: roomId
      }
    });
  }, []);

  return (
    <div>
      {...reservationList.map(x => {
        let recordStatusDesc: string = '我不知道，你造吧';
        switch (x.recordStatus) {
          case RecordStatus.NotStarted:
            recordStatusDesc = '未开始';
            break;
          case RecordStatus.InProgress:
            recordStatusDesc = '进行中';
            break;
          case RecordStatus.Closed:
            recordStatusDesc = '已结束';
            break;
        }

        return (
          <Card full={true} key={x.id}>
            <Card.Header
              title={
                <span>
                  {x.useToken ? <FontAwesomeIcon icon="lock" className={styles['reservation-lock']} /> : ''}
                  {x.description}
                </span>
              }
              extra={x.creator}
            />
            <Card.Body>
              <div className={styles['reservation-range']}>
                {dayjs(x.startTime).format('MM-DD HH:mm')} 到 {dayjs(x.endTime).format('MM-DD HH:mm')}
              </div>
              <div className={styles['reservation-status']}>
                {recordStatusDesc}
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    reservationList: state.roomItem.reservationList,
    loading: state.loading.models.roomItem
  };
}

export default connect(mapStateToProps)(ReservationList);

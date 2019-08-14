import React, { useEffect } from 'react';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { Card } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RoomUseRecord, Status, RecordStatus } from '@/apis/RoomUseRecord';
import PopoverComponent from '@/components/PopoverComponent';

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

  //渲染Popover overlay
  // icon: 'check-circle-o',
  // iconSize: 'xs',//默认xs
  // title: '完成',
  const itemData = [{
    icon: 'check-circle-o',
    title: '完成',
  }]

  return (
    <div>
      {...reservationList.map(x => {
        let recordStatusDesc: string = '我不知道，你造吧';
        switch (x.recordStatus) {
          case RecordStatus.NotStarted:
            recordStatusDesc = x.status === Status.Normal ? '未开始' : '已取消';
            break;
          case RecordStatus.InProgress:
            recordStatusDesc = x.status === Status.Normal ? '进行中' : '已用完';
            break;
          case RecordStatus.Closed:
            recordStatusDesc = '已结束';
            break;
        }

        let displayEndTime;
        if (x.status === Status.Normal) {
          displayEndTime = x.endTime;
        } else if (x.status === Status.Finished) {
          displayEndTime = x.recordStatus === RecordStatus.NotStarted ? x.rawEndTime : x.endTime;
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
              extra={x.recordStatus === 'Closed' ? null : <PopoverComponent overlayData={itemData} record={x} />}
            />
            <Card.Body>
              <div className={styles['reservation-range']}>
                {dayjs(x.startTime).format('MM-DD HH:mm')} 到 {dayjs(displayEndTime).format('MM-DD HH:mm')}
              </div>
              <div className={styles['reservation-status']}>
                {x.creator}:{recordStatusDesc}
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

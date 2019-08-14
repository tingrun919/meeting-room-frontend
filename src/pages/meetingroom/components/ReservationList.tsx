import React, { useEffect } from 'react';
import { connect } from 'dva';
import dayjs from 'dayjs';
import { Card } from 'antd-mobile';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RoomUseRecord, Status, RecordStatus } from '@/apis/RoomUseRecord';
import PopoverComponent from '@/components/PopoverComponent';

import styles from './ReservationList.less';

interface ReservationListProps {
  roomId: string;
  dispatch: any;
  reservationList: RoomUseRecord[];
}

const StatusRecordStatusMapping = {
  [Status.Normal]: {
    [RecordStatus.NotStarted]: '未开始',
    [RecordStatus.InProgress]: '进行中',
    [RecordStatus.Closed]: '已结束'
  },
  [Status.Finished]: {
    [RecordStatus.NotStarted]: '已取消',
    [RecordStatus.InProgress]: '已用完',
    [RecordStatus.Closed]: '已用完'
  }
};

function ReservationList({
  roomId,
  dispatch,
  reservationList
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
        let recordStatusDesc: string = get(StatusRecordStatusMapping, [x.status, x.recordStatus], '我不知道，你造吧');

        const rangeClassNames = [styles['reservation-range']];
        let displayEndTime = <>{dayjs(x.rawEndTime || x.endTime).format('MM-DD HH:mm')}</>;
        if (x.status === Status.Finished) {
          displayEndTime = (
            <>
              <del>
                {displayEndTime}
              </del>
              <span className={styles['finished-at']}>{dayjs(x.endTime).format('MM-DD HH:mm')}</span>
            </>
          );
          rangeClassNames.push(styles['finished']);
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
              <div className={rangeClassNames.join(' ')}>
                {dayjs(x.startTime).format('MM-DD HH:mm')} 到 {displayEndTime}
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
    reservationList: state.roomItem.reservationList
  };
}

export default connect(mapStateToProps)(ReservationList);

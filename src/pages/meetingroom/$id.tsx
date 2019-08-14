import React, { useState, useEffect } from 'react';
import router from 'umi/router';
import { DispatchProp } from 'dva';
import { RouteComponentProps } from 'react-router';
import { get } from 'lodash';
import DocumentTitle from 'react-document-title';
import { ActivityIndicator, Accordion, Card, Toast, WhiteSpace } from 'antd-mobile';

import MeetingRoomDetail from '@/components/MeetingRoomDetail';
import AddReservation from './components/AddReservation';
import ReservationList from './components/ReservationList';

import { getMeetingRoom } from '@/service/roomList';

import styles from './MeetingRoomItem.less';

interface MeetingRoomItemProps
  extends RouteComponentProps<{ id: string }>, DispatchProp {

}

export default function MeetingRoomItem({ match }: MeetingRoomItemProps) {
  const { id: roomId } = match.params;

  const [ meetingRoom, setMeetingRoom ] = useState();
  const [ loading, setLoading ] = useState();
  useEffect(() => {
    setLoading(true);
    getMeetingRoom(roomId)
      .then(result => {
        setLoading(false);
        setMeetingRoom(result);
      })
      .catch(error => {
        const busError = get(error, 'busError', {});
        Toast.fail(`加载会议室失败，${busError.message || error.message}`, undefined, () => {
          if (busError.code === -32404) {
            router.goBack();
          }
        });
        setLoading(false);
      });
  }, []);

  let meetingRoomItem = null;
  if (meetingRoom != null) {
    meetingRoomItem = (
      <DocumentTitle title={meetingRoom.name}>
        <Card full={true}>
          <Card.Body>
            <MeetingRoomDetail meetingRoom={meetingRoom} />
          </Card.Body>
        </Card>
      </DocumentTitle>
    );
  }

  return (
    <div className={styles['meetingroom-item']}>
      <ActivityIndicator
        toast={true}
        animating={loading}
        text="正在加载会议室"
      />
      <div className={styles['meetingroom-fixed']}>
        {meetingRoomItem}
        <Accordion>
          <Accordion.Panel header="添加预约" key="add-reservation">
            <AddReservation roomId={roomId} />
          </Accordion.Panel>
        </Accordion>
      </div>
      <WhiteSpace size="lg" />
      <div className={styles['meetingroom-reservations']}>
        <ReservationList roomId={roomId}/>
      </div>
    </div>
  );
}

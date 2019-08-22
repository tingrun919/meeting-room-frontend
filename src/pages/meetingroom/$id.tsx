import React, { useState } from 'react';
import { connect, DispatchProp } from 'dva';
import { RouteComponentProps } from 'react-router';
import DocumentTitle from 'react-document-title';
import { ActivityIndicator, Accordion, Card, WhiteSpace } from 'antd-mobile';

import MeetingRoomDetail from '@/components/MeetingRoomDetail';
import AddReservation from './components/AddReservation';
import ReservationList from './components/ReservationList';

import { GlobalState } from '@/models-helper/models';
import { MeetingRoom } from '@/apis/MeetingRoom';

import styles from './MeetingRoomItem.less';

interface MeetingRoomItemProps
  extends RouteComponentProps<{ id: string }>, DispatchProp {
  loading?: boolean;
  meetingRoom: MeetingRoom;
}

function MeetingRoomItem({ match, loading, meetingRoom }: MeetingRoomItemProps) {
  const { id: roomId } = match.params;
  const [activeKey, setActiveKey] = useState();

  function collapseAddReservation() {
    setActiveKey(null);
  }

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
        <Accordion activeKey={activeKey} onChange={setActiveKey}>
          <Accordion.Panel header="添加预约" key="add-reservation">
            <AddReservation
              roomId={roomId}
              onAdded={collapseAddReservation}
            />
          </Accordion.Panel>
        </Accordion>
      </div>
      <WhiteSpace size="xl" />
      <div className={styles['meetingroom-reservations']}>
        {meetingRoom && <ReservationList roomId={roomId} />}
      </div>
    </div>
  );
}

function mapStateToProps(state: GlobalState) {
  return {
    meetingRoom: state.roomItem!.meetingRoom,
    loading: state.loading.effects['roomItem/fetchMeetingRoom']
  };
}

export default connect(mapStateToProps)(MeetingRoomItem);

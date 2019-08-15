
import React from 'react';
import { Card } from 'antd-mobile';

import MeetingRoomDetail from '../MeetingRoomDetail'
import MeetingRoomReservation from './components/MeetingRoomReservation';

interface MeetingRoomRowProps {
  rowData: any,
  rowID: any,
}

const MeetingRoomRow = ({ rowData, rowID }: MeetingRoomRowProps) => {
  return (
    <Card
      key={rowID}
    >
      <Card.Body>
        <MeetingRoomDetail
          meetingRoom={rowData}
        />
        <MeetingRoomReservation
          reservationData={rowData}
        />
      </Card.Body>
    </Card >
  );
}

export default MeetingRoomRow

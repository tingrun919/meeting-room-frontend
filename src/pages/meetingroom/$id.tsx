import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Accordion, WhiteSpace } from 'antd-mobile';

import AddReservation from './components/AddReservation';
import ReservationList from './components/ReservationList';

interface MeetingRoomItemProps extends RouteComponentProps<{ id: string }> {

}

export default function MeetingRoomItem({ match }: MeetingRoomItemProps) {
    const { id: roomId } = match.params;
    return (
      <div>
        <Accordion>
          <Accordion.Panel header="添加预约" key="add-reservation">
            <AddReservation />
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace size="lg" />
        <ReservationList roomId={roomId}/>
      </div>
    );
}

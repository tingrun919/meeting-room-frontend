import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Accordion } from 'antd-mobile';

import AddReservation from './AddReservation';

interface MeetingRoomItemProps extends RouteComponentProps<{ id: string }> {

}

export default function MeetingRoomItem({ match }: MeetingRoomItemProps) {
    return (
      <div>
        <Accordion>
          <Accordion.Panel header="添加预约" key="add-reservation">
            <AddReservation />
          </Accordion.Panel>
        </Accordion>
      </div>
    );
}

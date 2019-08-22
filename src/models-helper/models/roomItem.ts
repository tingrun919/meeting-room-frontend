import { MeetingRoom } from '@/apis/MeetingRoom';
import { RoomUseRecord } from '@/apis/RoomUseRecord';

export default interface RoomItemState {
  meetingRoom: MeetingRoom;
  reservationList: RoomUseRecord[];
}

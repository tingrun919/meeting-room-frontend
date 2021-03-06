import request from '@/utils/request';
import { MeetingRoom } from '@/apis/MeetingRoom';

/**
 * 获取会议室列表
 * @returns
 */
const handleRoomList = () => {
  return request(`/meetingrooms`);
}

const handleDoneReservation = (params: any) => {
  return request.post(`/roomuserecords/finish`, params)
}

export function reservationList({ roomId }: { roomId: string }) {
  return request.get(`/meetingrooms/${roomId}/userecords`);
}

export function getMeetingRoom(roomId: string) {
  return request.get(`/meetingrooms/${roomId}`) as Promise<MeetingRoom>;
}

export {
  handleRoomList,
  handleDoneReservation
}

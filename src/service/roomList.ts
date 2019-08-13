import request from '@/utils/request';

/**
 * 获取会议室列表
 * @returns
 */
const handleRoomList = () => {
	return request(`/meetingrooms`);
}

export function reservationList({ roomId }: { roomId: string }) {
  return request.get(`/meetingrooms/${roomId}/userecords`);
}

export {
	handleRoomList,
}

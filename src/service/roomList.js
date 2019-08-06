import request from '../utils/request'

/**
 * 获取会议室列表
 * @returns
 */
const handleRoomList = () => {
	return request(`/meetingrooms`);
}

export {
	handleRoomList,
}
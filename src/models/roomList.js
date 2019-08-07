import { handleRoomList } from '../service/roomList';

export default {
	namespace: 'roomList',
	state: {
		roomList: [],
	},
	effects: {
		*fetchList({ payload }, { call, put }) {
			const response = yield call(handleRoomList, payload)
			yield put({
				type: "setRoomList",
				payload: response
			})
		}
	},
	reducers: {
		setRoomList(state, { payload }) {
			return {
				...state,
				roomList: payload,
			}
		}
	}
}
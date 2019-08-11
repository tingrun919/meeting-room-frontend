import { reservationList } from '@/service/roomList';
import roomUseRecordService from '@/service/roomUseRecord';

const model = {
  namespace: 'roomItem',
  state: {
    reservationList: [],
  },
  reducers: {
    reservationList(state, { payload: { data } }) {
      return {
        ...state,
        reservationList: data
      };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(reservationList, payload);
      yield put({
        type: 'reservationList',
        payload: {
          data: result
        }
      });
    },
    *create({ payload }, { call, put }) {
      yield call(roomUseRecordService.create, payload);
      yield put.resolve({
        type: 'fetch',
        payload: {
          roomId: payload.meetingRoom
        }
      });
    }
  }
};

export default model;

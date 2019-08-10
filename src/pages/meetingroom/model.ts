import { reservationList } from '@/service/roomList';

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
    }
  }
};

export default model;

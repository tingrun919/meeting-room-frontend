import { reservationList, handleDoneReservation } from '@/service/roomList';
import roomUseRecordService from '@/service/roomUseRecord';
import { Toast } from 'antd-mobile';

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
    },

    /**
     * 完成预约
     * @param {*} { payload }
     * @param {*} { call }
     * @returns
     */
    *fetchReservationDone({ payload }, { call }) {
      try {
        const response = yield call(handleDoneReservation, payload)
        return response
      } catch ({ busError }) {
        Toast.fail(busError.message)
      }

    }
  }
};

export default model;

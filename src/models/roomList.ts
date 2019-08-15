import { handleRoomList } from '../service/roomList';
import { Action, Reducer } from 'redux';
import { DvaUmiModel } from '../DvaUmiModel';
import { MeetingRoom } from '@/apis/MeetingRoom';

// #region Model Types
interface RoomListState {
  roomList: MeetingRoom[];
}

interface SetRoomList extends Action {
  payload: MeetingRoom[];
}

interface RoomListReducers {
  setRoomList: Reducer<RoomListState, SetRoomList>;
}
// #endregion

const model: DvaUmiModel<RoomListReducers> = {
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
    },
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

export default model;

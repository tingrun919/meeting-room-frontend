import { reservationList, handleDoneReservation } from '@/service/roomList';
import router from 'umi/router';
import { SubscriptionAPI, EffectsCommandMap } from 'dva';
import { Toast } from 'antd-mobile';
import { get } from 'lodash';
import { Reducer, Action, AnyAction } from 'redux';
import { EffectsActionsMapping, DvaUmiModel } from '@/models-helper/DvaUmiModel';

import roomUseRecordService from '@/service/roomUseRecord';
import { getMeetingRoom } from '@/service/roomList';
import { MeetingRoom } from '@/apis/MeetingRoom';
import { RoomUseRecord, CreateRoomUseRecord } from '@/apis/RoomUseRecord';

const MeetingRoomPagePattern = /^\/meetingroom\/(.*)$/;

// #region Model Types
export interface RoomItemState {
  meetingRoom?: MeetingRoom;
  reservationList?: RoomUseRecord[];
}

interface SetMeetingRoomAction extends Action {
  payload: { meetingRoom: MeetingRoom };
}

interface ReservationListAction extends Action {
  payload: { data: RoomUseRecord[] };
}

interface FetchMeetingRoomAction extends Action {
  payload: { roomId: string };
}

interface FetchReservationAction extends Action {
  payload: { roomId: string };
}

interface CreateAction extends Action {
  payload: CreateRoomUseRecord;
}

interface RoomItemReducers {
  setMeetingRoom: Reducer<RoomItemState, SetMeetingRoomAction>;
  reservationList: Reducer<RoomItemState, ReservationListAction>;
}

type RoomItemEffects = EffectsActionsMapping<{
  fetchMeetingRoom: FetchMeetingRoomAction;
  fetch: FetchReservationAction;
  create: CreateAction;
  fetchReservationDone: AnyAction;
}>;
// #endregion

const model: DvaUmiModel<RoomItemReducers, RoomItemEffects> = {
  state: {
    meetingRoom: null,
    reservationList: [],
  },
  reducers: {
    setMeetingRoom(state, { payload }) {
      return {
        ...state,
        meetingRoom: payload.meetingRoom
      };
    },
    reservationList(state, { payload: { data } }) {
      return {
        ...state,
        reservationList: data
      };
    },
  },
  effects: {
    *fetchMeetingRoom({ payload }, { call, put }: EffectsCommandMap) {
      try {
        const meetingRoom = yield call(getMeetingRoom, payload.roomId);
        yield put({
          type: 'setMeetingRoom',
          payload: {
            meetingRoom
          }
        });
      } catch (error) {
        const busError = get(error, 'busError', {});
        Toast.fail(`加载会议室失败，${busError.message || error.message}`, undefined, () => {
          if (busError.code === -32404) {
            router.goBack();
          }
        });
      }
    },
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
      const record = yield call(roomUseRecordService.create, payload);
      yield put.resolve({
        type: 'fetch',
        payload: {
          roomId: payload.meetingRoom
        }
      });
      return record;
    },

    /**
     * 完成预约
     */
    *fetchReservationDone({ payload }, { call, select, put }: EffectsCommandMap) {
      try {
        const response = yield call(handleDoneReservation, payload);
        const meetingRoom = yield select((state: { roomItem: RoomItemState }) => state.roomItem.meetingRoom);
        yield put({
          type: 'fetch',
          payload: {
            roomId: meetingRoom.id
          }
        });
        return response;
      } catch ({ busError }) {
        Toast.fail(busError.message);
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }: SubscriptionAPI) {
      return history.listen(({ pathname }) => {
        const roomIdMatch = pathname.match(MeetingRoomPagePattern);
        if (roomIdMatch != null) {
          const [, roomId] = roomIdMatch;
          dispatch({
            type: 'fetchMeetingRoom',
            payload: { roomId }
          });
        }
      });
    }
  }
};

export default model;

import RoomListState from './roomList';
import RoomItemState from './roomItem';

export interface GlobalState {
  roomList: RoomListState;
  roomItem?: RoomItemState;
  // inherit from dva-loading index.d.ts
  loading: {
    global: boolean;
    models: { [type: string]: boolean | undefined };
    effects: { [type: string]: boolean | undefined };
  }
}

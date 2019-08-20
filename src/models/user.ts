import { DvaModelBuilder } from 'dva-model-creator';

import { fetchUser, setUser, User } from '@/actions/user';
import userService from '@/service/user';

export interface UserState {
  user: User | null;
}

const model = new DvaModelBuilder({
  user: null
} as UserState, 'user')
  .case(setUser, (state, user) => ({
    ...state,
    user,
  }))
  .takeLatest(fetchUser, function* ({ code }, { call, put }) {
    const userInfo = yield call(userService.fetchUser, { code });
    yield put(setUser(userInfo));
  })
  .build();

export default model;

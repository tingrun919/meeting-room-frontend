import { actionCreatorFactory } from 'dva-model-creator';

export interface FetchUserIn {
  code: string;
}

export interface User {
  name: string;
}

const actionCreator = actionCreatorFactory('user');

export const setUser = actionCreator<User>('setUser');

export const fetchUser = actionCreator<FetchUserIn>('fetchUser');

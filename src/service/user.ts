import { request } from '@/utils/request';

export function fetchUser({ code }: { code: string }) {
  return request.get(`/dingtalk/userInfo?code=${code}`);
}

export default {
  fetchUser
};

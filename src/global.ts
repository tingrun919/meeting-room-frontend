import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLock
} from '@fortawesome/free-solid-svg-icons';

import dd from 'dingtalk-jsapi';

import 'animate.css/animate.css';

library.add(
  faLock
);

if (dd.env.platform !== 'notInDingTalk') {
  dd.ready(async () => {
    try {
      const result = await dd.runtime.permission.requestAuthCode({
        corpId: 'ding57647d02b92db630'
      });
      (window as any).g_app._store.dispatch({
        type: 'user/fetchUser',
        payload: {
          code: result.code
        }
      });
    } catch(err) {
      alert('获取钉钉授权失败：\n' + JSON.stringify(err));
    };
  });
}

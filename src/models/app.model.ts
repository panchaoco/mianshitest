import { EffectsCommandMap } from "dva";
import { getRecommendData, getAppListData } from "@/services/app.service";

export default {
  namespace: 'app',
  state: {
    recommendData: null,
    appList: null
  },
  effects: {
    *getRecommendData({ payload }: any, { call, put, select }: EffectsCommandMap) {
      const res = yield call(getRecommendData);
      yield put({
        type: 'updateRecommendData',
        payload: {
          recommendData: res.feed
        }
      })
    },
    *getAppListData({ payload }: any, { call, put, select }: EffectsCommandMap) {
      const res = yield call(getAppListData, payload);
      let data = yield select(({app}) => ({app}));
      console.log('data', data);
      if (data.appList) {
        data.appList.entry.concat(res.feed.entry);
      } else {
        data = res.feed;
      }
      yield put({
        type: 'updateAppListData',
        payload: {
          appList: res.feed
        }
      });
      return Promise.resolve(res);
    }
  },

  reducers: {
    updateRecommendData: (state, action) => ({...state, ...action.payload}),
    updateAppListData: (state, action) => ({...state, ...action.payload}),
  }
}

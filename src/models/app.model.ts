import { EffectsCommandMap, DvaInstance } from "dva";
import request from '../utils/fetch'

export default {
  namespace: 'app',
  state: {

  },
  effects: {
    *getRecommendData({ payload }: any, { call, put, select }: EffectsCommandMap) {
      const res = yield call(request('/api/getRecommendData'))
    }
  },

  reducers: {

  }
}

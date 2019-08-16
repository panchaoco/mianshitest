import { EffectsCommandMap, DvaInstance } from "dva";

export default {
  namespace: 'home',
  state: {

  },
  effects: {
    *getRecommendData({ payload }: any, { call, put, select }: EffectsCommandMap) {
      const res = yield call(require('../service/recomendData.json'))
    }
  },

  reducers: {

  }
}

import { createStore, createLogger } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import pdf from './modules/pdf';
import sign from './modules/sign';

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    isLoading: false,
    loadingMsg: '上傳中...',
  },
  actions,
  mutations,
  modules: {
    pdf,
    sign,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
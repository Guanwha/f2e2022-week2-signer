import { createStore, createLogger } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import pdf from './modules/pdf';

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
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
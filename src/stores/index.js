import { createStore, createLogger } from 'vuex'
import pdf from './modules/pdf'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    loadingMsg: '上傳中...',
    isLoading: false,
  },
  modules: {
    pdf,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
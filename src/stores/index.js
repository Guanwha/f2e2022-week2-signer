import { createStore, createLogger } from 'vuex'
import pdf from './modules/pdf'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    pdf,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
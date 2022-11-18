import { ui } from './types';


export default {
  /** ui */
  [ui.SET_LOADING](state, { status, msg }) {
    state.isLoading = status;
    state.loadingMsg = (msg && msg.length > 0) ? msg : '';
  },
};
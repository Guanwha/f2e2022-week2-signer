import { ui } from './types';


export default {
  /** ui */
  startLoading(context, msg) {
    context.commit(ui.SET_LOADING, { status: true, msg });
  },
  endLoading(context) {
    context.commit(ui.SET_LOADING, { status: false });
  },
};
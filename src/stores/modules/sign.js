import { sign } from '../types';


// initial state
const state = () => ({
  signs: [],
  currentSignIdx: null,
});

// actions
const actions = {
  addSignFile(context, image) {
    context.commit(sign.ADD_SIGN, image);
  },
  removeSign(context, idx) {
    context.commit(sign.REMOVE_SIGN, idx);
  },
};

// mutations
const mutations = {
  [sign.ADD_SIGN](state, image) {
    if (image && image.preview) {
      state.sign.push( file.preview );
    }
  },
  [sign.REMOVE_SIGN](state, idx) {
    if (state.sign[idx]) {
      state.sign.splice(idx, 1);
    }
  },
  [sign.SET_CURRENT_SIGN](state, idx) {
    state.currentSignIdx = idx;
  },
};

// getters
const getters = {
  signs(state) {
    return state.signs;
  },
  currentSign(state) {
    return state.signs[state.currentSignIdx];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
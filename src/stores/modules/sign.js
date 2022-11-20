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
    console.log(image);
    if (image) {
      state.signs.push( image );
      state.currentSignIdx = state.signs.length - 1;
      // [TODO] update localStorage
    }
  },
  [sign.REMOVE_SIGN](state, idx) {
    if (state.signs[idx]) {
      state.signs.splice(idx, 1);
      // [TODO] update localStorage
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
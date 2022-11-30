import { sign } from '../types';


// initial state
const state = () => ({
  signs: JSON.parse(localStorage.getItem('sg')) || [],
  currentSignIdx: null,
});

// actions
const actions = {
  addSignFile(context, image) {
    context.commit(sign.ADD_SIGN, image);
  },
  selectSign(context, idx) {
    context.commit(sign.SET_CURRENT_SIGN, idx);
  },
  deleteSign(context, idx) {
    context.commit(sign.DELETE_SIGN, idx);
  },
};

// mutations
const mutations = {
  [sign.ADD_SIGN](state, image) {
    if (image) {
      state.signs.push( image );
      state.currentSignIdx = state.signs.length - 1;
      localStorage.setItem('sg', JSON.stringify(state.signs));
    }
  },
  [sign.DELETE_SIGN](state, idx) {
    if (state.signs[idx]) {
      state.signs.splice(idx, 1);
      localStorage.setItem('sg', JSON.stringify(state.signs));
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
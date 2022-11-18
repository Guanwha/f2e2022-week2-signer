import { pdf } from '../types';


// initial state
const state = () => ({
  pdf: null,
  signs: [],
})

// actions
const actions = {
  setCurrentPDF(context, file) {
    context.commit(pdf.SET_PDF, file);
  },
}

// mutations
const mutations = {
  [pdf.SET_PDF](state, file) {
    state.pdf = file;
  },
}

// getters
const getters = {
  signs: (state, getters, rootState) => {
    return state.signs;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
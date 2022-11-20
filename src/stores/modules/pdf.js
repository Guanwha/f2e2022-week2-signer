import { pdf } from '../types';


// initial state
const state = () => ({
  pdf: null,
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
  currentPDF(state) {
    return state.pdf;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
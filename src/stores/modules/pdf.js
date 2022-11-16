
// initial state
const state = () => ({
  signs: [],
})

// actions
const actions = {
}

// mutations
const mutations = {
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
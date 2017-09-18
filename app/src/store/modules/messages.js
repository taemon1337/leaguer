import { MessageTypes } from '../mutation-types'

const state = {
  all: []
}

// getters
const getters = {
  [MessageTypes.all]: state => state.all
}

// actions
const actions = {
  [MessageTypes.add] ({ commit }, message) {
    commit(MessageTypes.add, message)
  },
  [MessageTypes.remove] ({ commit }, idx) {
    commit(MessageTypes.remove, idx)
  },
  [MessageTypes.clear] ({ commit }) {
    commit(MessageTypes.clear)
  }
}

// mutations must be synchronous
const mutations = {
  [MessageTypes.add] (state, message) {
    state.all.push(message)
  },
  [MessageTypes.remove] (state, idx) {
    state.all.splice(idx, 1)
  },
  [MessageTypes.clear] (state, idx) {
    state.all = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

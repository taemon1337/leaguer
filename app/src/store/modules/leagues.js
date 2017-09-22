import { LeagueTypes, MessageTypes } from '../mutation-types'
import api from '@/api'
import store from '@/store'

const state = {
  all: [],
  activeId: null
}

// getters
const getters = {
  [LeagueTypes.all]: state => state.all,
  [LeagueTypes.find]: function (state) {
    return function (id) {
      return state.all.filter(item => { return item.id === id })
    }
  },
  [LeagueTypes.active]: state => state.all.filter(function (l) { return l.id === state.activeId })[0]
}

// actions
const actions = {
  [LeagueTypes.all] ({ commit }) {
    api.leagues.all().then(function (resp) {
      commit(LeagueTypes.all, resp)
    }).catch(function (err) {
      store.dispatch(MessageTypes.add, {
        type: 'is-danger',
        message: 'Error fetching leagues! ' + err.toString()
      })
    })
  },
  [LeagueTypes.active] ({ commit }, id) {
    api.leagues.get(id).then(function (resp) {
      commit(LeagueTypes.add, resp)
    }).catch(function (err) {
      store.dispatch(MessageTypes.add, {
        type: 'is-danger',
        message: 'Error fetching league with id ' + id + '\n' + err.toString()
      })
    })
  },
  [LeagueTypes.find] ({ commit }, id) {
    return api.leagues.get(id).then(function (resp) {
      commit(LeagueTypes.add, resp)
      return resp
    }).catch(function (err) {
      store.dispatch(MessageTypes.add, {
        type: 'is-danger',
        message: 'Error fetching league with id ' + id + '\n' + err.toString()
      })
    })
  },
  [LeagueTypes.save] ({ commit }, record) {
    api.leagues.save(record).then(function (resp) {
      commit(LeagueTypes.add, Object.assign(record, resp))
      store.dispatch(MessageTypes.add, {
        message: 'Saved ' + record.title + '!',
        type: 'is-success'
      })
    }).catch(function (err) {
      store.dispatch(MessageTypes.add, {
        type: 'is-danger',
        message: 'Error saving "' + record.title + '"' + err.toString(),
        actionText: 'Ok'
      })
    })
  },
  [LeagueTypes.remove] ({ commit }, record) {
    api.leagues.remove(record).then(function (resp) {
      commit(LeagueTypes.remove, record)
    })
    .catch(function (err) {
      store.dispatch(MessageTypes.add, {
        type: 'is-success',
        message: 'Removed ' + record.title + '!' + err.toString(),
        actionText: 'Ok'
      })
    })
  }
}

// mutations must be synchronous
const mutations = {
  [LeagueTypes.all] (state, leagues) {
    state.all = leagues
  },
  [LeagueTypes.add] (state, league) {
    let found = state.all.length // append if not found
    state.all.forEach(function (l, i) {
      if (l.id === league.id) {
        found = i // update existing record
      }
    })
    state.all.splice(found, 1, league)
    state.activeId = league.id
  },
  [LeagueTypes.active] (state, id) {
    if (!id) {
      state.activeId = null
    } else {
      state.all.forEach(function (l) {
        if (l.id === id) {
          state.activeId = id
        }
      })
    }
  },
  [LeagueTypes.remove] (state, league) {
    let found = state.all.length // append if not found
    state.all.forEach(function (l, i) {
      if (l.id === league.id) {
        found = i
      }
    })
    state.all.splice(found, 1)
    state.activeId = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

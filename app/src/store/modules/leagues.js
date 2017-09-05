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
  [LeagueTypes.active]: state => state.all[state.activeId]
}

// actions
const actions = {
  [LeagueTypes.all] ({ commit }) {
    api.leagues.all().then(function (resp) {
      commit(LeagueTypes.all, resp)
    }).catch(function (err) {
      store.dispatch(MessageTypes.add, {
        klass: 'notification is-danger',
        title: 'Error fetching leagues',
        content: err.toString()
      })
    })
  },
  [LeagueTypes.active] ({ commit }, leagueId) {
    api.leagues.get(leagueId).then(function (resp) {
      commit(LeagueTypes.add, resp)
      commit(LeagueTypes.active, leagueId)
    }).catch(function (err) {
      store.dispatch(MessageTypes.add, {
        klass: 'notification is-danger',
        title: 'Error fetching league with id ' + leagueId,
        content: err.toString()
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
      if (l.leagueId === league.leagueId) {
        found = i // update existing record
      }
    })
    state.all.splice(found, 1, league)
  },
  [LeagueTypes.active] (state, leagueId) {
    state.all.forEach(function (l) {
      if (l.leagueId === leagueId) {
        state.activeId = leagueId
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

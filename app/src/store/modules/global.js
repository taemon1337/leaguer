import { GlobalTypes, MessageTypes } from '../mutation-types'
import store from '@/store'

let gapi = require('@/assets/gapi.platform.js')
let auth2 = null

const state = {
  fullscreen: false,
  filter: null
}

// getters
const getters = {
  [GlobalTypes.isSignedIn]: state => auth2 ? auth2.isSignedIn.get() : null,
  [GlobalTypes.currentUser]: function (state) {
    if (auth2 && auth2.isSignedIn.get()) {
      let profile = auth2.currentUser.get().getBasicProfile()
      return {
        id: profile.getId(),
        name: profile.getName(),
        photo: profile.getImageUrl(),
        email: profile.getEmail()
      }
    } else {
      return {}
    }
  },
  [GlobalTypes.fullscreen]: state => state.fullscreen,
  [GlobalTypes.filter]: state => state.filter
}

// actions
const actions = {
  [GlobalTypes.fullscreen] ({ commit }) {
    commit(GlobalTypes.fullscreen)
  },
  [GlobalTypes.filter] ({ commit }, filter) {
    commit(GlobalTypes.filter, filter)
  },
  [GlobalTypes.signin] ({ commit }) {
    commit(GlobalTypes.signin)
  },
  [GlobalTypes.signout] ({ commit }) {
    commit(GlobalTypes.signout)
  }
}

// mutations must be synchronous
const mutations = {
  [GlobalTypes.fullscreen] (state) {
    state.fullscreen = !state.fullscreen
  },
  [GlobalTypes.filter] (state, filter) {
    state.filter = filter
  },
  [GlobalTypes.signin] (state) {
    gapi.load('auth2', function () {
      auth2 = gapi.auth2.init({
        client_id: '761319481081-qdhsn5m2llie9qa6rtaf1an0vgpqlg92.apps.googleusercontent.com',
        scope: 'profile email'
      })

      auth2.isSignedIn.listen(function (val) {
        if (!val) {
          store.dispatch(MessageTypes.add, {
            title: 'Signed Out!',
            klass: 'notification is-info'
          })
        } else {
          console.log('Signed in status changed to ', val)
        }
      })

      auth2.currentUser.listen(function (user) {
        console.log('user changed')
      })

      if (auth2.isSignedIn.get() === true) {
        console.log('is signed in!')
        auth2.signIn()
      }
    })
  },
  [GlobalTypes.signout] (state) {
    auth2.signOut().then(function () {
      store.dispatch(MessageTypes.add, {
        title: 'Signed out!',
        klass: 'notification is-success'
      })
    })
    auth2 = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import axios from 'axios'

let initData = require('@/assets/leagues')

let http = axios.create({
  baseURL: '/api',
  timeout: 60000
})

let leagues = {
  all: function () {
    return new Promise(function (resolve, reject) {
      http.get('/leagues').then(function (resp) {
        if (resp.data && resp.data.length) {
          resolve(resp.data)
        } else {
          resolve(initData.default.leagues)
        }
      }).catch(reject)
    })
  },
  get: function (id) {
    return http.get('/leagues/' + id)
  }
}

export default {
  http: http,
  leagues: leagues
}

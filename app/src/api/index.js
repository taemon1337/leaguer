import axios from 'axios'

let http = axios.create({
  baseURL: '/api',
  timeout: 60000
})

let proxy = axios.create({
  baseURL: '/proxy/',
  timeout: 10000
})

proxy.interceptors.request.use(function (req) {
  req.url = req.baseURL + req.url
  return req
})

let leagues = {
  all: function () {
    return new Promise(function (resolve, reject) {
      http.get('/leagues').then(function (resp) {
        resolve(resp.data)
      }).catch(reject)
    })
  },
  get: function (id) {
    return http.get('/leagues/' + id).then(function (resp) {
      return resp.data
    })
  },
  save: function (record) {
    if (record.id) {
      return http.put('/leagues/' + record.id, record).then(function (resp) { return resp.data })
    } else {
      return http.post('/leagues/' + record.id, record).then(function (resp) { return resp.data })
    }
  }
}

export default {
  http: http,
  proxy: proxy,
  leagues: leagues
}

var request = require('request');

module.exports = function (app) {
  app.get('/proxy/*', function (req, res, next) {
    try {
      var url = req.originalUrl.toString().split('proxy/').pop();
      console.log('PROXY -> ' + url);
      req.pipe(request(url)).pipe(res);
    } catch (err) {
      console.warn('Error in proxy: ', err)
      return res.sendStatus(400);
    }
  })
}
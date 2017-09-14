'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var request = require('request');
var cities = require('cities');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

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

app.get('/cities', function (req, res, next) {
  console.log('CITIES: ' + req.query.city);
  res.setHeader('Content-Type', 'application/json');
  let matches = [];

  if (req.query.state) {
    matches = cities.findByState(req.query.state);
  } else if (req.query.zip) {
    matches = cities.zip_lookup(req.query.zip);
  } else if (req.query.gps) {
    var g = req.query.gps.split(',');
    matches = cities.zip_lookup(g.shift(), g.shift());
  } else {
    return res.send(JSON.stringify({ error: true, message: "No state, zip, or gps provided."}, null, 2))
  }

  if (req.query.city) {
    var filtered = [];
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].city.toLowerCase().match(req.query.city.toLowerCase())) {
        if (filtered.length < 100) {
          filtered.push(matches[i]);
        } else {
          break;
        }
      }
    }
    matches = filtered
  }

  res.send(JSON.stringify(matches, null, 2));
})


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

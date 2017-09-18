var path = require('path');
var cities = require('cities');
var maxmind = require('maxmind');
var mmdb = path.join(__dirname, '../..', 'GeoLite2-City_20170905/GeoLite2-City.mmdb');
var cityLookup = maxmind.openSync(mmdb);

module.exports = function (app) {
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
  
  app.get('/ipgeo', function (req, res, next) {
    console.log('IP GEO: ' + req.connection.remoteAddress);
    res.setHeader('Content-Type', 'application/json');
    var geo = cityLookup.get(req.connection.remoteAddress);
    res.send(JSON.stringify(geo, null, 2));
  });
}

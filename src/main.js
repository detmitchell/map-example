var Map = require('./components/map'),
    testData = require('../test_resources/sample').data;

var map = new Map({
  id: 'map',
  center: {lat: 41.87, lng: -87.62},
  zoom: 13
});

map.mapData(testData);
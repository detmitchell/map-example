var Map = require('./components/map'),
    testData = require('../test_resources/sample').data;

//Initialize map
var map = new Map({
  id: 'map',
  center: {lat: 41.87, lng: -87.62},
  zoom: 13
});

//Map data - testData should be replaced with real data
map.mapData(testData);
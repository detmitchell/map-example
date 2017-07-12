var Map = require('./components/map');
var dataUtil = require('../test_resources/sample');

//Initialize map
var map = new Map({
  id: 'map',
  center: {lat: 41.87, lng: -87.62},
  zoom: 13
});

// var getPromise = $.ajax({
// 	'method': 'GET',
// 	'url': '/mapData'
// });

dataUtil.getData()
.done(function(data, textStatus, jqXHR)  {
	//Map data - testData should be replaced with real data
	map.mapData(data.data);
})
.fail(function(err) {
	console.log(err);
});

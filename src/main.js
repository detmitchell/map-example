var Map = require('./components/map');
var dataUtil = require('../test_resources/sample');

//Initialize map
var map = new Map({
  id: 'map',
  center: {lat: 41.87, lng: -87.62},
  zoom: 13
});

function fetchMapData(){
	dataUtil.getData()
		.done(function(resp,textStatus, jqXHR){
			map.removeLines(resp.data, map.mapData);
		})
		.fail(function(err){
			console.log(err);
		});
}

fetchMapData();
setInterval(function(){
	fetchMapData();
},30*1000);

import Map from './components/map/map.component';
import { getData } from '../test_resources/sample';

//Initialize map
let map = new Map({
  id: 'map',
  center: {lat: 41.87, lng: -87.62},
  zoom: 13
});

function fetchMapData(){
	getData()
		.done(function(resp,textStatus, jqXHR){
			map.mapData(resp.data);
		})
		.fail(function(err){
			console.log(err);
		});
}

fetchMapData();
setInterval(function(){
	fetchMapData();
},15*60*1000);

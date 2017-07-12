
function Map(config){
  console.log('Map Init');
  this._map = new google.maps.Map(document.getElementById(config.id),{
    center: config.center,
    zoom: config.zoom
  })
}

Map.prototype.mapData = function(data){
  console.log('Mapping data');
  for(var item of data){
    let coords = [
      {lat: Number(item._lif_lat), lng: Number(item.start_lon)},
      {lat: Number(item._lit_lat), lng: Number(item._lit_lon)}
    ];

    let line = new google.maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: getStrokeColor(item._traffic),
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    line.setMap(this._map);
  }
};

function getStrokeColor(speed){
  if(speed<0){
    return 'grey';
  } 
  if(speed<15){
    return 'red';
  }
  if(speed<20){
    return '#fc6a1b';
  }
  if(speed<35){
    return 'green';
  }
  return 'blue';
}

module.exports = Map;
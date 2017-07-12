const contentString = "<span class='content-string'>The speed on this segment is: </span>";

function Map(config){
  //initialize map
  console.log('Map Init');
  this._map = new google.maps.Map(document.getElementById(config.id),{
    center: config.center,
    zoom: config.zoom
  });
}

Map.prototype.mapData = function(data){
  //map all traffic data in polyLines
  console.log('Mapping data');
  for(var item of data){
    //fetch coordinates
    let coords = [
      {lat: Number(item._lif_lat), lng: Number(item.start_lon)},
      {lat: Number(item._lit_lat), lng: Number(item._lit_lon)}
    ];

    //create New line
    let line = new google.maps.Polyline({
      path: coords,
      geodesic: false,
      strokeColor: getStrokeColor(item._traffic),
      strokeOpacity: 1.0,
      strokeWeight: 2,
      clickability: true,
      speed: item._traffic //add speed property
    });

    //Draw line on map
    line.setMap(this._map);
    //Listener for clicks to show speed
    google.maps.event.addListener(line, 'click', function(event) {
      showPolyLineTag(event, this);
    });
  }
};

function getStrokeColor(speed){
  //fetch speed gradiant
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

function showPolyLineTag(event, polyLine){
  //Close any open info window
  if(this._infoWindow){
    this._infoWindow.close();
  }

  //Create new info window with content string
  //Speed -1 = data unavailable
  this._infoWindow = infoWindow = new google.maps.InfoWindow({
    content: contentString + 
      (polyLine.speed !=='-1' ? polyLine.speed : ' unavailable at this time') 
  });

  //Set info window to positionof the click and open
  this._infoWindow.setPosition(
    {lat: event.latLng.lat(), lng: event.latLng.lng()}
  );
  this._infoWindow.open(map,polyLine);
}

module.exports = Map;
const contentString = "<span class='content-string'>The speed on this segment is: </span>";

export default class Map {
  //initialize map
  constructor(config) {
    console.log('Map Init');
    this._map = new google.maps.Map(document.getElementById(config.id),{
      center: config.center,
      zoom: config.zoom
    });
  }

  mapData = async (data) => {
    if(this._lines && this._lines.length > 0){
      await this.removeLines(this._lines);
    }
    console.log('Mapping data');
    //map all traffic data in polyLines
    this._lines = [];
    for(let item of data){
      //fetch coordinates
      let coords = [
        {lat: Number(item._lif_lat), lng: Number(item.start_lon)},
        {lat: Number(item._lit_lat), lng: Number(item._lit_lon)}
      ];

      //create New line
      let line = new google.maps.Polyline({
        path: coords,
        geodesic: false,
        strokeColor: this.getStrokeColor(item._traffic),
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickability: true,
        speed: item._traffic //add speed property
      });

      //Draw line on map
      line.setMap(this._map);
      this._lines.push(line);
      //Listener for clicks to show speed
      google.maps.event.addListener(line, 'click', (event) => {
        this.showPolyLineTag(event, line);
      });
    }
  };

  getStrokeColor = (speed) => {
    //fetch speed gradiant
    //returns the first true case condition
    switch(true) {
      case speed<0 :
        return 'grey';
      
      case speed<15 :
        return 'red';
      
      case speed<20 :
        return '#fc6a1b';
      
      case speed<35 :
        return 'green';
      
      default :
        return 'blue';
    } 
  };

  removeLines = (lines) => {
    return new Promise(resolve => {
      lines.forEach((line)=>{
        line.setMap(null);
      });
      setTimeout(function(){
        resolve();
      },50);
    });
  };

  showPolyLineTag = (event, polyLine) => {
    //Close any open info window
    if(this._infoWindow){
      this._infoWindow.close();
    }

    //Create new info window with content string
    //Speed -1 = data unavailable
    this._infoWindow = new google.maps.InfoWindow({
      content: contentString + 
        (polyLine.speed !=='-1' ? polyLine.speed : ' unavailable at this time') 
    });

    //Set info window to positionof the click and open
    this._infoWindow.setPosition(
      {lat: event.latLng.lat(), lng: event.latLng.lng()}
    );
    this._infoWindow.open(map,polyLine);
  }
}
import { Component, OnInit } from '@angular/core';
import { RtgpsService } from './rtgps.service';
import { GPSData } from './GPSData';
import { LoaderService } from '../location/loader.service';
import { gpsPosition } from '../tracking/gpsPosition';
import { TrackerService } from '../tracking/tracker.service';
import { GeolocationService } from '../tracking/geolocation.service';


declare var ol: any;
declare var $: any;

@Component({
  selector: 'rtgpsang-rtgps',
  templateUrl: './rtgps.component.html',
  styleUrls: ['./rtgps.component.css']
})
export class RtgpsComponent implements OnInit {
  // public variables declaration  
  public currentMessage: GPSData;
  //public allMessages: MSGData;  
  gpsdata: string;
  token: string;
  public lat: string;
  public lon: string;
  public speed: string;
  public user: string;
  latitude: number = 18.5204;
  longitude: number = 73.8567;




  started: boolean = false;

  oLocacation: any;
  osmmap: any;


  public canSendMessage: Boolean;
  // constructor of the class to inject the service in the constuctor and call events.  
  constructor(private _rtgpsService: RtgpsService, private _locationService: LoaderService, private trackerService: TrackerService, private geoLocation: GeolocationService) {
    // this can subscribe for events  
    this.subscribeToEvents();
    // this can check for conenction exist or not.  
    this.canSendMessage = _rtgpsService.connectionExists;
    // this method call every second to tick and respone tansfered to client.  
    // setInterval(() => {  
    //     this._rtgpsService.sendTime();  
    // }, 1000);  
  }




  // private xwatchLocation(): void {
  //   this.geoLocation
  //   .watchPosition()
  //     .pipe(map(p =>
  //     `Latitude:${p.coords.latitude}
  //     Longitude:${p.coords.longitude}`
  //   ));
  // }
  // public location$: Observable<string> = 

  // public location$: Observable<string> = this.geoLocation
  // .watchPosition()
  //   .pipe(map(p =>
  //   `Latitude:${p.coords.latitude}
  //   Longitude:${p.coords.longitude}`
  // ));

  private watchLocation(): void {
    this._locationService.getPosition().then(data => {
      //debugger;
      let positionData = new gpsPosition();
      this.gpsdata = data.lat + " / " + data.lng;
      positionData.lat = (data.lat).toString();
      positionData.lon = (data.lng).toString();
      positionData.speed = (data.speed) ? data.speed.toString() : "0";
      positionData.user = (data.user) ? data.user.toString() : "0";
      positionData.recieved = new Date();
      //debugger;
      this.trackerService.addPosition(positionData, this.token)
        .subscribe(positionDataRes => { positionData = positionDataRes },
          err => null,
          () => null
        );
      console.log(`Positon: ${data.lng} ${data.lat} ${data.user} ${data.speed}`);
    });
  }



  private subscribeToEvents(): void {
    // if connection exists it can call of method.  
    this._rtgpsService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });
    // finally our service method to call when response received from server event and transfer response to some variable to be shown on the browser.  

    this._rtgpsService.messageReceived.subscribe((data: any) => {
      //debugger;
      let newdata = new GPSData();
      newdata.lat = data.lat;
      newdata.lon = data.lon;
      newdata.speed = data.speed;
      newdata.user = data.user;
      this.updateFields(newdata);

    });
  }

  private updateFields(data: GPSData): void {
    if (!this.started) {
      this.started = true;
      //debugger;
      console.log(+data.lat, +data.lon, data.user);
      //this.map.getView().setCenter(ol.proj.fromLonLat([ +this.lon, +this.lat]));
      //this.map.getView().setZoom(10);

      this.osmmap.setView(new ol.View({
        center: ol.proj.transform([+data.lat, +data.lon], "EPSG:4326", "EPSG:3857"), zoom: 11
      }));
    };
    this.lat = data.lat;
    this.lon = data.lon;
    this.speed = data.speed;
    this.user = data.user;
    console.log('Component: ' + JSON.stringify(this.lat) + JSON.stringify(this.lon) + JSON.stringify(this.speed) + JSON.stringify(this.user));


    //var iconFeatures = [];

    var iconFeature = new ol.Feature({
      //geometry: new ol.geom.Point(ol.proj.fromLonLat([21.894860, 43.309336])),
      geometry: new ol.geom.Point(ol.proj.fromLonLat([+this.lat, +this.lon])),
      user: data.user,
      speed: data.speed,
      lat: data.lat,
      lon: data.lon,
    });

    var svg = '<svg width="120" height="120"  version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="15" fill="red"><text>Speed:15</text></circle></svg>';
    //var svg = '<svg width="120" height="120"  version="1.1" xmlns="http://www.w3.org/2000/svg">'
    //+ '<circle cx="30" cy="30" r="15" fill="red"><title>Speed:'+data.speed+'</title></circle>'
    //+ '</svg>';

    var style = new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 1,
        src: 'data:image/svg+xml;utf8,' + svg,
        scale: 0.3
      }),
      text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#000' }),
        stroke: new ol.style.Stroke({
          color: '#fff', width: 2
        }),
        text: data.speed,
      })

    });

    iconFeature.setStyle(style);


    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [iconFeature
        ]
      })
    });

    this.osmmap.addLayer(layer);

  }

  ngOnInit() {

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const overlay = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.osmmap = new ol.Map({
      overlays: [overlay],
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
          atribution: 'Map data &copy; OSM.org'
        })
      ],
      //overlays: [overlay],
      view: new ol.View({

        //center: ol.proj.fromLonLat([21.895525, 43.310382]),
        //center: ol.proj.fromLonLat([36.803877, -95.009102]),
        center: ol.proj.fromLonLat([-95.009102, 36.803877]),
        zoom: 4
      })
    });
    //this.oLocacation = Observable.interval(1000).subscribe((val) => { 
    this.watchLocation();
    // Popup showing the position the user clicked
    // const popup = new ol.Overlay({
    //   element: document.getElementById("container")
    // });
    this.osmmap.addOverlay(overlay);

    this.osmmap.on("click", function(evt) {
      if(this.hasFeatureAtPixel(evt.pixel)){
        debugger;
        let user = this.getFeaturesAtPixel(evt.pixel)[0].N.user;
        const element = overlay.getElement();
        const coordinate = evt.coordinate;
        const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
  
        $(element).popover("dispose");
        overlay.setPosition(coordinate);
        // $(element).popover({
        //   placement: "top",
        //   animation: true,
        //   html: true,
        //   content: "<p>The location you clicked was:</p><code>" + hdms + "</code>"
        // });
        content.innerHTML = " <div id='options' > <span>User:"+this.getFeaturesAtPixel(evt.pixel)[0].N.user+"</span></br><span>Speed:"+this.getFeaturesAtPixel(evt.pixel)[0].N.speed+"</span></div>";
         $(element).popover("show");
      };

    });
    // const popup = new ol.Overlay({
    //   element: document.getElementById('popup')
    // });
    // //this.osmmap.addOverlay(popup);

    // this.osmmap.on('click', function (evt: any) {
    //   //alert("Test");
    //   const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(evt.coordinate));

    //   content.innerHTML = " <div id='options' >ewrwrwrwrwerwr</div>";
    //     //$('#popup').popover()
    //     //document.getElementById('popup').popover();
    //   overlay.setPosition(evt.coordinate);
    //   this.addOverlay(popup);
    //   // if(this.hasFeatureAtPixel(evt.pixel)){

    //   // };
    //   // var hit = this.hasFeatureAtPixel(evt.pixel, function(layer) {
    //   //   debugger;
    //   //   //return layer.get('name') === 'test'; // boolean
    //   //   return layer;
    //   // });
    // });


    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };


    //});  
  }





}

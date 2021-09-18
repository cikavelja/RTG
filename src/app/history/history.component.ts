import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GPSData } from '../notify/GPSData';
import { historyModel } from './Histories';
import { HistoryService } from './history.service';
import { Subscription } from 'rxjs';

declare var ol: any;
declare var $: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  public currentMessage: GPSData;
  //public allMessages: MSGData;  
  gpsdata: string;
  token: string;
   lat: string;
   lon: string;
   speed: string;
   user: string;
  latitude: number = 18.5204;
  longitude: number = 73.8567;
  histories: historyModel[];
  
    
  start: string;  
  end: string;
  oLocacation: any;
  osmmap: any;

  started: boolean = false;

  constructor(
    private historyService: HistoryService,
    private tostr: ToastrService,
  ) { }

  ngOnInit(): void {
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
  public getHistories(): void {
    debugger;

    //let newdata = new GPSData();
    // this.historyService.getHistory(this.user, this.start, this.end)
    // .subscribe(
    //   {
    //     next(position) {
    //       this.histories = position;
    //       if(position !== null){
    //         position.forEach(childObj=> {
             
    //           // newdata.lat = childObj.lon;
    //           // newdata.lon = childObj.lat;
    //           // newdata.speed = childObj.speed;
    //           // newdata.user = childObj.sender;
    //           // this.updateFields(newdata);

              
    //        });

    //       };

    //       console.log('Current Position: ', position);
    //     },
    //     error(msg) {
    //       console.log('Error Getting Location: ', msg);
    //     }
    //   }
    // );

    this.historyService.getHistory(this.user, this.start, this.end).subscribe((data: any) => {
      //debugger;

      data.forEach(childObj=> {
        let newdata = new GPSData();
        newdata.lat = childObj.lon;
        newdata.lon = childObj.lat;
        newdata.speed = childObj.speed;
        newdata.user = childObj.sender;
        this.updateFields(newdata);
       });
      // let newdata = new GPSData();
      // newdata.lat = data.lat;
      // newdata.lon = data.lon;
      // newdata.speed = data.speed;
      // newdata.user = data.user;
      // this.updateFields(newdata);

    });

    // let test = this.historyService.getHistory(this.user, this.start, this.end)
    // .subscribe(
    //   {
    //     next(position) {
    //       return position;
    //     },
    //     error(msg) {
    //       console.log('Error Getting Location: ', msg);
    //     },
    //     complete: () => { 
    //       console.log('complete') 
    //       // debugger;
    //       // if(this.histories !== null){
    //       //   this.histories.forEach(childObj=> {
             
    //       //     newdata.lat = childObj.lon;
    //       //     newdata.lon = childObj.lat;
    //       //     newdata.speed = childObj.speed;
    //       //     newdata.user = childObj.sender;
    //       //     this.updateFields(newdata);
    //       //  });

    //       //};
        
    //     }
    //   }
    // );
    // debugger;

    // this.historyService.getHistory(this.user, this.start, this.end).subscribe(
    //   hero => this.histories = hero,
    //   error => console.log("Error: ", error),
    //   function(){ 
    //     console.log('complete') 
    //     debugger;
    //     if(this.histories !== null){
    //       this.histories.forEach(childObj=> {
           
    //         newdata.lat = childObj.lon;
    //         newdata.lon = childObj.lat;
    //         newdata.speed = childObj.speed;
    //         newdata.user = childObj.sender;
    //         this.updateFields(newdata);
    //      });

    //     };
    //    }
    // );
        

  }

  userErrorFound(err:any): void {
    this.tostr.error("Error!", err.message);
  }

  public updateFields(data: GPSData): void {
    //if (!this.started) {
      //this.started = true;
      //debugger;
      console.log(+data.lat, +data.lon, data.user);
      //this.map.getView().setCenter(ol.proj.fromLonLat([ +this.lon, +this.lat]));
      //this.map.getView().setZoom(10);

      this.osmmap.setView(new ol.View({
        center: ol.proj.transform([+data.lat, +data.lon], "EPSG:4326", "EPSG:3857"), zoom: 11
      }));
    //};
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


}

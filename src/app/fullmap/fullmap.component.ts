import { Component, OnInit } from '@angular/core';
// import Map from "ol/Map";
// import Overlay from "ol/Overlay";
// import View from "ol/View";
// import { toStringHDMS } from "ol/coordinate";
// import TileLayer from "ol/layer/Tile";
// import { fromLonLat, toLonLat } from "ol/proj";
// import OSM from 'ol/source/OSM';
//import OSM from "ol/source/OSM";
declare var ol: any;
declare var $: any;

@Component({
  selector: 'app-fullmap',
  templateUrl: './fullmap.component.html',
  styleUrls: ['./fullmap.component.css']
})
export class FullmapComponent implements OnInit {
  osmmap: any;
  layer: any;
  constructor() { }

  ngOnInit() {

    this.osmmap = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      target: "map",
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });
    // this.osmmap = new ol.Map({
    //   target: 'map',
    //   layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.OSM(),
    //       atribution: 'Map data &copy; OSM.org'
    //     })
    //   ],
    //   //overlays: [overlay],
    //   view: new ol.View({

    //     //center: ol.proj.fromLonLat([21.895525, 43.310382]),
    //     //center: ol.proj.fromLonLat([36.803877, -95.009102]),
    //     center: ol.proj.fromLonLat([-95.009102, 36.803877]),
    //     zoom: 4
    //   })
    // });

    const pos = ol.proj.fromLonLat([16.3725, 48.208889]);

    // // Vienna marker
    // this.marker = new ol.Overlay({
    //   position: pos,
    //   positioning: "center-center",
    //   element: document.getElementById("marker"),
    //   stopEvent: false
    // });
    // this.map.addOverlay(this.marker);

    // // Vienna label
    // this.vienna = new Overlay({
    //   position: pos,
    //   element: document.getElementById("vienna")
    // });
    // this.map.addOverlay(this.vienna);

    // Popup showing the position the user clicked
    const popup = new ol.Overlay({
      element: document.getElementById("popup")
    });
    this.osmmap.addOverlay(popup);

    this.osmmap.on("click", function(evt) {
      const element = popup.getElement();
      const coordinate = evt.coordinate;
      const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));

      $(element).popover("dispose");
      popup.setPosition(coordinate);
      $(element).popover({
        placement: "top",
        animation: true,
        html: true,
        content: "<p>The location you clicked was:</p><code>" + hdms + "</code>"
      });
      $(element).popover("show");
    });
  }

}

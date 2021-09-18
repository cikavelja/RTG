import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gpsPosition } from './gpsPosition';

@Injectable({
  providedIn: 'root'
})
// export class GeolocationService {

//   constructor() { }
// }
// @Injectable()
export class GeolocationService {
  public isGeoLocationSupported: boolean;
  private geoOptions = {
    enableHighAccuracy: true, maximumAge: 30000, timeout: 27000
  };
  constructor() {
    if (navigator.geolocation) {
      //debugger;
      this.isGeoLocationSupported = true;
    } else {
      // geolocation is not supported, fall back to other options
      //debugger;
      this.isGeoLocationSupported = false;
    }
  }


  getCurrentPosition(): Observable<gpsPosition> {
    return Observable.create(obs => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            //debugger;
            obs.next(position);
            obs.complete();
          },
          error => {
            //debugger;
            obs.error(error);
          }
        );
      }
    });
  }
  watchPosition(): Observable<gpsPosition> {
    return Observable.create(obs => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          position => {
            //debugger;
            obs.next(position);
          },
          error => {
            //debugger;
            obs.error(error);
          },
          this.geoOptions
        );
      }
    });
  }
}

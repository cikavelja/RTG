import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIGURATION } from '../app.constants';
import { historyModel } from './Histories';

const API_URL = CONFIGURATION.baseUrls.server;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(username: string,start: string,end: string): Observable<historyModel[]> {
    //return this.http.get<historyModel[]>(API_URL+"api/History?sender="+username+"&start="+start+"&end="+end, httpOptions);
    return this.http.get<historyModel[]>(API_URL+"/History?sender="+username+"&start="+start+"&end="+end, httpOptions);
  }
}

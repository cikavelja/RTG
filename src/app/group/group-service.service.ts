import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from './group';
import { AppUser } from '../security/app-user';
import { CONFIGURATION } from '../app.constants';



const API_URL = CONFIGURATION.baseUrls.server;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class GroupService {
 

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(API_URL+"api/Users/" + id.toString(), httpOptions);
  }

  getGroups(): Observable<Group[]> {
    let groups = this.http.get<Group[]>(API_URL+"api/GetGroups/", httpOptions);
    return groups;
  }

  addGroup(entity: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(API_URL+"api/AddToGroup/", entity, httpOptions);
  }

  deleteGroup(id: string): Observable<AppUser> {
    return this.http.delete<AppUser>(API_URL+"api/RemoveFromGroup/?user=" + id, httpOptions);
  }


}
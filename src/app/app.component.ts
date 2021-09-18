import { Component } from '@angular/core';
import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './security/security.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = "Nenad's Real-Time GPS Tracker";
  securityObject:AppUserAuth = null;
  constructor(private securityService:SecurityService){
      this.securityObject = securityService.securityObject;
  if (localStorage.getItem("access_token")) {
      this.securityObject.isAuthenticated=true;
      this.securityObject.userName=localStorage.getItem("username");
      this.securityObject.access_token=localStorage.getItem("access_token");
    }

    
  }
  public logout(): void {
    this.securityService.logout();

  }
}

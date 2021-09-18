import { Component, OnInit } from '@angular/core';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rtgpsang-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  constructor(private securityService: SecurityService,private router: Router,) { }
  login() {
    //debugger;
    this.securityService.login(this.user)
      .subscribe(
        resp => {
          this.securityObject = resp;
          this.securityObject.isAuthenticated=true;
          this.securityObject.userName=this.user.userName;
          debugger;
          this.router.navigate(['/']);

        },
        () => {
          this.securityObject = new AppUserAuth();
        }
      )
  };
  ngOnInit() {
  }

}

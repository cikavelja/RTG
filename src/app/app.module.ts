import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotifyComponent } from './notify/notify.component';
import { SecurityService } from './security/security.service';
import { LoginComponent } from './security/login.component';
import { HttpInterceptorModule } from './security/http-interceptor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GlobalErrorHandler } from './core/global-error-handler.service';
import { ErrorComponent } from './core/error.component';
import { RegisterComponent } from './register/register.component';
import { GroupComponent } from './group/group.component';
import { HttpConfigInterceptor } from './core/error/httpconfig.interceptor';

import { RtgpsComponent } from './notify/rtgps.component';
import { RtgpsService } from './notify/rtgps.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TestComponent } from './leaflet/test.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderserviceService } from './shared/loaderservice.service';
import { DownloadComponent } from './download/download/download.component';
//import { HttpClientModule } from '@angular/common/http'; 
//import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotifyComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    GroupComponent,

    RtgpsComponent,
    TestComponent,
    LoaderComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpInterceptorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    LeafletModule,
    MatProgressSpinnerModule
  ],
  providers: [
    SecurityService,
     RtgpsService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

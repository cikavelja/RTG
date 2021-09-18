import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './security/login.component';
import { ErrorComponent } from './core/error.component';
import { RegisterComponent } from './register/register.component';
import { GroupComponent } from './group/group.component';

import { RtgpsComponent } from './notify/rtgps.component';
import { TestComponent } from './leaflet/test.component';
import { DownloadComponent } from './download/download/download.component';
import { FullmapComponent } from './fullmap/fullmap.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'map', 
    component: FullmapComponent
  },  
  {
    path: 'tracker', 
    component: RtgpsComponent
  },  
  {
    path: 'group', 
    component: GroupComponent
  },    
  {
    path: 'error', 
    component: ErrorComponent
  },  
  {
    path: 'login', 
    component: LoginComponent
  }, 
  {
    path: 'dashboard', 
    component: DashboardComponent
  },
  {
    path: 'download',
    component: DownloadComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '**', component: DashboardComponent
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

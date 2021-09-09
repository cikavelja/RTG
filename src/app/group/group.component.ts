import { Component, OnInit } from '@angular/core';
//import { Group } from './group';
import { GroupService } from './group-service.service';
import { AppUser } from '../security/app-user';
import { group } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//import { ToastrService } from 'ngx-toastr';
import { SecurityService } from '../security/security.service';
import { RtgpsService } from '../notify/rtgps.service';
import { Group } from './GroupModel';

@Component({
  selector: 'rtgpsang-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  user: AppUser;
  groups: Group[];
  search: string;
  showAddUser: boolean = false;

  constructor(private groupService: GroupService,
    private route: ActivatedRoute,
    private location: Location,
    //private tostr: ToastrService,
    private security: SecurityService,
    private _rtgpsService: RtgpsService,
    ) { }

  ngOnInit() {
    debugger;
    this._rtgpsService.connectionEstablished.subscribe(() => {
      //this.canSendMessage = true;
    });
    this.getGroups();
  }

  private getUser(): void {
    this.groupService.getUser(this.search)
      .subscribe(user => this.user = user,
        err => console.error(err.message),
        () => this.userFound());
  }

  private getGroups(): void {

    
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups,
        err => this.userErrorFound(err),
        () => null);
  }

  deleteGroup(id: string): void {
    debugger;
    if (confirm("Delete this product?")) {
      this.groupService.deleteGroup(id)
        .subscribe(
          () => this.groups = this.groups.filter(p => p.roomName != id),
          err => console.error(err.message),
          () => this.removeUserWS(id));
    }
  }

  removeUserWS(id: string): void {
    debugger;
    this._rtgpsService.removeUserFromRoom(id);
  }

  addUser(): void {
    this.saveData();
  }

  userFound(): void {
    if (this.user) {
      this.showAddUser = true;
    } 
  }
  userErrorFound(err:any): void {
    //this.tostr.error("Error!", err.message);
    this.showAddUser = false;
  }

  saveData(): void {
    if (this.user) {
      // Update product
      this.groupService.addGroup(this.user)
        .subscribe(groups => { this.user = groups },
          err => console.error(err.message),
          () => this.getGroups());
          debugger;
          this._rtgpsService.addUserToRoom(this.user.userName);
        }
    this.showAddUser = false;
  }
  private dataSaved(): void {
    // Redirect back to list
    //this.goBack();

    //this.tostr.success("Success!", "User added!")
  }

  

  cancelSearch(): void {
    //this.location.back();
    this.showAddUser = false;
    this.search = "";
  }  
  
  goBack(): void {
    //this.location.back();
  }

  cancel(): void {
    //this.goBack();
  }
}

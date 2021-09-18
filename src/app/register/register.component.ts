import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from './register';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'rtgpsang-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: Register;

  constructor(private registerService: RegisterService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private tostr:ToastrService) { }

  ngOnInit() {
    this.createOrLoadProduct();
  }
  private createOrLoadProduct() {
    this.initProduct();

  }

  private initProduct(): void {
    // Add a new registration
    this.register = new Register({
      userName: "",
      password: ""
    });
    
  }

  saveData(): void {
      // Add a product
      try{
        this.registerService.register(this.register)
        .subscribe(registration => { this.register = registration  },
          err => this.tostr.error("Error!", err.message),
          () => this.dataSaved(this.register.userName));
          

      }
      catch(e){
        this.tostr.error("Error!", e.message)
      }

  }

  private dataSaved(uname:string): void {
    // Redirect back to list
    this.tostr.success("Success!", "User " + uname + " registered!" )
    this.router.navigate(['login']);

  }

  goBack(): void {
    //this.location.back();
    this.router.navigate(['dashboard']);
  }

  cancel(): void {
    this.router.navigate(['dashboard']);

  }

}

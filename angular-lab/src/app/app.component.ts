import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-lab';
  constructor(private auth:AuthService, private router:Router){};

  get isUserLoggedIn(): boolean{
    return this.auth.isLoggedIn();
  }

  get isUserLoggedOut():boolean{
    return this.auth.isLoggedOut();
  }

  get isAdmin():boolean{
    console.log(this.auth.checkIfAdminUser());
    return this.auth.checkIfAdminUser();
  }

  logout():void{
    console.log("logout");
    this.auth.logout();
    this.router.navigateByUrl("/");
  }
}

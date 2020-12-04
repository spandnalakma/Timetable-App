import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-lab';
  constructor(private auth:AuthService){};

  get isUserLoggedIn(): boolean{
    return this.auth.isLoggedIn();
  }

  get isUserLoggedOut():boolean{
    return this.auth.isLoggedOut();
  }

  logout():void{
    console.log("logout");
    this.auth.logout();
  }
}

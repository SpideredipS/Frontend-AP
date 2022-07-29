import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isUserLogged: Boolean = false;

  constructor(
    private loginService : LoginService
  ) { }

  ngOnInit(): any {
    this.isUserLogged = this.loginService.isUserLogged();
  }

  public logOut():void {
    this.loginService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }

}

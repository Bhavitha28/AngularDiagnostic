import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  loggedIn = false;
  role: any;
user:any;
  constructor(private userLoginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    this.loggedIn = this.userLoginService.isLoggedIn()
    console.log(this.loggedIn)
    this.role = localStorage.getItem('role');
    this.user = this.userLoginService.getId();
    console.log(this.user)
    console.log('Role', this.role);
  }

}

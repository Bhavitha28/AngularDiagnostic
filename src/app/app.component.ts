import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Diagnostic-Center';

  isloggedIn=false;
  constructor( private userLoginService: LoginService, private router:Router ) { }
  
  ngOnInit(): void { 
    this.userLoginService.userLoginSubject.subscribe(isUserLoggedIn => {
      this.isloggedIn = isUserLoggedIn;
    })

      this.isloggedIn=this.userLoginService.isLoggedIn();
    // console.log(this.isloggedIn)
    // console.log('App component is loadeed')
  }



}



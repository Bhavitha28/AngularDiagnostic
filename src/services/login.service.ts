import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject,BehaviorSubject  } from 'rxjs';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl="http://localhost:8080/authenticate"

public loginStatusSubject=new Subject<boolean>();
userLoginSubject=new BehaviorSubject(false);
  constructor(private http:HttpClient) { }


//current user: which is loggedin

public getCurrentUser(username:any){
  console.log(username)
  return this.http.get('http://localhost:8080/user/getByUsername/'+username);
}


  //generate token 

  public generateToken (loginData:any){

    console.log(loginData.userName,loginData.password);

    return this.http.post('http://localhost:8080/authenticate',loginData);
    
  }


  //login user: set token in localstorage

  public loginUser(token: any){
    localStorage.setItem('token',token.response);
    
    return true;
  }

  //islogin: user is log in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token');
    if(tokenStr==undefined||tokenStr==''|| tokenStr==null){
    return false;
  }else{
    return true;
  }
}


//logout : remove token from localstorage

public logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  localStorage.clear();
 
  return true;
}

//get token

public getToken(){
  return localStorage.getItem('token');
}

// set userDetails

public setUser(user: any){
  localStorage.setItem('user',JSON.stringify(user));
}

//get user
public getUser(){
  let userStr=localStorage.getItem("user");
  if(userStr!=null){
    return JSON.parse(userStr);
  }else{
    this.logout();
    return null;
  }
}

// get user role

public getUserRole(){
  let user=this.getUser();
  return user.userType;
}
public getName(){
  let user=this.getUser();
  return user.name;
}

public getId(){
  let user=this.getUser();
 return user.id;
}

}

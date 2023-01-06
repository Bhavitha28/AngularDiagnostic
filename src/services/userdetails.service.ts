import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  baseUrl="http://localhost:8080"

  constructor(private http: HttpClient) { }

  public  getAllUsers(){
    return this.http.get(`${this.baseUrl}/user/getAllUsers`);
  }
  public deleteUser(id: any){

    return this.http.delete('http://localhost:8080/user/deleteUser/'+id);

   }

   public undoDelete(id: any){
    return this.http.get('http://localhost:8080/user/undoDelete/'+id);

  }

  public getOneUser(id: any){
    return this.http.get('http://localhost:8080/user/getOneUser/'+id);

  }

  public updateUser(updateuser: any){
    return this.http.put('http://localhost:8080/user/updateUser/',updateuser);

  }
  public getByUsername(username: any){
    return this.http.get('http://localhost:8080/user/getByUsername/'+username);

  }

}
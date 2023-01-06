import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {
  baseUrl="http://localhost:8080"

  constructor(private http: HttpClient) { }



  public  getUserCart(userId:any){
    return this.http.get(`${this.baseUrl}/cart/getOneUserCart/`+userId);
  }

  public  getOneCart(id:any){
    return this.http.get(`${this.baseUrl}/cart/getOneCart/`+id);
  }

  public updateCart(updatecart: any){
    return this.http.put('http://localhost:8080/cart/updateCart/',updatecart);

  }

  public  deleteCart(id:any){
    return this.http.delete(`${this.baseUrl}/cart/deleteCart/`+id);
  }

  public  deleteUserCart(userId:any){
    return this.http.delete(`${this.baseUrl}/cart/deleteUserCart/`+userId);
  }
}

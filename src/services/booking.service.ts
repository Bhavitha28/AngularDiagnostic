import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
 
  baseUrl="http://localhost:8080"

  constructor(private http: HttpClient) { }



  public  getAllBookings(){
    return this.http.get(`${this.baseUrl}/Booking/getAllBookings`);
  }

  public  calculatebill(noOfSlots:any,packageId:any){
    return this.http.get(`${this.baseUrl}/Booking/calculateBill/${noOfSlots}/${packageId}`);
  }

  public addBooking(booking:any){
    return this.http.post('http://localhost:8080/Booking/AddBooking',booking);

  }

  public addCart(cart:any){
    return this.http.post('http://localhost:8080/cart/AddCart',cart);

  }

  public  getoneUserBookings(userId:any){
    return this.http.get(`${this.baseUrl}/Booking/getOneUserBookings/`+userId);
  }

  
  public  getoneBooking(paymentId:any){
    return this.http.get(`${this.baseUrl}/Booking/getOneBooking/`+paymentId);
  }

}

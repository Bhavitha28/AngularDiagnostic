import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseUrl="http://localhost:8080"

  constructor(private http: HttpClient) { }



  public  getAllLocations(){
    return this.http.get(`${this.baseUrl}/Admin/getAllLocations`);
  }
  public deleteLocation(id: any){

    return this.http.delete('http://localhost:8080/Admin/deleteLocation/'+id);

   }

   public undoDelete(id: any){
    return this.http.get('http://localhost:8080/Admin/undoDelete/'+id);

  }

  public getOneLocation(id: any){
    return this.http.get('http://localhost:8080/Admin/getOneLocation/'+id);

  }

  public updateLocation(updateLocation: any){
    return this.http.put('http://localhost:8080/Admin/updateLocation/',updateLocation);

  }

  public addLocation(addocation: any){
    return this.http.post('http://localhost:8080/Admin/addLocation/',addocation);

  }
}

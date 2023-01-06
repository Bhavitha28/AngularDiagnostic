import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  baseUrl="http://localhost:8080"

  constructor(private http: HttpClient) { }


  addPackage(packageName:any,packageCost:any,packageLocation:any,offerFrom:any,offerTo:any,
   description:any,slotCount:any,noOfPeople:any , formData:FormData) {
  return this.http.post(`http://localhost:8080/Package/add/${packageName}/${packageCost}/${packageLocation}/${offerFrom}/${offerTo}/${description}/${slotCount}/${noOfPeople}`  ,formData);
}


getAllPackages(){
  let packages= this.http.get(`http://localhost:8080/Package/getAllPackages`);
  return packages;
}

getActivePackages(){
  let packages= this.http.get(`http://localhost:8080/Package/getActivePackages`);
  return packages;
}



getPackageById(id:any){
return this.http.get(`http://localhost:8080/Package/getOnePackage/${id}`);
}

updatePackage(id:any,packageName:any,packageCost:any,packageLocation:any,offerFrom:any,offerTo:any,
  description:any,slotCount:any,noOfPeople:any , formData:FormData) {

return this.http.put(`http://localhost:8080/Package/updatePackage/${id}/${packageName}/${packageCost}/${packageLocation}/${offerFrom}/${offerTo}/${description}/${slotCount}/${noOfPeople}`  ,formData);
}

deletePackageById(id:any){
  //console.log('api calling',id)
    let result= this.http.delete(`http://localhost:8080/Package/deletePackage/${id}`);
    //console.log(result);
    return result;
 }

 
undoDeleteById(id:any){
  return this.http.get(`http://localhost:8080/Package/undoDelete/${id}`);
  }

}

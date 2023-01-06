import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from 'src/services/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  isDescOrder:boolean=true;
  orderHeader:any;
  locationLists:any;
  deleteResult: any;
  displayFormUpdation:any;
  displaylocation=true;
  displayAddlocation=false;
  public locationMsg: string | undefined;

  public isLocationValid = false;

  public isLocationInValid = false;
  updateLocation={
    location:''
  }
  addLocation={
    location:''
  }
  sort(headerName:String){

    this.isDescOrder=!this.isDescOrder;
 
   this.orderHeader=headerName;
 
  }
  form: FormGroup = new FormGroup({});
  constructor(private locationservice:LocationService,private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllLocations();
  }


  public verifyLocation() {

    for (var item of this.locationLists) {

      if ( item.location.toLocaleLowerCase() == this.addLocation.location.toLocaleLowerCase()) {

        this.isLocationInValid = true;

        this.isLocationValid = false;


        this.locationMsg = "location already present"

        break;

      }

      else {

        this.isLocationInValid = false;

        this.isLocationValid = true;

        this.locationMsg = 'location is Available'

      }

    }

  }
  get f(){

    return this.form.controls;
    
    }
    registerform = new FormGroup({



      LOCATION : new FormControl("" , [
  
        Validators.required,
  
         Validators.minLength(3),                          
  
        Validators.pattern("[a-zA-Z]+")
  
      ]),
    });
    get location(){

      return this.registerform.get("LOCATION") as FormControl;
  
     }


     displayadd(){
      this.displaylocation=false;
      this.displayAddlocation=true;
     }

     formSubmit() {
     
      this.locationservice.addLocation(this.addLocation).subscribe(
        (data) => {
          console.log(data);
  
          Swal.fire('Successfully Added ');
          
          
          this.displayAddlocation=false;
          this.getAllLocations();
        },
        (error) => {
          console.log(error);
          this.snack.open('Location exist'
            , 'please add new location', {
            duration: 3000,
          })
        }
      );
    }
  
  getAllLocations() {
this.displaylocation=true;
this.displayAddlocation=false;
    // this.clearOld();

    this.deleteResult = '';

    this.locationservice.getAllLocations().subscribe(

      locationList => {

        this.locationLists =locationList;

        // this.userLists = JSON.stringify(this.userLists);

        // this.userLists = JSON.parse(this.userLists);

        console.log(this.locationLists);

      },

      error => {

        console.log("error in location List Fetching ");

        console.log(error);

      }

    )

  }

  deleteById(id: any) {
    Swal.fire({

      icon:'info',
  
      title:'Are you sure of deleting this Location?',
  
      cancelButtonText:'Cancel',
  
      showCancelButton:true,
  
     }).then((result)=>{
  
      if(result.isConfirmed){
    this.locationservice.deleteLocation(id).subscribe(
      (data: any) => {
       
        Swal.fire('Success', 'location Deleted', 'success');
        this.getAllLocations();
      },
      (_error) => {
        Swal.fire('Error', 'Error in deleting location ', 'error');
      }

      );
     
         }
     
        })
     
     
     
       }

       activateById(id: any) {
        this.locationservice.undoDelete(id).subscribe(
          result => {
            if (result) {
              // swal succsufful msg
              Swal.fire('Success', 'Location Activated', 'success');
              this.getAllLocations();
            }
            else {
              Swal.fire('UnSuccess', 'Unable to Activate location', 'success');
            }
          },
          (_error) => {
            Swal.fire('Error', 'Error in Activating location ', 'error');
          }
        )
      }

      public getUpdateLocation(id: any) {

        // this.eid=this._router.snapshot.params['eid'];
    
        // alert(this.eid)
    
    
    
        this.locationservice.getOneLocation(id).subscribe(
    
          (data: any) => {
    
            this.updateLocation = data;
    
            console.log(this.updateLocation);
    
          },
    
          (error: any) => {
    
            console.log(error);
    
          }
    
        );
    
      }

      displayupdateForm(id: any) {

        this.getUpdateLocation(id);
        this.displaylocation=false;
        this.displayFormUpdation = 'update employee form';
      }
    
      updateformSubmit() {
        this.locationservice.updateLocation(this.updateLocation).subscribe(
          (data: any) => {
            Swal.fire('Success !!', 'location updated', 'success').then((e) => {
              this.getAllLocations();
              this.displayFormUpdation='';
             
            });
          }, (error) => {
            Swal.fire('Error !!', 'Error in updating', 'error');
            console.log(error);
          }
        )
      }

}

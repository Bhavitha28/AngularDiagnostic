import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from 'src/services/location.service';
import { PackageService } from 'src/services/package.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-adminpackage',
  templateUrl: './adminpackage.component.html',
  styleUrls: ['./adminpackage.component.css']
})
export class AdminpackageComponent implements OnInit {

  localUrl: any[] =[];

  package = {
    id:'',
    packageName: '',
    packageCost: '',
    imagePath: '',
    packageLocation: '',
    offerFrom: '',
    offerTo: '',
    description: '',
    slotCount: '',
    noOfPeople: ''
  }

  updatepackage = {
    id:'',
    packageName: '',
    packageCost: '',
    imagePath: '',
    packageLocation: '',
    offerFrom: '',
    offerTo: '',
    description: '',
    slotCount: '',
    noOfPeople: ''
  }

  packages = [{
    id:'',
    packageName: '',
    packageCost: '',
    imagePath: '',
    packageLocation: '',
    offerFrom: '',
    offerTo: '',
    description: '',
    slotCount: '',
    noOfPeople: '',
    isActive:''
  }]
 
  searchInput: any = { packageName: ''  }

  imgPath: any;
  locations: any;
  enablePackageList = true;
  enablePackageAdd = false;
  enableAddIcon = true;
  enablePackageupdation=false;
currentDate = new Date().toISOString().slice(0,10); 

  constructor(@Inject(LOCALE_ID) private locale: string,private locationService: LocationService, private packageservice: PackageService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllLocations();
    this.getAllPackages();
  }

  getAllPackages(){
    this.packageservice.getAllPackages().subscribe(
      (response: any) => {
        console.log('response'+ response)
        this.packages = response;
        for(let i=0;i<response.length;i++){
          let from = formatDate(response[i].offerFrom, 'yyyy-MM-dd', this.locale);
          let to = formatDate(response[i].offerTo, 'yyyy-MM-dd', this.locale);
  
             response[i].imagePath ="/assets/images/"+ response[i].imagePath;
             response[i].offerFrom = from;
             response[i].offerTo = to;

        }
        this.package =response;
      
      },
      (error: any) => {
        console.log(error);
        console.log("error in all Packages List Fetching !!")
      }
    )
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe(
      data => {
        this.locations = data;
      }
    )
  }

  enablePackageAdding() {
    this.enablePackageAdd = true;
    this.enablePackageList = false;
    this.enableAddIcon = false;
    this.enablePackageupdation = false;
  }

  enablePackageUpdation(id:any) {
   this. editPackageById(id);
    this.enablePackageupdation = true;
    this.enablePackageList = false;
    this.enableAddIcon = false;
    this.enablePackageAdd = false;
  }


  cancelAdding() {
    this.enablePackageAdd = false;
    this.enablePackageupdation = false;
    this.enablePackageList = true;
    this.enableAddIcon = true;
  }
  public userFile:any =File;
  onUploadFile(event: any) {
    const file = event.target.files[0];
     
    this.userFile = file;
    console.log(event.target.files[0].type);
    if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png')
      console.log("valid file ")
    else {
      Swal.fire('Error', 'Invalid Image Format', 'error').then((e) => {
        event.target.value = null;
      })
    }
  }
 

  packageSubmit() {
    const formData= new FormData();
    formData.append('file',this.userFile);


    let currentDate = new Date();
     let format = formatDate(currentDate, 'yyyy-MM-dd', this.locale);

    if (this.package.offerFrom >= format.toString()) {
      if (this.package.offerTo < this.package.offerFrom) {
        Swal.fire('Error !!', 'EndDate should be greater than  StartDate', 'error').then((e) => {
          this.package.offerTo = '';
        });

      }
      else {
        this.packageservice.  addPackage(this.package.packageName ,this.package.packageCost,this.package.packageLocation,this.package.offerFrom,this.package.offerTo,
          this.package.description,this.package.slotCount,this.package.noOfPeople,formData ).subscribe(
          response => {
            console.log(response);
            console.log(event);
            //this.resportProgress(event);
            Swal.fire('Successfully done !!', 'Successfuly  Submitted', 'success').then((e) => {
              // if(this.role=='admin') window.location.href="/fileUploading";    
              window.location.reload();

            });
          },
          error => {
            Swal.fire('Error', 'ERROR in File Upload', 'error');
            console.log(error);
            // this.sucErr.snackErrorOpen();
          }
        )
      }
    }
      else {
        Swal.fire('Error !!', 'Start Date   :-Dont choose the old dates.', 'error').then((e) => {
          this.package.offerFrom = '';
        });
  
      }
    }

    packageUpdate() {
      const formData= new FormData();
      formData.append('file',this.userFile);
  
  
      let currentDate = new Date();
       let format = formatDate(currentDate, 'yyyy-MM-dd', this.locale);
  
      // if (this.package.startDate >= format.toString()) {
        if (this.package.offerTo < this.package.offerFrom) {
          Swal.fire('Error !!', 'EndDate should be greater than  StartDate', 'error').then((e) => {
            this.package.offerTo = '';
          });
  
          }
        else {
          this.packageservice.updatePackage(this.updatepackage.id,this.updatepackage.packageName ,this.updatepackage.packageCost,this.updatepackage.packageLocation,this.updatepackage.offerFrom,this.updatepackage.offerTo
            ,this.updatepackage.description,this.updatepackage.slotCount,this.updatepackage.noOfPeople,formData ).subscribe(
            response => {
              console.log(response);
              console.log(event);
              //this.resportProgress(event);
              Swal.fire('Successfully done !!', 'Successfuly  Submitted', 'success').then((e) => {
                // if(this.role=='admin') window.location.href="/fileUploading";    
                window.location.reload();
  
              });
            },
            error => {
              Swal.fire('Error', 'ERROR in Package Updating', 'error');
              console.log(error);
              // this.sucErr.snackErrorOpen();
            }
          )
        }
      }
        // else {
        //   Swal.fire('Error !!', 'Start Date   :-Dont choose the old dates.', 'error').then((e) => {
        //     this.package.startDate = '';
        //   });
    
        // }
      // }
    deleteById(id: number) {

      Swal.fire({
        icon: 'question',
        title: 'Are you sure of deleting Package?',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(id, role);
          this.packageservice.deletePackageById(id).subscribe(
            deletedResult => {
  
              if (deletedResult) {
  
                Swal.fire('Successfully done !!', 'Successfuly  Deleted', 'success').then((e) => {
                  this.getAllPackages();
                }); 
              }
              else {
                this.snack.open('Not Found !!', 'Enable to Delete', {
                  duration: 5000,
                })
              }
  
            },
            error => {
              console.log("error in Deleting Account");
              this.snack.open('Something Went wrong !!', 'Enable to Delete', {
                duration: 5000,
              })
            }
          )
  
  
        }
      })
  
    }
  
activatePackage(id:any){
  this.packageservice.undoDeleteById(id).subscribe(
  activateResult => {
  
    if (activateResult) {

      Swal.fire('Successfully done !!', 'Successfuly  activated', 'success').then((e) => {
        this.getAllPackages();
      }); 
    }

  },
  error => {
    console.log("error in activating package");
    this.snack.open('Something Went wrong !!', 'Enable to activate', {
      duration: 5000,
    })
  }
)


}


    editPackageById(id:number){
        // this.enablePackageAdding();

      this.packageservice.getPackageById(id).subscribe(
        (response: any) => {
          console.log('response'+ response.id)
          let from = formatDate(response.offerFrom, 'yyyy-MM-dd', this.locale);
          let to = formatDate(response.offerTo, 'yyyy-MM-dd', this.locale);
          response.offerFrom = from;
          response.offerTo = to;
          response.imagePath ="/assets/images/"+ response.imagePath;
console.log(response.imagePath);
          this.updatepackage = response;
        },
     
      (error: any) => {
        console.log(error);
        console.log("error in  Packages List Fetching !!")
      }
    )
    }

  get PackageName() {
        return this.registerform.get("PACKAGENAME") as FormControl;
      }
  get packageCost() {
        return this.registerform.get("PACKAGECOST") as FormControl;
      }
  get ImagePath() {
        return this.registerform.get("IMAGEPATH") as FormControl;
      }
  get packageLocation() {
        return this.registerform.get("PACKAGELOCATION") as FormControl;
      }
  get offerFrom() {
        return this.registerform.get("OFFERFROM") as FormControl;
      }
  get offerTo() {
        return this.registerform.get("OFFERTO") as FormControl;
      }
  get description() {
        return this.registerform.get("DESCRIPTION") as FormControl;
      }
  get slotCount() {
        return this.registerform.get("SLOTCOUNT") as FormControl;
      }
  get noOfPeople() {
        return this.registerform.get("NOOFPEOPLE") as FormControl;
      }

      registerform = new FormGroup({
        PACKAGENAME: new FormControl("", [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("[a-zA-Z].*"),
          // noSpecialCharacter.noSpecialChar
        ]),

        PACKAGECOST: new FormControl("", [
          Validators.required,
          Validators.pattern("[0-9]*")
        ]),

        IMAGEPATH: new FormControl("", [
          Validators.required
        ]),

        NOOFPEOPLE: new FormControl("", [
          Validators.required,
          Validators.pattern("[0-9]*")
        ]),
        SLOTCOUNT: new FormControl("", [
          Validators.required,
          Validators.pattern("[0-9]*")
        ]),

        DESCRIPTION: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),

        ]),

        PACKAGELOCATION: new FormControl("", [Validators.required]),
      
        OFFERFROM: new FormControl("", [Validators.required]),
        OFFERTO: new FormControl("", [Validators.required]),
      })
    }

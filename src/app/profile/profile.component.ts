import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { flagsToNumber } from 'node_modules--/memfs/lib/volume';
import { LoginService } from 'src/services/login.service';
import { UserdetailsService } from 'src/services/userdetails.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayFormUpdation = '';
  profiledisplay=true;
  form: FormGroup = new FormGroup({});
  constructor(public loginservice:LoginService,public userDetails:UserdetailsService,private fb: FormBuilder) { 
    this.form = fb.group({

    PASSWORD: ['', [Validators.required]],

    // confirm_password: ['', [Validators.required]]

  }, {

  //  validator: ConfirmedValidator('PASSWORD', 'confirm_password')

  })



}



get f(){

return this.form.controls;

}

  ngOnInit(): void {
    
      this.userDetails.getByUsername(this.loginservice.getUser().userName).subscribe(
        (data:any)=>{
          this.user = data;
          console.log(this.user);
        }
      )
    
  }

  public user = {
    id:'',
    name: '',
    userName: '',
    userType: '',
    mobileNumber: '',
    emailId: ''
  };
  public updateuser = {
    name: '',
    userName: '',
    mobileNumber: '',
    emailId: ''
  };

  
  registerform = new FormGroup({



    NAME : new FormControl("" , [

      Validators.required,

       Validators.minLength(3),                          

      Validators.pattern("[a-zA-Z]+")

    ]),



   

    // AGE: new FormControl("",[

    //   Validators.required,

    //   Validators.pattern("[0-9]*"),

    //   Validators.min(10),

    //   Validators.max(50)

    // ]),



    USERNAME : new FormControl("",[

      Validators.required,

      Validators.minLength(5), 
      Validators.maxLength(10),                         

      Validators.pattern("[a-zA-Z].*"),
     
      

      // Validators.email

    ]),



    // PASSWORD: new FormControl("",[

    //   Validators.required,

    //   Validators.minLength(7),    

    //   Validators.maxLength(16),

    //   Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* )(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),



    // ]),



    // confirm_password: new FormControl(""),



    MOBILENUMBER : new FormControl("",[

      Validators.required,

      Validators.pattern("[0-9]*"),

      Validators.minLength(10),

      Validators.maxLength(10)

    ]),



    EMAIL : new FormControl("",[

      Validators.required,

      Validators.email

    ]),



   

  });



  get name(){

    return this.registerform.get("NAME") as FormControl;

   }

   get Username(){

    return this.registerform.get("USERNAME") as FormControl;

   }

  //  get Age(){

  //   return this.registerform.get("AGE") as FormControl;

  //  }

  //  get Password(){

  //   return this.registerform.get("PASSWORD") as FormControl;

  //  }
  
   get MobileNo(){

    return this.registerform.get("MOBILENUMBER") as FormControl;

   }

   get Email(){

    return this.registerform.get("EMAIL") as FormControl;

   }


   

  public getOneUsers(id: any) {

    this.userDetails.getOneUser(id).subscribe(

      (data: any) => {

        this.updateuser = data;

        console.log(this.updateuser);

      },

      (error: any) => {

        console.log(error);

      }

    );

  }

  


  displayupdateForm(id: any) {

  
    this.getOneUsers(id);
    this.profiledisplay=false;
    this.displayFormUpdation = 'update user form';
  }

  updateformSubmit() {
    this.userDetails.updateUser(this.updateuser).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'user updated', 'success').then((e) => {
         
          this.profiledisplay=true; 
          this.displayFormUpdation ='';
          this.ngOnInit();
        });
      }, (error) => {
        Swal.fire('Error !!', 'Error in updating', 'error');
        console.log(error);
      }
    )
  }

onCancel(){
  this.profiledisplay=true;
  this.displayFormUpdation = '';
}

}

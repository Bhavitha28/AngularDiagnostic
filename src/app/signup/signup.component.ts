import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from 'src/services/signup.service';
import { UserdetailsService } from 'src/services/userdetails.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userLists:any;
  form: FormGroup = new FormGroup({});

  constructor(private userService:SignupService, private snack:MatSnackBar,private fb: FormBuilder,private userDetails:UserdetailsService) { 
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
public userMsg: string | undefined;

  public isUserValid = false;

  public isUserInValid = false;



  public user={
    userName: '',
    password: '',
    userType:'Normal',
    name:'',
    mobileNumber:'',
    emailId:''
  };

  ngOnInit(): void {
   
  
     
    this.userDetails.getAllUsers().subscribe(
  
      userList => {
        this.userLists = userList; 
        console.log( this.userLists) 
      },

      error => {

        console.log("error in user List Fetching ");

      }

    )
    
  }

  registerform = new FormGroup({



    NAME : new FormControl("" , [

      Validators.required,

       Validators.minLength(3),                          

      Validators.pattern("[a-zA-Z]+")

    ]),





    USERNAME : new FormControl("",[

      Validators.required,

      Validators.minLength(5), 
      Validators.maxLength(10),                         

      Validators.pattern("[a-zA-Z].*"),
     
      

      // Validators.email

    ]),



    PASSWORD: new FormControl("",[

      Validators.required,

      Validators.minLength(7),    

      Validators.maxLength(16),

      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* )(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),



    ]),



    // confirm_password: new FormControl(""),



    MOBILENUMBER : new FormControl("",[

      Validators.required,

      Validators.pattern("[0-9]*"),

      Validators.minLength(10),

      Validators.maxLength(10)

    ]),



    EMAIL : new FormControl("",[

      Validators.required,

      Validators.pattern("(?!.*[!#$%^&*()_+])[a-zA-Z0-9]*.(@gmail|@yahoo).com"),

    ]),



   

  });



  get name(){

    return this.registerform.get("NAME") as FormControl;

   }

   get Username(){

    return this.registerform.get("USERNAME") as FormControl;

   }



   get Password(){

    return this.registerform.get("PASSWORD") as FormControl;

   }
  
   get MobileNo(){

    return this.registerform.get("MOBILENUMBER") as FormControl;

   }

   get Email(){

    return this.registerform.get("EMAIL") as FormControl;

   }

   verifyUserName(){
    
    for(let usr of this.userLists){
      if(this.user.userName.toLowerCase() == usr.userName.toLowerCase()){
        this.isUserInValid = true;

        this.isUserValid = false;

        console.log(this.user.userName +'  '+ usr.userName)

        this.userMsg = "userName Already taken"

        break;

      }

      else {

        this.isUserInValid = false;

        this.isUserValid = true;

        this.userMsg = 'user Name is Available'

      }

    }

  }
  formSubmit(){

   
    if(this.isUserInValid==true){
        this.snack.open('User name is exsits !! ','',{
         duration:3000,  
       });
         return;
     }
    
    
     if(this.user.userName == '' || this.user.userName == null){
     this.snack.open('User name is Required !! ','',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right',
     
    });
      return;
  }
     
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        
       
      Swal.fire('Successfully done !!','user is registered','success' );
      this.registerform.reset();
 
     
      },
   
      (error)=>{
       console.log(error);
      // alert('someting went wrong');
      this.snack.open('Something Went wrong !!','',{
        duration:3000,
      })
      }
      );
      
  }
 
}


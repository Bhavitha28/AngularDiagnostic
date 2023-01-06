import { Component, OnInit } from '@angular/core';
import { UserdetailsService } from 'src/services/userdetails.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  page: number=1;
  count: number=0;
  tableSize: number=3;
  tableSizes:any=[3,5,10,15];
  userLists:any;
  deleteResult: any;
  isDescOrder:boolean=true;
  orderHeader:any;
  searchInput:any={userName:''}

 
  sort(headerName:String){

     this.isDescOrder=!this.isDescOrder;
  
    this.orderHeader=headerName;
  
   }
   onTableSizeChangeEvent(event:any):void {
    this.tableSize=event.target.value;
    this.page=1;  

  }
  constructor(private userDetails:UserdetailsService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers() {

    // this.clearOld();

    this.deleteResult = '';

    this.userDetails.getAllUsers().subscribe(

      userList => {

        this.userLists = userList;

        // this.userLists = JSON.stringify(this.userLists);

        // this.userLists = JSON.parse(this.userLists);

        console.log(this.userLists);

      },

      error => {

        console.log("error in user List Fetching ");

        console.log(error);

      }

    )

  }

  deleteById(id: any) {
    Swal.fire({

      icon:'info',
  
      title:'Are you sure of deleting  User?',
  
      cancelButtonText:'Cancel',
  
      showCancelButton:true,
  
     }).then((result)=>{
  
      if(result.isConfirmed){
    this.userDetails.deleteUser(id).subscribe(
      (data: any) => {
       
        Swal.fire('Success', 'User Deleted', 'success');
        this.getAllUsers();
      },
      (_error) => {
        Swal.fire('Error', 'Error in deleting User ', 'error');
      }

      );
     
         }
     
        })
     
     
     
       }

       activateById(id: any) {
        this.userDetails.undoDelete(id).subscribe(
          result => {
            if (result) {
              // swal succsufful msg
              Swal.fire('Success', 'User Activated', 'success');
              this.getAllUsers();
            }
            else {
              Swal.fire('UnSuccess', 'Unable to Activate User', 'success');
            }
          },
          (_error) => {
            Swal.fire('Error', 'Error in Activating User ', 'error');
          }
        )
      }

      onTableDataChange(event:any){
        this.page=event;
        this.getAllUsers();
       
      }
}

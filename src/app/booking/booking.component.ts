import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/services/booking.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  page: number=1;
  count: number=0;
  tableSize: number=3;
  tableSizes:any=[3,5,10,15];
  isDescOrder:boolean=true;
  orderHeader:any;
  bookingLists:any;
  sort(headerName:String){

    this.isDescOrder=!this.isDescOrder;
 
   this.orderHeader=headerName;
 
  }

  searchInput:any={paymentId:''}

 
 
   onTableSizeChangeEvent(event:any):void {
    this.tableSize=event.target.value;
    this.page=1;  

  }
  onTableDataChange(event:any){
    this.page=event;
    this. getAllBookings();
   
  }
  constructor(public bookingservice:BookingService) { }
 
  ngOnInit(): void {
    this.getAllBookings();

  }

  getAllBookings() {
  
  
   
    
      
    
        this.bookingservice.getAllBookings().subscribe(
    
          bookingList => {
    
            this.bookingLists =bookingList;
    
            // this.userLists = JSON.stringify(this.userLists);
    
            // this.userLists = JSON.parse(this.userLists);
    
            console.log(this.bookingLists);
    
          },
    
          error => {
    
            console.log("error in location List Fetching ");
    
            console.log(error);
    
          }
    
        )
    
      }
    
}

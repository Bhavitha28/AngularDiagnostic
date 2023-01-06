import { formatDate } from '@angular/common';
import { SummaryGenerator } from '@angular/compiler-cli/src/ngtsc/shims';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { flagsToNumber } from 'node_modules--/memfs/lib/volume';
import { BookingService } from 'src/services/booking.service';
import { LoginService } from 'src/services/login.service';
import { UserdetailsService } from 'src/services/userdetails.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  page: number=1;
  count: number=0;
  tableSize: number=3;
  tableSizes:any=[3,5,10,15];
  bookingLists:any;
  deleteResult: any;
  displayform=false;
currentDate:any;
displaybooking=true;
booking:any;
totalCost:any=0;
  constructor(@Inject(LOCALE_ID) private locale1: string,private bookingservice:BookingService,public loginservice:LoginService,public userDetails:UserdetailsService) { }
  public user = {
    id:'',
    name: '',
    userName: '',
    userType: '',
    mobileNumber: '',
    emailId: ''
  };


  ngOnInit(): void {
    
   this.user=this.loginservice.getUser();
   this.currentDate = formatDate(new Date(), 'dd-MM-yyyy', this.locale1);
  console.log(this.user)
    this.bookingservice.getoneUserBookings(this.user.id).subscribe(

      bookingList => {

        this.bookingLists = bookingList;


        console.log(this.bookingLists);

      },

      error => {

        console.log("error in booking List Fetching ");

        console.log(error);

      }

    )
 
  }
  locale(arg0: Date, arg1: string, locale: any): any {
    throw new Error('Method not implemented.');
  }

 
  displayinvoice(paymentId:any){
    this.displaybooking=false;
    this.displayform=true;
this.bookingservice.getoneBooking(paymentId).subscribe(

  (data:any) => {

    this.booking=data;
for(let book of this.booking){
  this.totalCost=this.totalCost+book.cost;
}
    console.log(this.booking);

  },

  error => {

    console.log("error in booking  Fetching ");

    console.log(error);

  }

)

}

public makepdf(): void {

  let DATA: any = document.getElementById('htmlData');

  html2canvas(DATA).then((canvas) => {

    let fileWidth = 208;

    let fileHeight = (canvas.height * fileWidth) / canvas.width;

    const FILEURI = canvas.toDataURL('image/png');

    let PDF = new jsPDF('p', 'mm', 'a4');

    let position = 0;

    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

    PDF.save('invoice.pdf');

  });

}



      onTableDataChange(event:any){
        this.page=event; 
      }
}

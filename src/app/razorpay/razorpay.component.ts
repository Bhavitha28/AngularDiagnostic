import { Component,HostListener, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';

import { PackageService } from 'src/services/package.service';
import { LoginService } from 'src/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { OrderService } from 'src/services/order.service';
import { BookingService } from 'src/services/booking.service';
import { CartserviceService } from 'src/services/cartservice.service';


declare var Razorpay: any;

@Component({
    selector: 'app-razorpay',
     templateUrl: './razorpay.component.html',
     styleUrls: ['./razorpay.component.css']
   })
   export class RazorpayComponent implements OnInit {
  
  title = 'demo';
  userr:any | undefined;

  form={
    name:'',
    phoneNumber:'',
    amount:''
  }; 

  booking={
    userId:'',
    productId:'',
    quantity:'',
    cost:'',
    paymentId:''

  }
  amount:any;
cartId:any;
  constructor(private http: HttpClient,
    private orderService:OrderService,private userbooking:BookingService,private packageservice:PackageService,private user:LoginService
    ,private _router:ActivatedRoute,private snack:MatSnackBar,private cartservice:CartserviceService, private router:Router) {

  }

  ngOnInit() {
    // this.amount = this._router.snapshot.params['totalBill'];
    this.cartId=this._router.snapshot.params['id'];
    this.booking.userId =this._router.snapshot.params['userId'];

    this.booking.productId =this._router.snapshot.params['productId'];
    this.booking.quantity =this._router.snapshot.params['quantity'];
    this.form.amount=this._router.snapshot.params['cost'];

    this.userbooking.calculatebill(this.booking.quantity,this.booking.productId ).subscribe(
      (data: any) =>{
        
  this.form.amount=data;
  console.log(data)
      },
   
      (error: any) => {
        console.log(error);
        console.log("error in cost cal !!")
      }
    )  
    this.userr = this.user.getUser();
    console.log(this.userr.userName)
   
    this.form.name = this.userr.name;
    this.form.phoneNumber = this.userr.mobileNumber;
    // this.form.amount = this.amount;
    console.log(this.form.amount+ "" +this.form.phoneNumber+"" +this.form.name);

    this.onSubmit();
  }

  sayHello() {
    alert("Hello DK");
  }

 
  

  paymentId: any;
  error: any;
  
  options = {
    "key": "",
    "amount": "", 
    "name": "Coding World",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id":"",
    
    "handler": function (response:any){
      var event = new CustomEvent("payment.success", 
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );	  
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
  id:any;
  quantity:any;
    onSubmit(): void {
      this.paymentId = ''; 
      this.error = ''; 
      this.orderService.createOrder(this.form).subscribe(
      data => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = this.userr.name;
        this.options.prefill.email = this.userr.emailId;
        this.options.prefill.contact ="";
        
        this.options.image="";
          var rzp1 = new Razorpay(this.options);
          rzp1.open();                
        rzp1.on('payment.failed',  (response:any) =>{    
          console.log(response);
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
      }
      ,
      err => {
        this.error = err.error.message;
      }
      );
    }

    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event:any): void {
       console.log(event.detail);
       this.booking.paymentId=event.detail.razorpay_payment_id;
       this.userbooking.addBooking(this.booking).subscribe(
        (data)=>{
          console.log(data);
        if(this.cartId){
          this.cartservice.deleteCart(this.cartId).subscribe(
            (data:any)=>{
              console.log("deleted");
            },
            (error)=>{
              console.log(error);
            }
          )
        }
        
        this.snack.open('Payment Done','Order Placed',{
          duration:3000,
        })
        this.router.navigateByUrl('/myorders')
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

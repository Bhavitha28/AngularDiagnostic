import { Component, HostListener, OnInit } from '@angular/core';


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
  selector: 'app-razorpay-cart',
  templateUrl: './razorpay-cart.component.html',
  styleUrls: ['./razorpay-cart.component.css']
})
export class RazorpayCartComponent implements OnInit {

  title = 'demo';
  userr: any | undefined;

  form = {
    name: '',
    phoneNumber: '',
    amount: ''
  };

  booking: any = []
  bookings = {
    userId: '',
    productId: '',
    quantity: 0,
    cost: '',
    paymentId: '',
    type: 'cart'
  }
  amount: any;
  cart: any = [];
  constructor(private http: HttpClient,
    private orderService: OrderService, private userbooking: BookingService, private packageservice: PackageService, private user: LoginService
    , private _router: ActivatedRoute, private snack: MatSnackBar, private cartservice: CartserviceService, private router: Router) {

  }

  ngOnInit() {
    console.log(this.cart.length);
    this.form.amount = this._router.snapshot.params['totalCost'];

    this.userr = this.user.getUser();
    console.log(this.userr.userName)
    this.form.name = this.userr.name;
    this.form.phoneNumber = this.userr.mobileNumber;
    console.log(this.form.amount + "" + this.form.phoneNumber + "" + this.form.name);

    console.log(this.booking);
    this.cartservice.getUserCart(this.userr.id)
      .subscribe(
        (data: any) => {
          this.booking = [];
          this.cart = data;
          console.log(data);

          for (let i = 0; i < data.length; i++) {
            this.booking.push({ userId: data[i].userId, productId: data[i].packageId, quantity: data[i].quantity });
          }
          console.log(this.booking)
        },

        (error) => {
          console.log(error);
          this.snack.open('unable'
            , 'to add cart', {
            duration: 3000,
          })
        }
      );


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
    "order_id": "",

    "handler": function (response: any) {
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
        this.options.prefill.contact = "";

        this.options.image = "";
        var rzp1 = new Razorpay(this.options);
        rzp1.open();


        rzp1.on('payment.failed', (response: any) => {
          // Todo - store this information in the server
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
  onPaymentSuccess(event: any): void {
    console.log(this.booking)
    console.log(event.detail);
    for (let i = 0; i < this.booking.length; i++) {
      this.booking[i].paymentId = event.detail.razorpay_payment_id;
      this.userbooking.addBooking(this.booking[i]).subscribe(
        (data) => {
          console.log(data);
        },

        (error) => {
          console.log(error);
          // alert('someting went wrong');
          this.snack.open('Something Went wrong !!', '', {
            duration: 3000,
          })
        }
      );

    }
    this.cartservice.deleteUserCart(this.userr.id).subscribe(
      (data: any) => {
        console.log("deleted");
      },
      (error) => {
        console.log(error);
      }
    )
    this.snack.open('Payment Done', 'Order Placed', {
      duration: 3000,
    })
    this.router.navigateByUrl('/myorders')


  }

}

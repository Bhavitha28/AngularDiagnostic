import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyCatcher } from 'node_modules--/rxjs/dist/types/internal/AnyCatcher';
import { BookingService } from 'src/services/booking.service';
import { PackageService } from 'src/services/package.service';
import Swal from 'sweetalert2';
import { CartserviceService } from '../../services/cartservice.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId: any;


  totalCost: number = 0;
  slotcheck = false;
  cart = [{
    id: '',
    userId: '',
    packageId: '',
    quantity: 0,
    cost: 0,
    packageName: '',
    packageCost: '',
    imagePath: '',
    packageLocation: '',
    offerFrom: '',
    offerTo: '',
    description: '',
    slotCount: 0,
    noOfPeople: '',
    status: '',
    isAvailable:1
  }]


  packages = [{

    id: '',
    packageName: '',
    packageCost: '',
    imagePath: '',
    packageLocation: '',
    offerFrom: '',
    offerTo: '',
    description: '',
    slotCount: 0,
    noOfPeople: '',
    cartId: ''
  }]

  currentDate = new Date().toISOString().slice(0,10); 

  enablecart = false;
  constructor(@Inject(LOCALE_ID) private locale: string, private router: Router, private _router: ActivatedRoute, private loginservice: LoginService, private cartservice: CartserviceService, private packageService: PackageService, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.userId = this._router.snapshot.params['userId'];


    this.getusercart();

  }

  getusercart() {
    this.totalCost=0;
    this.cartservice.getUserCart(this.userId).subscribe(
      (response: any) => {

        this.cart = response;
        if (this.cart.length>0) {
          this.enablecart = true;
        }
        else {
          this.enablecart = false;
        }
        for (let i = 0; i < response.length; i++) {

          let from = formatDate(response[i].offerFrom, 'yyyy-MM-dd', this.locale);
          let to = formatDate(response[i].offerTo, 'yyyy-MM-dd', this.locale);
          response[i].offerFrom = from;
          response[i].offerTo = to;

          response[i].imagePath = "/assets/images/" + response[i].imagePath;
if(response[i].offerFrom<this.currentDate){
this.cart[i].isAvailable=0;
}
          this.cart[i] = response[i];
        }

        this.cart.map((a: any) => {

          if (a.status ) {

            console.log(a)

            this.totalCost += a.cost;

          }
        })
      },

      (error: any) => {
        console.log(error);
        console.log("error in cost cal !!")
      }
    )
  }

  inc(index: any) {

    if (this.cart[index].quantity < this.cart[index].slotCount) {


      this.cart[index].quantity = this.cart[index].quantity + 1;

      this.cartservice.updateCart(this.cart[index]).subscribe(
        (data: any) => {
          this.totalCost = this.cart[index].cost + this.totalCost;
          console.log(data);
        },

        (error: any) => {
          console.log(error);
          console.log("error in updation one cart !!")
        }
      )

    }

    else {
      this.slotcheck = true;
    }
  }

  dec(index: any) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity = this.cart[index].quantity - 1;
      this.cartservice.updateCart(this.cart[index]).subscribe(
        (data: any) => {
          this.totalCost = this.totalCost - this.cart[index].cost;
        },

        (error: any) => {
          console.log(error);
          console.log("error in updation one cart !!")
        }
      )
    }
  }

  deleteCart(index: any) {
    Swal.fire({

      icon: 'info',
      
      title: 'Are you sure of deleting package from Cart',

      cancelButtonText: 'Cancel',

      showCancelButton: true,

    }).then((result) => {
      if (result.isConfirmed) {
        this.cartservice.deleteCart(this.cart[index].id).subscribe(
          (data: any) => {
            this.getusercart();

          },

          (_error) => {
            Swal.fire('Error', 'Error in deleting  ', 'error');
          }

        );

      }

    })



  }


  buynow(index: any) {
    // this.router.navigateByUrl('razorpay/'+this.totalBill)
    this.router.navigateByUrl('razorpay/' + this.cart[index].userId + '/' + this.cart[index].packageId + '/' + this.cart[index].quantity + '/' + this.cart[index].cost + '/' + this.cart[index].id);

  }

  checkOut() {
    let count=0;
    for (let car of this.cart) {
      if (car.slotCount==0 || car.isAvailable==0) {
        count+=1;
      }
    }
      
    if(count==0){
    this.router.navigateByUrl('razorpayCart/' + this.totalCost);
    }
    else{
      Swal.fire("Delete Unavailable Packages before Checkout")
    }

  }
}


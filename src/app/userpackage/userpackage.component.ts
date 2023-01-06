import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookingService } from 'src/services/booking.service';
import { CartserviceService } from 'src/services/cartservice.service';
import { LoginService } from 'src/services/login.service';
import { PackageService } from 'src/services/package.service';
import Swal from 'sweetalert2';

import { RazorpayComponent } from '../razorpay/razorpay.component';

@Component({
  selector: 'app-userpackage',
  templateUrl: './userpackage.component.html',
  styleUrls: ['./userpackage.component.css']
})
export class UserpackageComponent implements OnInit {

  searchInput: any = { packageName: '' }
  enablePackageList = true;
  enableBuyPackage = false;
  enableCartIcon = true;
  quantity: any = 0;
  totalBill: any;
  slotcheck = false;
  constructor(@Inject(LOCALE_ID) private locale: string, private packageservice: PackageService,
    private snack: MatSnackBar, public bookingservice: BookingService, private router: Router, private loginservice: LoginService, private cartService: CartserviceService) { }

  package = {
    id: '',
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
    id: '',
    packageName: '',
    packageCost: '',
    imagePath: '',
    packageLocation: '',
    offerFrom: '',
    offerTo: '',
    description: '',
    slotCount: '',
    noOfPeople: '',
    isActive: ''
  }]
  user: any

  booking = {
    userId: '',
    quantity: '',
    productId: '',

  }

  cart = {
    userId: '',
    packageId: '',
    quantity: '',
    cost: ''
  }

  getcart: any;
  ngOnInit(): void {
    this.user = this.loginservice.getId();
    this.getAllPackages();
  }
  getAllPackages() {
    this.enablePackageList = true;
    this.enableBuyPackage = false;
    this.packageservice.getActivePackages().subscribe(
      (response: any) => {
        console.log('response' + response)
        this.packages = response;
        for (let i = 0; i < response.length; i++) {
          let from = formatDate(response[i].offerFrom, 'yyyy-MM-dd', this.locale);
          let to = formatDate(response[i].offerTo, 'yyyy-MM-dd', this.locale);

          response[i].imagePath = "/assets/images/" + response[i].imagePath;
          response[i].offerFrom = from;
          response[i].offerTo = to;

        }
        this.package = response;

      },
      (error: any) => {
        console.log(error);
        console.log("error in all Packages List Fetching !!")
      }
    )
  }

  buyPackage(id: any) {
    this.quantity = 1;
    this.enablePackageList = false;
    this.getPackageById(id);

    this.enableBuyPackage = true;
    //   this.totalBill=(this.quantity) *(Number(this.package.packageCost));
    // console.log(this.totalBill);
    this.calculate(id);

  }
  getPackageById(id: number) {
    // this.enablePackageAdding();

    this.packageservice.getPackageById(id).subscribe(
      (response: any) => {
        console.log('response' + response.id)
        let from = formatDate(response.offerFrom, 'yyyy-MM-dd', this.locale);
        let to = formatDate(response.offerTo, 'yyyy-MM-dd', this.locale);
        response.offerFrom = from;
        response.offerTo = to;
        response.imagePath = "/assets/images/" + response.imagePath;
        console.log(response.imagePath);
        this.package = response;
      },

      (error: any) => {
        console.log(error);
        console.log("error in  Packages List Fetching !!")
      }
    )
  }

  inc(quantity: any) {


    if (this.package.slotCount > quantity) {
      this.quantity = this.quantity + 1;
      this.calculate(+this.package.id)
    }
    else {
      this.slotcheck = true;
    }
  }

  dec(quantity: any) {
    this.slotcheck = false;
    if (this.quantity != 1)
      this.quantity -= 1;
    this.calculate(+this.package.id)
  }

  calculate(id: number) {
    this.bookingservice.calculatebill(this.quantity, id).subscribe(
      data => {
        console.log(this.package.id);
        this.totalBill = data;
        console.log(data)
      },

      (error: any) => {
        console.log(error);
        console.log("error in cost cal !!")
      }
    )

  }

  toPay() {
    // this.router.navigateByUrl('razorpay/'+this.totalBill)
    this.router.navigateByUrl('razorpay/' + this.user + '/' + this.package.id + '/' + this.quantity + '/' + this.totalBill);

  }



  cartPackage(id: any) {
    let count = 0;
    this.cartService.getUserCart(this.user).subscribe(
      (data: any) => {
        this.getcart = data;

    

    for (let car of this.getcart) {
      if (car.packageId == id) {
        count += 1
      }
    }
    if (count == 0) {
      this.quantity = 1;
      this.cart.quantity = this.quantity;
      this.calculate(id);
      this.cart.cost = this.totalBill;
      this.cart.packageId = id;
      this.cart.userId = this.user;
      this.bookingservice.addCart(this.cart).subscribe(
        (data) => {
          console.log(data);

          Swal.fire('Successfully Added ');

        },
        (error) => {
          console.log(error);
          this.snack.open('unable'
            , 'to add cart', {
            duration: 3000,
          })
        }
      );
    }
    else {-
      Swal.fire('Cannot Add', 'Package already in Cart');
    }
  },

  );
  }

  goCart() {
    this.enableCartIcon = false;
    this.router.navigateByUrl('cart/' + this.user);
  }
}

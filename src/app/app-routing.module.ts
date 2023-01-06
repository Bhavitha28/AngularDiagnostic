import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AdminGuard } from 'src/admin.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { LocationComponent } from './location/location.component';
import component from 'node_modules--/@schematics/angular/component';
import { AdminpackageComponent } from './adminpackage/adminpackage.component';
import { BookingComponent } from './booking/booking.component';
import { fullFormats } from 'node_modules--/ajv-formats/dist/formats';

import { UserpackageComponent } from './userpackage/userpackage.component';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { CartComponent } from './cart/cart.component';
import { UserGuard } from 'src/services/user.guard';
import { MyordersComponent } from './myorders/myorders.component';
import { RazorpayCartComponent } from './razorpay-cart/razorpay-cart.component';



const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },

  {
    path: 'navbar',
    component: NavbarComponent,
    pathMatch: 'full',
  },
  {

    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',

  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    
  },
  {
    path: 'userdetails',
    component: UserdetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path:'profile',
    component:ProfileComponent,
    pathMatch:'full'
  },
  {
    path:'location',
    component:LocationComponent,
    pathMatch:'full'
  },
  {
    path:'adminpackage',
    component:AdminpackageComponent,
    pathMatch:'full'
  },
  {
    path:'booking',
    component:BookingComponent,
    pathMatch:'full'
  },
  {
    path:'userpackage',
    component:UserpackageComponent,
    pathMatch:'full'
  },
  {
    // path:'razorpay/:totalBill',
    path:'razorpay/:userId/:productId/:quantity/:cost',
    component:RazorpayComponent,
    pathMatch:'full'
  },

  {
    
    path:'razorpay/:userId/:productId/:quantity/:cost/:id',
    component:RazorpayComponent,
    pathMatch:'full'
  },
  {
  path:'razorpayCart/:totalCost',
  component:RazorpayCartComponent,
  pathMatch:'full'
},
  {
    
    path:'cart/:userId',
    component:CartComponent,
    pathMatch:'full'
  },

  {
    path:'myorders',
    component:MyordersComponent,
    pathMatch:'full'
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

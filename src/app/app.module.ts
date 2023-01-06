import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
//import { FooterComponent } from './components/footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatSelectModule} from '@angular/material/select';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


import { AuthInterceptor } from './auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from 'src/app/user-dashboard/user-dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AdminpackageComponent } from './adminpackage/adminpackage.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { LocationComponent } from './location/location.component';
import { BookingComponent } from './booking/booking.component';
import { UserpackageComponent } from './userpackage/userpackage.component';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { CartComponent } from './cart/cart.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MyordersComponent } from './myorders/myorders.component';
import { RazorpayCartComponent } from './razorpay-cart/razorpay-cart.component';










@NgModule({
  declarations: [
    AppComponent,
NavbarComponent,
HomepageComponent,
LoginComponent,
AdminDashboardComponent,

SignupComponent,
 UserDashboardComponent,
 SidenavComponent,
 UserdetailsComponent,
 AdminpackageComponent,
 AboutComponent,
 ProfileComponent,
 LocationComponent,
 BookingComponent,
 UserpackageComponent,
 RazorpayComponent,
 CartComponent,
 MyordersComponent,
 RazorpayCartComponent,


 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    NgxPaginationModule ,
    NgHttpLoaderModule.forRoot(),
    OrderModule,

    
    FilterPipeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  exports: [MatToolbarModule],
  // providers: [AdminGuard],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule {}

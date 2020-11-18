import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PreviousBookingsComponent } from './previous-bookings/previous-bookings.component';
import { MakeNewBookingComponent } from './make-new-booking/make-new-booking.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  {path: 'previousOrders', component: PreviousBookingsComponent},
  {path: 'newBooking', component:MakeNewBookingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

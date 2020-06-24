import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookkeepingComponent } from './bookkeeping/bookkeeping.component';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { TicketComponent } from './ticket/ticket.component';
import { TimingComponent } from './timing/timing.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bookkeeping', component: BookkeepingComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pms', component: RecordsComponent, canActivate: [AuthGuard] },
  { path: 'timing', component: TimingComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

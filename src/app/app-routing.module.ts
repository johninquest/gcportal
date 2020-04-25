import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { PriceguideComponent } from './priceguide/priceguide.component';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { CoronavirusComponent } from './coronavirus/coronavirus.component';
import { RoadsafetyComponent } from './roadsafety/roadsafety.component';
import { PotholetrackerComponent } from './potholetracker/potholetracker.component';
import { TicketComponent } from './ticket/ticket.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'priceguide', component: PriceguideComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pms', component: RecordsComponent, canActivate: [AuthGuard] },
  { path: 'coronavirus', component: CoronavirusComponent }, 
  { path: 'roadsafety', component: RoadsafetyComponent },
  { path: 'pothole-tracker', component: PotholetrackerComponent },
  { path: 'ticket', component: TicketComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

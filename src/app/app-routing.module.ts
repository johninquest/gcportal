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
import { BusinessComponent } from './business/business.component';
import { TransportComponent } from './transport/transport.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { CurrencyComponent } from './currency/currency.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'information/news', component: NewsComponent },
  { path: 'information/coronavirus', component: CoronavirusComponent }, 
  { path: 'information/roadsafety', component: RoadsafetyComponent },
  { path: 'business', component: BusinessComponent, children: [
    { path: 'receipt', component: ReceiptComponent },
    { path: 'currency', component: CurrencyComponent }
  ]},
  { path: 'transport', component: TransportComponent },
  { path: 'transport/pothole-tracker', component: PotholetrackerComponent },
  { path: 'transport/ticket', component: TicketComponent },
  { path: 'transport/priceguide', component: PriceguideComponent },
  { path: 'transport/login', component: LoginComponent },
  { path: 'transport/pms', component: RecordsComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

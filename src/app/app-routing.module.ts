import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { PriceguideComponent } from './priceguide/priceguide.component';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'priceguide', component: PriceguideComponent },
  { path: 'login', component: LoginComponent },
  { path: 'records', component: RecordsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

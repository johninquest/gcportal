import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { StartdialogComponent } from './startdialog/startdialog.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { WeatherComponent } from './weather/weather.component';
import { NewsComponent } from './news/news.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/startseite', pathMatch: 'full' },
  { path: 'startseite', component: HomeComponent },
  { path: 'datenerfassung', component: InputComponent },
  { path: 'datenvorschau', component: OutputComponent },
  { path: 'startdialog', component: StartdialogComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: 'info', component: AboutComponent },
  { path: 'wetter', component: WeatherComponent },
  { path: 'nachrichten', component: NewsComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AgmCoreModule } from '@agm/core';
import { TicketComponent } from './ticket/ticket.component';
import { BusinessComponent } from './business/business.component';
import { TransportComponent } from './transport/transport.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { CurrencyComponent } from './currency/currency.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    NewsComponent,
    PriceguideComponent,
    RecordsComponent,
    LoginComponent,
    CoronavirusComponent,
    RoadsafetyComponent,
    PotholetrackerComponent,
    TicketComponent,
    BusinessComponent,
    TransportComponent,
    ReceiptComponent,
    CurrencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDASOEZLqXaQhpncdDDZxuneXoo7wBubTw'})
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent]
})

export class AppModule { }

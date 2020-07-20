import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModules } from "./material.modules";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { GuestComponent } from "./guest/guest.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, GuestComponent, InvoiceComponent, AboutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent],
})
export class AppModule {}

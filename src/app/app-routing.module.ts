import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { ContactComponent } from "./contact/contact.component";
import { SolutionsComponent } from "./solutions/solutions.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { from } from "rxjs";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "about", component: AboutComponent },
  { path: "home", component: HomeComponent },
  { path: "quittung", component: InvoiceComponent },
  { path: "contact", component: ContactComponent }, 
  { path: "solutions", component: SolutionsComponent }, 
    { path: "imprint", component: ImprintComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

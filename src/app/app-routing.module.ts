import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AgeCalculatorComponent } from "./age-calculator/age-calculator.component";
import { DownloadsComponent } from "./downloads/downloads.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { SolutionsComponent } from "./solutions/solutions.component";
import { WueDataComponent } from "./demos/wue-data/wue-data.component";
import { from } from "rxjs";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "about", component: AboutComponent },
  {
    path: "age-calculator",
    component: AgeCalculatorComponent,
  },
  { path: "downloads", component: DownloadsComponent },
  { path: "home", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "solutions", component: SolutionsComponent },
  { path: "demos/wue-data", component: WueDataComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

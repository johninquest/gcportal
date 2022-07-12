import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModules } from "./material.modules";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { SolutionsComponent } from "./solutions/solutions.component";
import { NavComponent } from "./nav/nav.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PrivacyComponent } from "./privacy/privacy.component";
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { WuedataComponent } from './demo/wuedata/wuedata.component';
import { WueDataComponent } from './demos/wue-data/wue-data.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        SolutionsComponent,
        NavComponent,
        PrivacyComponent,
        AgeCalculatorComponent,
        DownloadsComponent,
        WuedataComponent,
        WueDataComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModules,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

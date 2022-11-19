import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModules } from "../material.modules";

import { RequestRoutingModule } from "./request-routing.module";
import { RequestComponent } from "./request.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@NgModule({
  declarations: [RequestComponent, InfoDialogComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,

    HttpClientModule,
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
})
export class RequestModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

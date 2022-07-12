import { Component, OnInit } from "@angular/core";
import { WebService } from "../../services/web.service";

@Component({
  selector: "app-wue-data",
  templateUrl: "./wue-data.component.html",
  styleUrls: ["./wue-data.component.scss"],
})
export class WueDataComponent implements OnInit {
  constructor(private _ws: WebService) {}

  ngOnInit(): void {
    this.getTreeData();
    this.getWeatherData();
  }

  weatherData: any;
  soilData: any;

  getTreeData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&facet=alias&facet=time";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => (this.soilData = res),
      (err) => console.log("Error =>", err)
    );
  }

  getWeatherData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=wetter_wue_2022&q=&sort=niederschlag&facet=niederschlag&facet=rain_1h&facet=snow_1h";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => (this.weatherData = res),
      (err) => console.log("Error =>", err)
    );
  }
}

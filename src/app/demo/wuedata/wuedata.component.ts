import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebService } from "../../services/web.service";

@Component({
  selector: "app-wuedata",
  templateUrl: "./wuedata.component.html",
  styleUrls: ["./wuedata.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class WuedataComponent implements OnInit {
  constructor(private _ws: WebService) {}

  ngOnInit(): void {
    this.getTreeData();
    this.getWeatherData();
  }

  weatherData: any;
  treeData: any;

  getTreeData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&facet=alias&facet=time";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => (this.treeData = res),
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

import { Component, OnInit } from "@angular/core";
import { WebService } from "../../services/web.service";
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  LinearScale,
} from "chart.js";

@Component({
  selector: "app-wue-data",
  templateUrl: "./wue-data.component.html",
  styleUrls: ["./wue-data.component.scss"],
})
export class WueDataComponent implements OnInit {
  constructor(private _ws: WebService) {
    Chart.register(
      BarElement,
      BarController,
      CategoryScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      LinearScale
    );
  }

  ngOnInit(): void {
    this.getSoilData();
    this.getWeatherData();
    // this.probeChart();
  }

  weatherData: any;
  soilData: any;
  rainFallData: Array<number> = [];

  getSoilData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&facet=alias&facet=time";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => {
        this.soilData = res;
        console.log("Records =>", res["records"]);
      },
      (err) => console.log("Error =>", err)
    );
  }

  getWeatherData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=wetter_wue_2022&q=&sort=niederschlag&facet=niederschlag&facet=rain_1h&facet=snow_1h";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => {
        this.weatherData = res;
        this.rainFallData = res["records"].map(
          (data: any) => data["fields"]["niederschlag"]
        );
        console.log("Rainfall data:", this.rainFallData);
        let test_data = [12, 19, 3, 5, 2, 3, 7, 4.3, 8, 11];
        console.log("Test data: ", test_data);
        console.log("Test data type", typeof test_data);
        console.log("Rainfall data length:", this.rainFallData.length);
        this.probeChart(this.rainFallData);
      },
      (err) => console.log("Error =>", err)
    );
  }

  probeChart(chartData: any) {
    // const ctx = document.getElementById("myChart").getContext("2d");
    let _chart = new Chart("myChart", {
      type: "bar",
      data: {
        /* labels: [
          "Red",
          "Blue",
          "Yellow",
          "Green",
          "Purple",
          "Orange",
          "Red",
          "Blue",
          "Yellow",
          "Green",
        ], */
        labels: this.rainFallData,
        datasets: [
          {
            label: "Niederschlag - Würzburg",
            // data: [12, 19, 3, 5, 2, 3, 7, 4.3, 8, 11],
            /*  barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2, */
            data: this.rainFallData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      /*       options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }, */
    });
    return _chart;
  }
}

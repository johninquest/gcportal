import { Component, OnInit } from "@angular/core";
import { WebService } from "../../services/web.service";
import dayjs from "dayjs";
import {
  Chart,
  ChartConfiguration,
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
  soilHumidityData: any;
  rainFallQty: Array<number> = [];
  rainFallDate: Array<any> = [];
  soilHumidityVals: Array<number> = [];
  soilHumidityCoordsX: Array<any> = [];

  getSoilData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&rows=10000&refine.time=2022&sort=record_timestamp";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => {
        this.soilHumidityData = res;
        // console.log("Records =>", res["records"]);
        this.soilHumidityVals = res["records"].map(
          (data: any) => data["fields"]["volwatercontent_1"]
        );
        this.soilHumidityCoordsX = res["records"].map((data: any) =>
          dayjs(data["fields"]["time"]).format("DD.MM.YYYY")
        );
        /* (data: any) => data["fields"]["time"]
        ); */
        this.plotSoilHumidityByDay(res);
      },
      (err) => console.log("Error =>", err)
    );
  }

  getWeatherData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=wetter_wue_2022&q=&rows=5000&sort=dt_iso&facet=niederschlag";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => {
        this.weatherData = res;
        this.rainFallQty = res["records"].map(
          (data: any) => data["fields"]["niederschlag"]
        );
        this.rainFallDate = res["records"].map((data: any) =>
          dayjs(data["fields"]["dt_iso"]).format("DD.MM.YYYY")
        );
        this.probeChart(this.rainFallQty);
      },
      (err) => console.log("Error =>", err)
    );
  }

  probeChart(chartData: any) {
    // const ctx = document.getElementById("myChart").getContext("2d");
    let _xAxisData = this.rainFallDate.reverse();
    let _yAxisData = this.rainFallQty.reverse();
    let _chart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: _xAxisData,
        datasets: [
          {
            label: "Niederschlag - Würzburg",
            // data: [12, 19, 3, 5, 2, 3, 7, 4.3, 8, 11],
            /*  barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2, */
            data: _yAxisData,
            backgroundColor: [
              "rgba(182, 31, 56, 255)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(182, 31, 56, 255)",
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
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                weight: "Bold",
              },
            },
          },
        },
      },
    });
    return _chart;
  }

  plotSoilHumidityByDay(rawData: any) {
    let _chart = new Chart("soilHumidityChart", {
      type: "bar",
      data: {
        labels: this.soilHumidityCoordsX.reverse(),
        datasets: [
          {
            label: "Bodenfeuchtigkeit - Hubland / Würzburg",
            data: this.soilHumidityVals.reverse(),
            backgroundColor: [
              "rgba(182, 31, 56, 255)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(182, 31, 56, 255)",
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
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 20,
                weight: "Bold",
              },
            },
          },
        },
      },
    });
    return _chart;
  }
}

/* 
wue color 
hex = #b41c3c
rgb => rgba(182,31,56,255)
*/

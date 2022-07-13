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
  soilData: any;
  rainFallQty: Array<number> = [];
  rainFallDate: Array<number> = [];

  getSoilData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&facet=alias&facet=time";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => {
        this.soilData = res;
        // console.log("Records =>", res["records"]);
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
        this.rainFallQty = res["records"].map(
          (data: any) => data["fields"]["niederschlag"]
        );
        this.rainFallDate = res["records"].map((data: any) =>
          dayjs(data["fields"]["dt_iso"]).format("DD.MM.YYYY")
        );
        // console.log("Rainfall date: ", this.rainFallDate);
        /* console.log("Rainfall data:", this.rainFallData);
        let test_data = [12, 19, 3, 5, 2, 3, 7, 4.3, 8, 11];
        console.log("Test data: ", test_data);
        console.log("Test data type", typeof test_data);
        console.log("Rainfall data length:", this.rainFallData.length); */
        this.probeChart(this.rainFallQty);
      },
      (err) => console.log("Error =>", err)
    );
  }

  probeChart(chartData: any) {
    // const ctx = document.getElementById("myChart").getContext("2d");
    let _chart = new Chart("myChart", {
      type: "bar",
      data: {
        labels: this.rainFallDate,
        datasets: [
          {
            label: "Niederschlag - Würzburg",
            // data: [12, 19, 3, 5, 2, 3, 7, 4.3, 8, 11],
            /*  barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2, */
            data: this.rainFallQty,
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

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<"bar">["data"] = {
    labels: ["2006", "2007", "2008", "2009", "2010", "2011", "2012"],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
      { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
    ],
  };

  public barChartOptions: ChartConfiguration<"bar">["options"] = {
    responsive: true,
  };
}

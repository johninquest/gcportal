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
import { FormControl } from "@angular/forms";

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
    this.getWeatherData();
    // this.getSoilHumidityData2();
    // this.getSoilHumidityByTree("baum_2");
    this.getSoilHumidityByTree("Baum_1", "baum1");
    this.getSoilHumidityByTree("Baum_2", "baum2");
    // this.plotSoilHumidityByTree("soilHumidityByDayBaum1", "baum_1", _chartData);
  }

  weatherData: any;
  soilHumidityData: any;
  rainFallQty: Array<number> = [];
  rainFallDate: Array<any> = [];
  soilHumidityVals: Array<number> = [];
  soilHumidityCoordsX: Array<any> = [];
  soilHumidityByDayYCoords: Array<number> = [];
  soilHumidityByDayXCoords: Array<any> = [];
  soilHumidityDataSrc: Array<object> = [
    {
      value:
        "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&rows=10000&refine.time=2022&sort=record_timestamp&refine.alias=Baum_1",
      viewValue: "Baum_1",
    },
    {
      value:
        "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&rows=10000&refine.time=2022&sort=record_timestamp&refine.alias=Baum_2",
      viewValue: "Baum_2",
    },
  ];

  selectedTree = new FormControl<string | null>("");

  /*   getSoilHumidityData2() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&rows=10000&refine.time=2022&sort=record_timestamp&refine.alias=Baum_1";
    let _newList: Array<object> = [];
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => {
        let _records: Array<object> = res["records"];
        _records.map((data) => {
          let _obj = {
            record_timestamp: dayjs(data["record_timestamp"]).format(
              "YYYY-MM-DD"
            ),
            volwatercontent_1: data["fields"]["volwatercontent_1"],
          };
          _newList.push(_obj);
        });
        console.log("New list =>", _newList.length);
        this.groupRecordsFromSameDay(_newList);
      },
      (err) => console.log("Error =>", err)
    );
  } */

  getWeatherData() {
    let _url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=wetter_wue_2022&q=&rows=10000&sort=dt_iso&facet=niederschlag";
    let _req = this._ws.getRequest(_url);
    _req.subscribe(
      (res) => {
        this.weatherData = res;
        this.rainFallQty = res["records"].map(
          (data: any) => data["fields"]["niederschlag"]
        );
        this.rainFallDate = res["records"].map((data: any) =>
          dayjs(data["fields"]["dt_iso"]).format("YYYY-MM-DD")
        );
        this.plotRainfall();
      },
      (err) => console.log("Error =>", err)
    );
  }

  getSoilHumidityByTree(treeId: string, canvasElementId: string) {
    let _tree1Url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&rows=10000&refine.time=2022&sort=record_timestamp&refine.alias=Baum_1";
    let _tree2Url: string =
      "https://opendata.wuerzburg.de/api/records/1.0/search/?dataset=baeren-bodenfeuchte&q=&rows=10000&refine.time=2022&sort=record_timestamp&refine.alias=Baum_2";
    let _newList: Array<object> = [];
    if (treeId === "Baum_1") {
      let _req = this._ws.getRequest(_tree1Url);
      _req.subscribe(
        (res) => {
          let _records: Array<object> = res["records"];
          _records.map((data) => {
            let _obj = {
              record_timestamp: dayjs(data["record_timestamp"]).format(
                "YYYY-MM-DD"
              ),
              volwatercontent_1: data["fields"]["volwatercontent_1"],
            };
            _newList.push(_obj);
          });
          let _plotData: any = this.groupRecordsFromSameDay(_newList);
          this.plotSoilHumidityByTree(canvasElementId, treeId, _plotData);
          // return _newList;
        },
        (err) => console.log("Error =>", err)
      );
    }
    if (treeId === "Baum_2") {
      let _req = this._ws.getRequest(_tree2Url);
      _req.subscribe(
        (res) => {
          let _records: Array<object> = res["records"];
          _records.map((data) => {
            let _obj = {
              record_timestamp: dayjs(data["record_timestamp"]).format(
                "YYYY-MM-DD"
              ),
              volwatercontent_1: data["fields"]["volwatercontent_1"],
            };
            _newList.push(_obj);
          });
          let _plotData: any = this.groupRecordsFromSameDay(_newList);
          this.plotSoilHumidityByTree(canvasElementId, treeId, _plotData);
          // return _newList;
        },
        (err) => console.log("Error =>", err)
      );
    }
  }

  groupRecordsFromSameDay(arr: Array<object>) {
    let res: Array<object> = arr.reduce((acc: any, obj: any) => {
      let existObj = acc.find(
        (item: any) => item["record_timestamp"] === obj["record_timestamp"]
      );
      if (existObj) {
        existObj["volwatercontent_1"] =
          existObj["volwatercontent_1"] + obj["volwatercontent_1"];
        return acc;
      }
      acc.push(obj);
      return acc;
    }, []);
    res.reverse();
    let _obj: object = {
      yCoords: res.map((data) => data["volwatercontent_1"]),
      xCoords: res.map((data) => data["record_timestamp"]),
    };
    return _obj;
  }

  plotRainfall() {
    let _ctx = document.getElementById("rainfallChart") as HTMLCanvasElement;
    _ctx.getContext("2d");
    let _xAxisData = this.rainFallDate.reverse();
    let _yAxisData = this.rainFallQty.reverse();
    let _chart = new Chart(_ctx, {
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
              /*  "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)", */
            ],
            /* borderColor: [
              "rgba(182, 31, 56, 255)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1, */
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
                // size: 15,
                weight: "Bold",
              },
            },
          },
        },
      },
    });
    return _chart;
  }

  plotSoilHumidityByDay() {
    let _ctx = document.getElementById(
      "soilHumidityByDayChart"
    ) as HTMLCanvasElement;
    _ctx.getContext("2d");
    let _chart = new Chart(_ctx, {
      type: "bar",
      data: {
        labels: this.soilHumidityByDayXCoords,
        datasets: [
          {
            label: "Bodenfeuchtigkeit pro Tag - Hubland, Wü",
            data: this.soilHumidityByDayYCoords,
            backgroundColor: [
              "rgba(182, 31, 56, 255)",
              /*  "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)", */
            ],
            /*  borderColor: [
              "rgba(182, 31, 56, 255)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ], */
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
                // size: 15,
                weight: "Bold",
              },
            },
          },
        },
      },
    });
    return _chart;
  }
  getSoilDataAtTree(treeId: string) {}

  async plotSoilHumidityByTree(
    canvasElementId: string,
    treeId: string,
    chartData: any
  ) {
    /* let chartData: any = await this.getSoilHumidityByTree(treeId);
    console.log("Data at plot", chartData); */
    let xCoordsData: Array<string> = chartData["xCoords"];
    let yCoordsData: Array<number> = chartData["yCoords"];
    let _ctx = document.getElementById(canvasElementId) as HTMLCanvasElement;
    _ctx.getContext("2d");
    let _chart = new Chart(_ctx, {
      type: "bar",
      data: {
        labels: xCoordsData,
        datasets: [
          {
            label: `Bodenfeuchtigkeit (${treeId}) pro Tag - Hubland, Wü`,
            data: yCoordsData,
            backgroundColor: ["rgba(182, 31, 56, 255)"],

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
                // size: 15,
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

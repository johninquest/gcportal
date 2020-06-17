import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';

@Component({
  selector: 'app-potholetracker',
  templateUrl: './potholetracker.component.html',
  styleUrls: ['./potholetracker.component.css']
})
export class PotholetrackerComponent implements OnInit {

  constructor(private ws: WebService, private snackBar: MatSnackBar) {}

  lat: number; lng: number; deviceIp: string;
  potholeData: any;

  savePotholeLocation() {
    let saveDialog = confirm(`Reporting pothole ... 📝 \nPlease allow access to your phone's location.`);
    if(saveDialog === true) {
      if(navigator.geolocation) {
      // console.log('Geolocation is supported!');
        navigator.geolocation.getCurrentPosition( (position) => {
        let myLatitude = position.coords.latitude;
        let myLongitude = position.coords.longitude;
        let reqEndpoint: string = 'https://mandiguide2020.appspot.com/save_pothole_data';
        let reqPayload: object = { tb_name: 'potholes', geo_lat: myLatitude, geo_lng: myLongitude, geo_ip: this.deviceIp };
        let obs = this.ws.postRequest(reqEndpoint, reqPayload);
        obs.subscribe(
          res => this.savePotholesResponseHandler(res),
          err => console.log(err)
        );
      });
     }else {
      // console.log('Geolocation is not supported!');
      alert('Your GPS is either not activated or not working properly.');
      }
    }    
  }

  savePotholesResponseHandler(responseData: object) {
    if(responseData['insertId'] !== 0 && responseData['warningCount'] === 0) {
      this.snackBar.open('Pothole location reported successfully 👍', '', { duration: 4000 });
    }if(responseData['errno']) {
      alert('Something went wrong ⚠️ \nPlease try again later.');
    }
  }

  showPotholes() {
    if(navigator.geolocation) {
      // console.log('Geolocation is supported!');
      navigator.geolocation.getCurrentPosition( (position) => {
        let myLatitude = position.coords.latitude;
        let myLongitude = position.coords.longitude;
        this.lat = myLatitude;
        this.lng = myLongitude;
        let reqEndpoint: string = 'https://mandiguide2020.appspot.com/get_all_pothole_data';
        let reqPayload: object = { tb_name: 'potholes' };
        let obs = this.ws.postRequest(reqEndpoint, reqPayload);
        obs.subscribe(
          res => this.potholeData = res,
          err => console.log(err)
        );
      });
    }else {
      console.log('Geolocation is not supported!');
    }
  }

  getPublicIp() {
    let reqEndpoint: string = 'https://api.ipify.org?format=json';
    let obs = this.ws.getRequest(reqEndpoint);
    obs.subscribe(
      res => this.deviceIp = res['ip'], 
      err => console.log(err)
    );
  }

  ngOnInit(): void { 
    this.getPublicIp();
   }

}
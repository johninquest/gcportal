import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-potholetracker',
  templateUrl: './potholetracker.component.html',
  styleUrls: ['./potholetracker.component.css']
})

export class PotholetrackerComponent implements OnInit {

  constructor(private dbs: DbService, private snackBar: MatSnackBar) {}

  lat: number; lng: number;
  potholeData: any;

  savePotholeLocation() {
    let saveDialog = confirm('Reporting pothole location ... ');
    if(saveDialog === true) {
      if(navigator.geolocation) {
      // console.log('Geolocation is supported!');
        navigator.geolocation.getCurrentPosition( (position) => {
        let myLatitude = position.coords.latitude;
        let myLongitude = position.coords.longitude;
        let reqEndpoint: string = 'save_pothole_data';
        let reqPayload: object = { tb_name: 'potholes', geo_lat: myLatitude, geo_lng: myLongitude };
        let obs = this.dbs.postRequest(reqEndpoint, reqPayload);
        obs.subscribe(
          res => this.saveResponseHandler(res),
          err => console.log(err)
        );
      });
     }else {
      // console.log('Geolocation is not supported!');
      alert('Your GPS is either not activated or not working properly');
      }
    }    
  }

  saveResponseHandler(dbResponse: object) {
    if(dbResponse['insertId'] !== 0 && dbResponse['warningCount'] === 0) {
      this.snackBar.open('Pothole location reported successfully 👍', '', { duration: 4000 });
    }if(dbResponse['errno']) {
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
        let reqEndpoint: string = 'get_all_pothole_data';
        let reqPayload: object = { tb_name: 'potholes' };
        let obs = this.dbs.postRequest(reqEndpoint, reqPayload);
        obs.subscribe(
          res => { 
            this.potholeData = res;
           },
          err => console.log(err)
        );
      });
    }else {
      console.log('Geolocation is not supported!');
    }
  }

  ngOnInit(): void { }

}

/*  
  getPosition(event: object) {
    console.log(event);
  } 
*/
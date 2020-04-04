import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-potholetracker',
  templateUrl: './potholetracker.component.html',
  styleUrls: ['./potholetracker.component.css']
})

export class PotholetrackerComponent implements OnInit {

  constructor(private dbs: DbService) {}

  lat: number;
  lng: number;
  potholeData: any;

  savePotholeLocation() {
    let saveDialog = confirm('This pothole location is now going to be reported ... ');
    if(saveDialog === true) {
      if(navigator.geolocation) {
      // console.log('Geolocation is supported!');
        navigator.geolocation.getCurrentPosition( (position) => {
        let myLatitude = position.coords.latitude;
        let myLongitude = position.coords.longitude;
        // console.log([myLatitude, myLongitude]);
        let reqEndpoint: string = 'save_pothole_data';
        let reqPayload: object = { tb_name: 'potholes', geo_lat: myLatitude, geo_lng: myLongitude };
        let obs = this.dbs.postRequest(reqEndpoint, reqPayload);
        obs.subscribe(
          res => { 
            console.log(res);
            alert('Pothole location reported successfully')
            // this.showPotholes();
           },
          err => console.log(err)
        );
      });
     }else {
      // console.log('Geolocation is not supported!');
      alert('Your GPS is either not activated or not working properly');
      }
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
            // console.log(res);
            this.potholeData = res;
           },
          err => console.log(err)
        );
      });
    }else {
      console.log('Geolocation is not supported!');
    }
  }

/*  getPosition(event: object) {
    console.log(event);
  } */

  ngOnInit(): void { }

}

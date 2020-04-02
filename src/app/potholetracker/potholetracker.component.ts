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

  saveGeoLocation() {
    if(navigator.geolocation) {
      console.log('Geolocation is supported!');
      navigator.geolocation.getCurrentPosition( (position) => {
        let currentLat = position.coords.latitude;
        let currentLng = position.coords.longitude;
        this.lat = currentLat;
        this.lng = currentLng;
        console.log([currentLat, currentLng]);
      /*  let reqEndpoint: string = 'save_pothole_data';
        let reqPayload: object = { tb_name: 'potholes', geo_lat: lat, geo_lng: lng };
        let obs = this.dbs.postRequest(reqEndpoint, reqPayload);
        obs.subscribe(
          res => console.log(res),
          err => console.log(err)
        ); */
      });
    }else {
      console.log('Geolocation is not supported!');
    }
  }

  getPosition(event: object) {
    console.log(event);
  }

  msg() { 
    alert('Under construction 👷🏾');
  }  

  ngOnInit(): void { }

}

import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import moment from 'moment';

@Component({
  selector: 'app-potholetracker',
  templateUrl: './potholetracker.component.html',
  styleUrls: ['./potholetracker.component.css']
})
export class PotholetrackerComponent implements OnInit {

  constructor(private dbs: DbService) {}

  // GOOGLE CLOUD API KEY = AIzaSyDASOEZLqXaQhpncdDDZxuneXoo7wBubTw

  saveGeoLocation() {
    if(navigator.geolocation) {
      console.log('Geolocation is supported!');
      navigator.geolocation.getCurrentPosition( (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        console.log([lat, lng]);
        let reqEndpoint: string = 'save_pothole_data';
        let reqPayload: object = { tb_name: 'potholes', geo_lat: lat, geo_lng: lng };
        let obs = this.dbs.postRequest(reqEndpoint, reqPayload);
        obs.subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      });
    }else {
      console.log('Geolocation is not supported!');
    }
  }

  msg() { 
    alert('Under construction 👷🏾');
  }  

  ngOnInit(): void { }

}

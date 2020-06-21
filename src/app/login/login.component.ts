import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid = new FormControl('', Validators.required);
  userpwd = new FormControl('', Validators.required);
  
  constructor(private ws: WebService, private rt: Router) { }

  verifyUser() { 
    let userData: object = { tb_name: 'users',  username: this.userid.value, userpwd: this.userpwd.value };
    let reqEndpoint: string = 'https://mandiguide2020.appspot.com/check_user';
    let obs = this.ws.postRequest(reqEndpoint, userData);
    obs.subscribe( 
      res => {
        if(res['message'] === 'OK') {
          sessionStorage.setItem('access', 'allowed');
          this.rt.navigateByUrl('/pms');
        }else if(res['message'] === 'NOK') {
          alert('Login failed');
        }else {
          alert('Not sure what happened');
        }
      },
      err => { 
        alert('Network or firewall problems! \nPlease try again later'); }
    ); 
  }

  ngOnInit() { }

}

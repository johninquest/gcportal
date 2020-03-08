import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userid = new FormControl('', Validators.required);
  userpwd = new FormControl('', Validators.required);
  
  constructor(private dbs: DbService, private rt: Router) { }

  verifyUser() { 
    let userData: object = { tb_name: 'users',  username: this.userid.value, userpwd: this.userpwd.value };
    // console.log(userData);
    let reqEndpoint: string = 'check_user';
    let obs = this.dbs.authUser(reqEndpoint, userData);
    obs.subscribe( 
      res => {
        // console.log('RES => ' + JSON.stringify(res));
        if(res['message'] === 'OK') {
          // alert('Login successful!');
          sessionStorage.setItem('access', 'allowed');
          this.rt.navigateByUrl('/records');
        }else if(res['message'] === 'NOK') {
          alert('Login failed');
        }else {
          alert('Not sure what happened');
        }
      },
      err => { 
        console.log('ERR => ' + JSON.stringify(err));
        alert('Network issue. \nPlease try again later'); }
    ); 
  }

  ngOnInit() { }

}

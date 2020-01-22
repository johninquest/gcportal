import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userid = new FormControl('', Validators.required);
  userpwd = new FormControl('', Validators.required);
  
  constructor(private dbs: DbService) { }

  verifyUser() { 
    let userData: object = { db_table: 'users',  user: this.userid.value, pwd: this.userpwd.value };
    console.log(userData);
    let reqEndpoint: string = 'user_check';
    let obs = this.dbs.authUser(reqEndpoint, userData);
    obs.subscribe( 
      res => console.log('RES => ' + res),
      err => console.log('ERR => ' + err)
    ); 
  }

  ngOnInit() { }

}

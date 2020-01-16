import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userid = new FormControl('', Validators.required);
  userpassword = new FormControl('');
  constructor() { }

  userAuth() { 
    alert('Under construction') 
  }

  ngOnInit() { }

}

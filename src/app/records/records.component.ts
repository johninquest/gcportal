import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';
import moment from 'moment';
import { Router } from '@angular/router';
import { START, END } from '../destinations';

export interface placesListDesc {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent implements OnInit {

  constructor(private dbs: DbService, private rt: Router) { }

  toggleInput: boolean = false;
  start = new FormControl(''); end = new FormControl('');
  surname = new FormControl('', Validators.required); givennames = new FormControl(''); 
  fee = new FormControl(''); nidn = new FormControl('') // National Id number
  dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
  startPlaces: placesListDesc[] = START; endPlaces: placesListDesc[] = END;
  salesData: any; balanceData: any;

  showAllData() { 
    this.toggleInput = false;
    let reqEndpoint: string = 'get_all_rows_in_table';
    let sqlPayload: object = { tb_name: 'sales' };
    let obs = this.dbs.getAllRowsInTable(reqEndpoint, sqlPayload);
    obs.subscribe(
      res => {
        // console.log(res); 
        this.salesData = res; 
      },
      err => { console.log(err) }
    );
  }

  addData() { 
    let reqEndpoint: string = 'add_row_to_table';
    let createData: object = {
      tb_name: 'sales',
      from: this.start.value,
      to: this.end.value,
      surname: this.surname.value,
      givennames: this.givennames.value,
      fee: this.fee.value, 
      created: this.dateNow
    };
    let obs = this.dbs.addRowToTable(reqEndpoint, createData);
    obs.subscribe(
      res => { 
        console.log(res);
        this.resHandler(res);
        this.showAllData();
       },
      err => console.log(err)
    );
   }

  updateData() { 
    let updateData: object = {
      tb_name: 'sales',
      from: this.start.value,
      to: this.end.value,
      surname: this.surname.value,
      givennames: this.givennames.value,
      fee: this.fee.value, 
      updated: this.dateNow
    };
    return alert('Under construction 👷🏾');
   }

  deleteData() { 
    let deleteData: object = {};
    return alert('Under construction 👷🏾');
   }

  resHandler(resData: object) {
    console.log(resData);
    if(resData['insertId'] !== 0 && resData['warningCount'] === 0) {
      alert('Your information was successfully ADDED!')
    }if(resData['insertId'] === 0 && resData['warningCount'] === 0) {
      alert('Your information was successfully UPDATED!')
    }if(resData['errno']) {
      alert('You submitted invalid information \nPlease verify and try again.');
    }
  }

  feeTotal(arr: any) { 
    if(arr) {
      let sumedFees = arr.reduce((acc: number, { fee }: { fee: number }) => acc + fee, 0);
      // console.log(sumedFees);
      return sumedFees;
    }else {
      // console.log('No money');
      return 0;
    }    
   }

  msg() {
    alert('Under construction 👷🏾');
  } 

  showInput() { 
    this.salesData = null;
    this.toggleInput = true; 
  }

  hideInput() { this.toggleInput = false; }

  dateFormater(dbDate: string) {
     // let outDate = moment(dbDate).format('DD.MM.YYYY HH:mm');
     let outDate = moment(dbDate).format('DD.MM.YYYY');
     return outDate;
   }

  logout() {
    sessionStorage.removeItem('access');
    this.rt.navigateByUrl('/login');
  }

  getBalance(period: string) {
    let reqEndpoint: string = 'get_total'; 
    if(period === 'day') {
      let reqObject: object = { tb_name: 'sales', period: 'day' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { 
          console.log(res);
          alert(`Today's balance is: ${res[0]['dayTotal']} XAF`)
         },
        err => console.log(err) 
        );
    }if(period === 'week') {
      let reqObject: object = { tb_name: 'sales', period: 'week' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { 
          console.log(res);
          alert(`This week's balance is: ${res[0]['weekTotal']} XAF`); 
        },
        err => console.log(err) );
    }if(period === 'month') {
      let reqObject: object = { tb_name: 'sales', period: 'month' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { console.log(res); 
          alert(`This month's balance is: ${res[0]['monthTotal']} XAF`); 
        },
        err => console.log(err) );
    }if(period === 'year') {
      let reqObject: object = { tb_name: 'sales', period: 'year' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { 
          console.log(res);
          alert(`This year's balance is: ${res[0]['yearTotal']} XAF`);
        },
        err => console.log(err) 
        );
    }
  }

  displayedColumns: string[] = ['route', 'person', 'details'];

  ngOnInit() {
    this.showAllData();
   }

}

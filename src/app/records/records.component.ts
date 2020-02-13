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

  getAllSalesRecords() { 
    this.toggleInput = false;
    this.balanceData = null;
    let reqEndpoint: string = 'get_all_rows_in_table';
    let sqlPayload: object = { tb_name: 'sales' };
    let obs = this.dbs.getAllRowsInTable(reqEndpoint, sqlPayload);
    obs.subscribe(
      res => {
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
        this.addResponseHandler(res);
       },
      err => console.log(err)
    );
   }

  addResponseHandler(resData: object) {
    console.log(resData);
    if(resData['insertId'] !== 0 && resData['warningCount'] === 0) {
      alert('PASSENGER successfully ADDED');
      this.ngOnInit();
    }if(resData['insertId'] === 0 && resData['warningCount'] === 0) {
      alert('PASSENGER successfully UPDATED')
    }if(resData['errno']) {
      alert('You submitted invalid information \nPlease verify and try again.');
    }
  } 

  updateData() { 
    // this.toggleInput = true;
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
  
  deleteData(targetRow: number) { 
    let deleteDialog = confirm('Sure you want to delete this?');
    if(deleteDialog === true) {
      let reqEndpoint: string = 'delete_row_in_table';
      let deleteData: object = {
        tb_name: 'sales',
        row_id: targetRow
      };
      // console.log(targetRow);
      let obs = this.dbs.postReq(reqEndpoint, deleteData);
      obs.subscribe(
        res => { 
        this.deleteResponseHandler(res);
        this.ngOnInit();
       },
        err => console.log(err)
      );
    }else {
      console.log('Delete was cancelled')
    }  
   }

  deleteResponseHandler(resData: object) {
    if(resData['affectedRows'] === 1 && resData['warningCount'] === 0) {
      console.log('Delete was successful');
      // alert('PASSENGER successfully DELETED');
    }if(resData['affectedRows'] === 0 && resData['warningCount'] === 0) {
      alert('NOTHING DELETED');
     }
   }

  feeTotal(arr: any) { 
    if(arr) {
      let sumedFees = arr.reduce((acc: number, { fee }: { fee: number }) => acc + fee, 0);
      return sumedFees;
    }else { return 0; }    
   }

  msg() {
    alert('Under construction 👷🏾');
  } 

  showInput() { 
    this.salesData = null;
    this.balanceData = null;
    this.toggleInput = true; 
  }

  cancelAdd() {
    this.toggleInput = false;
    this.getAllSalesRecords();
  }
  // hideInput() { this.toggleInput = false; }

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
    this.salesData = null;
    this.toggleInput = false;
    let reqEndpoint: string = 'get_total'; 
    if(period === 'day') {
      let reqObject: object = { tb_name: 'sales', period: 'day' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { this.balanceData = res },
        err => console.log(err) 
        );
    }if(period === 'week') {
      let reqObject: object = { tb_name: 'sales', period: 'week' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { this.balanceData = res },
        err => console.log(err) );
    }if(period === 'month') {
      let reqObject: object = { tb_name: 'sales', period: 'month' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { this.balanceData = res },
        err => console.log(err) );
    }if(period === 'year') {
      let reqObject: object = { tb_name: 'sales', period: 'year' };
      let obs = this.dbs.postReq(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { this.balanceData = res },
        err => console.log(err) 
        );
    }
  }

  formatTotal(totalObj: any) {
    if('dayTotal' in totalObj[0]) {
      let message: string = `today's balance`;
      let amount: number = totalObj[0]['dayTotal'];
      return [message, amount];
    }if('weekTotal' in totalObj[0]) {
      let message: string = `this week's balance`;
      let amount: number = totalObj[0]['weekTotal'];
      return [message, amount];
    }if('monthTotal' in totalObj[0]) {
      let message: string = `this month's balance`;
      let amount: number = totalObj[0]['monthTotal'];
      return [message, amount];
    }if('yearTotal' in totalObj[0]) {
      let message: string = `this year's balance`;
      let amount: number = totalObj[0]['yearTotal'];
      return [message, amount];
    }else {
      let message: string = '';
      let amount: number = 0;
      return [message, amount];
    }
   }

  displayedColumns: string[] = ['route', 'person', 'details', 'options'];

  ngOnInit() {
    this.getAllSalesRecords();
   }
}

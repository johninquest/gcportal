import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WebService } from '../services/web.service';
import { Router } from '@angular/router';
import { PLACES } from '../lists/transport';
import moment from 'moment';

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

  constructor(private ws: WebService, private rt: Router) { }

  toggleAddForm: boolean = false; 
  toggleUpdateForm: boolean = false;
  start = new FormControl(''); end = new FormControl('');
  surname = new FormControl('', Validators.required); givennames = new FormControl(''); 
  fee = new FormControl(''); 
  nidn = new FormControl('') // National Id number
  datetime_now = moment().format('YYYY-MM-DD HH:mm:ss');
  startPlaces: placesListDesc[] = PLACES; endPlaces: placesListDesc[] = PLACES;
  salesData: any; 
  balanceData: any; 
  updateRowId: number;

  getAllSalesRecords() { 
    this.toggleAddForm = false;
    this.toggleUpdateForm = false;
    this.balanceData = null;
    let reqEndpoint: string = 'https://mandiguide2020.appspot.com/get_all_rows_in_table';
    let sqlPayload: object = { tb_name: 'sales' };
    let obs = this.ws.postRequest(reqEndpoint, sqlPayload);
    obs.subscribe(
      res => {
        this.salesData = res; 
      },
      err => { console.log(err) }
    );
  }

  addData() { 
    let createEndpoint: string = 'https://mandiguide2020.appspot.com/add_row_to_table';
    let createData: object = {
      tb_name: 'sales',
      from: this.start.value,
      to: this.end.value,
      surname: this.surname.value,
      givennames: this.givennames.value,
      fee: this.fee.value, 
      created: this.datetime_now
    };
    let obs = this.ws.postRequest(createEndpoint, createData);
    obs.subscribe(
      res => { 
        this.addResponseHandler(res);
       },
      err => console.log(err)
    );
   }

  addResponseHandler(resData: object) {
    if(resData['insertId'] !== 0 && resData['warningCount'] === 0) {
      this.ngOnInit();
    }if(resData['errno']) {
      alert('You submitted invalid information \nPlease verify and try again.');
    }
  } 

  getUpdateData(rowData: object) {
    this.resetInputs();
    this.toggleAddForm = false;
    this.toggleUpdateForm = true;
    this.updateRowId = rowData['_id'];
    this.start.setValue(rowData['_start']);
    this.end.setValue(rowData['_end']);
    this.surname.setValue(rowData['_surname']);
    this.givennames.setValue(rowData['_givennames']);
    this.fee.setValue(rowData['_fee']);
  }

  updateData() { 
    let updateEndpoint: string = 'https://mandiguide2020.appspot.com/update_row_in_table';
    let updateData: object = {
      tb_name: 'sales',
      row_id: this.updateRowId,
      from: this.start.value,
      to: this.end.value,
      surname: this.surname.value,
      givennames: this.givennames.value,
      fee: this.fee.value, 
      updated: this.datetime_now
    };
    let obs = this.ws.postRequest(updateEndpoint, updateData);
    obs.subscribe(
      res => this.updateResponseHandler(res),
      err => this.updateResponseHandler(err)
    );
   }

  updateResponseHandler(resData: object) {
     if(resData['insertId'] === 0 && resData['warningCount'] === 0) {
       this.ngOnInit();
     }if(resData['errno']) {
      alert('You submitted invalid information \nPlease verify and try again.');
    }
   }

  resetInputs() {
    this.start.reset();
    this.end.reset();
    this.surname.reset();
    this.givennames.reset();
    this.fee.reset();
  } 
  
  deleteData(targetRow: number) { 
    let deleteDialog = confirm('Delete this information?');
    if(deleteDialog === true) {
      let reqEndpoint: string = 'https://mandiguide2020.appspot.com/delete_row_in_table';
      let deleteData: object = {
        tb_name: 'sales', 
        row_id: targetRow
      };
    let obs = this.ws.postRequest(reqEndpoint, deleteData);
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
      let sumedFees = arr.reduce((acc: number, { _fee }: { _fee: number }) => acc + _fee, 0);
      return sumedFees;
    }else { return 0; }    
   }

  showAddForm() { 
    this.resetInputs();
    this.salesData = null;
    this.balanceData = null;
    this.toggleUpdateForm = false;
    this.toggleAddForm = true; 
  }

  showUpdateForm() {
    this.resetInputs();
    this.salesData = null;
    this.balanceData = null;
    this.toggleAddForm = false;  
    this.toggleUpdateForm = true;
   
  }

  cancelAction() {
    this.toggleAddForm = false;  
    this.toggleUpdateForm = false;
    this.getAllSalesRecords();
  }

  dateFormater(dbDate: string) {
     // let outDate = moment(dbDate).format('DD.MM.YYYY HH:mm');
     let outDate = moment(dbDate).format('DD.MM.YYYY');
     return outDate;
   }

  logout() {
    sessionStorage.removeItem('access');
    this.rt.navigateByUrl('/transport/login');
  }

  getBalance(period: string) {
    this.salesData = null;
    this.toggleAddForm = false;  
    this.toggleUpdateForm = false;
    let reqEndpoint: string = 'https://mandiguide2020.appspot.com/get_total'; 
    if(period === 'day') {
      let reqObject: object = { tb_name: 'sales', period: 'day' };
      let obs = this.ws.postRequest(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { this.balanceData = res },
        err => console.log(err) 
        );
    }if(period === 'week') {
      let reqObject: object = { tb_name: 'sales', period: 'week' };
      let obs = this.ws.postRequest(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { this.balanceData = res },
        err => console.log(err) );
    }if(period === 'month') {
      let reqObject: object = { tb_name: 'sales', period: 'month' };
      let obs = this.ws.postRequest(reqEndpoint, reqObject);
      obs.subscribe( 
        res => { this.balanceData = res },
        err => console.log(err) );
    }if(period === 'year') {
      let reqObject: object = { tb_name: 'sales', period: 'year' };
      let obs = this.ws.postRequest(reqEndpoint, reqObject);
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

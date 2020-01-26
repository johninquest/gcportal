import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent implements OnInit {

  constructor(private dbs: DbService, private rt: Router) { }

  toggleInput: boolean = false;
  start = new FormControl(''); end = new FormControl('');
  firstname = new FormControl(''); lastname = new FormControl('', Validators.required); 
  fee = new FormControl(''); nidn = new FormControl('') // National Id number
  created = moment().format('YYYY-MM-DD HH:mm:ss');
  tableData: any;

  showAllData() { 
    let reqEndpoint: string = 'get_all_rows_in_table';
    let targetTable: string = 'sales';
    let sqlPayload: object = { tb_name: targetTable };
    let obs = this.dbs.getAllRowsInTable(reqEndpoint, sqlPayload);
    obs.subscribe(
      res => {
        // console.log(res); 
        this.tableData = res; 
      },
      err => { console.log(err) }
    );
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

  addData() { 
    let createData: object = {};
    return alert('Under construction');
   }

  updateData() { 
    let updateData: object = {};
    return alert('Under construction');
   }

  deleteData() { 
    let deleteData: object = {};
    return alert('Under construction');
   }

   showInput() { this.toggleInput = true; }

   hideInput() { this.toggleInput = false; }

   dateFormater(dbDate: string) {
     let outDate = moment(dbDate).format('DD.MM.YYYY HH:mm');
     // console.log(outDate);
     return outDate;
   }

   logout() {
    sessionStorage.removeItem('access');
    this.rt.navigateByUrl('/login');
  }

   displayedColumns: string[] = ['route', 'person', 'details'];

  ngOnInit() {
    this.showAllData();
   }

}

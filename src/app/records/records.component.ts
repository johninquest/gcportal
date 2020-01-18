import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';
import moment from 'moment';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent implements OnInit {

  constructor(private dbs: DbService) { }

  toggleInput: boolean = false;
  start = new FormControl(''); end = new FormControl('');
  firstname = new FormControl(''); lastname = new FormControl('', Validators.required); 
  fee = new FormControl(''); nidn = new FormControl('') // National Id number
  created = moment().format('YYYY-MM-DD HH:mm:ss');
  tableData: any;

  showAllData() { 
    // return alert('Under construction');
    let reqEndpoint: string = 'get_all_rows_in_table';
    let targetTable: string = 'ticketsales';
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

  addData() { 
    let createData: object = {};
    return alert('Under construction');
   }

  updateData() { 
    let updateData: object = {};
    return alert('Under construction');
   }

  deleteData() { 
    return alert('Under construction');
   }

   showInput() { this.toggleInput = true; }

   hideInput() { this.toggleInput = false; }

   dateFormater(dbDate: string) {
     // let inDate = moment(dbDate).format('YYYY-MM-DD HH:mm:ss');
     let outDate = moment(dbDate).format('DD.MM.YYYY HH:mm');
     // console.log(outDate);
     return outDate;
   }

   displayedColumns: string[] = ['route', 'person', 'details'];

  ngOnInit() {
    // console.log(this.created);
    this.showAllData();
   }

}

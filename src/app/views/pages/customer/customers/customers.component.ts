// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SystemService } from '../../../../Shared/SystemService';
@Component({
  selector: 'kt-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['userName','firstName','lastName', 'gender', 'contactNumber', 'email', 'dob'];
  dataSource_user = new MatTableDataSource<userTbl>(ELEMENT_DATA_user);
  @ViewChild('mat_pag_user', {read: MatPaginator, static: true}) paginator_user: MatPaginator;
  @ViewChild('mattbl_user', {read: MatSort, static: true}) sort_user: MatSort;
  applyFilter_user(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_user.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, public service: SystemService) { }

  ngOnInit() {
    this.dataSource_user.paginator = this.paginator_user;
    this.dataSource_user.sort = this.sort_user;
    this.loadUser();
  }
  
  loadUser(){
    this.service.Data.ExecuteAPI_Get<any>("User/GetAll").then((data:any) =>
		{
      this.dataSource_user = new MatTableDataSource<any>([]);
      if (data.success)
      {

        ELEMENT_DATA_user.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_user.push(element); });
        this.dataSource_user = new MatTableDataSource<userTbl>(ELEMENT_DATA_user);
        this.dataSource_user.paginator = this.paginator_user;
        this.dataSource_user.sort = this.sort_user;
      }
		});
  }

}

export class userTbl {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  contactNumber: number;
  email: string;
  dob: string;
}
const ELEMENT_DATA_user: userTbl[] = [];
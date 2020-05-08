// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'kt-venders',
  templateUrl: './venders.component.html',
  styleUrls: ['./venders.component.scss']
})
export class VendersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


export class userTbl {
  Id: number;
  DisplayBusinessName: string;
  VenderFullName: string;
  MobileNumber: string;
  Email: string;
  ContactNumber: number;
  PinCode: number;
}
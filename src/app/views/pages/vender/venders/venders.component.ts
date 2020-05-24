// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-venders',
  templateUrl: './venders.component.html',
  styleUrls: ['./venders.component.scss']
})
export class VendersComponent implements OnInit {
  displayedColumns: string[] = ['displayBusinessName','venderFullName','mobileNumber', 'email',  'lastPayDate', 'paymant', 'paymantAmount','actions'];
  dataSource_vender = new MatTableDataSource<venderTbl>(ELEMENT_DATA_vender);
  @ViewChild('mat_pag_vender', {read: MatPaginator, static: true}) paginator_vender: MatPaginator;
  @ViewChild('mattbl_vender', {read: MatSort, static: true}) sort_vender: MatSort;

  editelement(el){
    console.log(el);
    const dialogRef = this.dialog.open(venderPayDialog, {
      width: '500px',
      data: {dialogtext: "Edit this", obj: el}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result != null){
        this.PayVender(result.obj,result.transid);
      }
    });
  }

  applyFilter_vender(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_vender.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog,public service: SystemService) { }

  ngOnInit() {
    this.dataSource_vender.paginator = this.paginator_vender;
    this.dataSource_vender.sort = this.sort_vender;
    this.loadvender();
  }
  loadvender(){
    this.service.Data.ExecuteAPI_Get<any>("Vender/GetAll").then((data:any) =>
		{
      this.dataSource_vender = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_vender.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_vender.push(element); });
        this.dataSource_vender = new MatTableDataSource<venderTbl>(ELEMENT_DATA_vender);
        this.dataSource_vender.paginator = this.paginator_vender;
        this.dataSource_vender.sort = this.sort_vender;
      }
		});
  }
  PayVender(obj,transid){
    
    var sendobj = {
      VenderId: obj.id,
      BankAccount: obj.accountNumber,
      TransactionId: transid,
      Amount:obj.paymantAmount
    }
    console.log("Send--->>");
    console.log(sendobj);
    this.service.Data.ExecuteAPI<any>("Vender/PayInsert",sendobj).then((data:any) =>
    {
      
    console.log("Recive--->>");
    console.log(data);
      if (data.success)
      {
        ELEMENT_DATA_vender.find(x => x.id == obj.id).paymant = 4;
        ELEMENT_DATA_vender.find(x => x.id == obj.id).paymantAmount = 0;
        this.dataSource_vender = new MatTableDataSource<venderTbl>(ELEMENT_DATA_vender);
        this.dataSource_vender.paginator = this.paginator_vender;
        this.dataSource_vender.sort = this.sort_vender;
      }
    });
  }
}


@Component({
  selector: 'venderPayDialog',
  templateUrl: 'venderPayDialog.html',
})
export class  venderPayDialog {

  constructor(
    public dialogRef: MatDialogRef<venderPayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export class venderTbl {
  id: number;
  displayBusinessName: string;
  venderFullName: string;
  mobileNumber: number;
  email: string;
  paymant:number;
  paymantAmount:number;
  lastPayDate:Date;
  accountHolderName:string;
  accountNumber:number;
  ifscCode:number;
  bankName:string;
  branch:string;
  transid:string;
}
const ELEMENT_DATA_vender: venderTbl[] = [
 
];
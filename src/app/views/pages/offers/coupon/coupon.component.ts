// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SystemService } from '../../../../Shared/SystemService';
@Component({
  selector: 'kt-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  
  displayedColumns: string[] = ['coupCode','name','discountType', 'discountAmount', 'startDate', 'endDate', 'action'];
  dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
  @ViewChild('mat_pag_coupon', {read: MatPaginator, static: true}) paginator_coupon: MatPaginator;
  @ViewChild('mattbl_coupon', {read: MatSort, static: true}) sort_coupon: MatSort;

  applyFilter_coupon(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_coupon.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, public service: SystemService) { }

  ngOnInit() {
    this.dataSource_coupon.paginator = this.paginator_coupon;
    this.dataSource_coupon.sort = this.sort_coupon;
    this.loadCoupon();
  }


  openDialog(): void {
    var el=new couponTbl()
    el.DiscountType = true;
    const dialogRef = this.dialog.open(CouponDialog, {
      width: '700px',
      data: {dialogtext: "Add New", minDate:new Date(), obj: el}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result != null){
        this.InsertCity(result.obj);
      }
    });
  }
  editelement(el){
    console.log(el);
    const dialogRef = this.dialog.open(CouponDialog, {
      width: '700px',
      data: {dialogtext: "Edit this", minDate:new Date(), obj: el}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  addNew(event) {
    this.dataSource_coupon.data = event;
  }

  loadCoupon(){
    this.service.Data.ExecuteAPI_Get<any>("Coupon/GetAll").then((data:any) =>
		{
      this.dataSource_coupon = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_coupon.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_coupon.push(element); });
        this.dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
        this.dataSource_coupon.paginator = this.paginator_coupon;
        this.dataSource_coupon.sort = this.sort_coupon;
      }
		});
  }
  InsertCity(obj){
    // var coupon = {
    //   CoupCode
    // }
    this.service.Data.ExecuteAPI<any>("Coupon/Insert/",obj).then((data:any) =>
    {
      if (data.success)
      {
        ELEMENT_DATA_coupon.push(data.data);
        this.dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
        this.dataSource_coupon.paginator = this.paginator_coupon;
        this.dataSource_coupon.sort = this.sort_coupon;
      }
    });
  }

}

@Component({
  selector: 'couponDialog',
  templateUrl: 'couponDialog.html',
})
export class  CouponDialog {

  constructor(
    public dialogRef: MatDialogRef<CouponDialog>,
    @Inject(MAT_DIALOG_DATA) public data: object) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


export class couponTbl {
  adminId: number;
  coupCode: string;
  name: string;
  discountType: boolean;
  discountAmount: number;
  startDate: Date;
  endDate: Date;
  description: string;
}

const ELEMENT_DATA_coupon: couponTbl[] = [
];

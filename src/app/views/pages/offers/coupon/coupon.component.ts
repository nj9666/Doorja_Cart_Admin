// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  
  displayedColumns: string[] = ['CoupCode','Name','DiscountType', 'DiscountAmount', 'StartDate', 'action'];
  dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
  @ViewChild('mat_pag_coupon', {read: MatPaginator, static: true}) paginator_coupon: MatPaginator;
  @ViewChild('mattbl_coupon', {read: MatSort, static: true}) sort_coupon: MatSort;

  applyFilter_coupon(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_coupon.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource_coupon.paginator = this.paginator_coupon;
    this.dataSource_coupon.sort = this.sort_coupon;
  }


  openDialog(): void {
    var el=new couponTbl()
    el.DiscountType = true;
    const dialogRef = this.dialog.open(CouponDialog, {
      width: '600px',
      data: {dialogtext: "Add New", minDate:new Date(), obj: el}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result != null){
        ELEMENT_DATA_coupon.push(result.obj);
        this.addNew(ELEMENT_DATA_coupon);
      }
    });
  }
  editelement(el){
    console.log(el);
    const dialogRef = this.dialog.open(CouponDialog, {
      width: '600px',
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
  AdminId: number;
  CoupCode: string;
  Name: string;
  DiscountType: boolean;
  DiscountAmount: number;
  StartDate: Date;
  Description: string;
}

const ELEMENT_DATA_coupon: couponTbl[] = [
  {AdminId:1, CoupCode: "Falt50", Name: "Flat 50 Discount", DiscountType:true, DiscountAmount:50,  StartDate: new Date(),Description:"qwsdcvbnm,loihtrwertyuj"},
  {AdminId:1, CoupCode: "Falt40", Name: "Flat 40 Discount", DiscountType:true, DiscountAmount:40,  StartDate: new Date(),Description:"qwsdcvbnm,loihtrwertyuj"},
  {AdminId:2, CoupCode: "Falt60", Name: "Flat 60 Discount", DiscountType:false, DiscountAmount:60,  StartDate: new Date(),Description:"qwsdcvbnm,loihtrwertyuj"},
  {AdminId:2, CoupCode: "Falt70", Name: "Flat 70 Discount", DiscountType:true, DiscountAmount:70,  StartDate: new Date(),Description:"qwsdcvbnm,loihtrwertyuj"},
  {AdminId:3, CoupCode: "Falt80", Name: "Flat 80 Discount", DiscountType:false, DiscountAmount:80,  StartDate: new Date(),Description:"qwsdcvbnm,loihtrwertyuj"},
];

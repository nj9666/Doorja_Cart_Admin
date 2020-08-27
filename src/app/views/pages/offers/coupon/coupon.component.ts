// Angular
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SystemService } from '../../../../Shared/SystemService';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'kt-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  displayedColumns: string[] = ['coupCode', 'name', 'discountType', 'discountAmount', 'startDate', 'endDate', 'action'];
  dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
  @ViewChild('mat_pag_coupon', { read: MatPaginator, static: true }) paginator_coupon: MatPaginator;
  @ViewChild('mattbl_coupon', { read: MatSort, static: true }) sort_coupon: MatSort;

  applyFilter_coupon(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_coupon.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog, public service: SystemService, private datePipe: DatePipe) {
    isdataChange = true;
  }

  ngOnInit() {
    this.dataSource_coupon.paginator = this.paginator_coupon;
    this.dataSource_coupon.sort = this.sort_coupon;
    this.loadCoupon();
  }


  openDialog(): void {
    var el = new couponTbl()
    el.discountType = 1;
    const dialogRef = this.dialog.open(CouponDialog, {
      width: '700px',
      data: { dialogtext: "Add New", minDate: new Date(), obj: el, id: -1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      console.log(isdataChange);
      if (isdataChange) {
        this.loadCoupon();
      }

    });
  }
  editelement(el) {
    console.log(el);
    const dialogRef = this.dialog.open(CouponDialog, {
      width: '700px',
      data: { dialogtext: "Edit this", minDate: new Date(), obj: el, id: el.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      console.log(isdataChange);
      if (isdataChange) {
        this.loadCoupon();
      }
    });
  }


  loadCoupon() {
    this.service.Data.ExecuteAPI_Get<any>("Coupon/GetAll").then((data: any) => {
      this.dataSource_coupon = new MatTableDataSource<any>([]);
      if (data.success) {
        ELEMENT_DATA_coupon.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_coupon.push(element); });
        this.dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
        this.dataSource_coupon.paginator = this.paginator_coupon;
        this.dataSource_coupon.sort = this.sort_coupon;
        isdataChange = false;
      }
    });
  }
  InsertCoupon(obj) {
    this.service.Data.ExecuteAPI<any>("Coupon/Insert/", obj).then((data: any) => {
      if (data.success) {
        ELEMENT_DATA_coupon.push(data.data);
        this.dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
        this.dataSource_coupon.paginator = this.paginator_coupon;
        this.dataSource_coupon.sort = this.sort_coupon;
      }
    });
  }
  EditCoupon(obj) {
    console.log(obj);
    obj.endDate = this.datePipe.transform(obj.endDate);
    this.service.Data.ExecuteAPI<any>("Coupon/Edit/" + obj.id, obj).then((data: any) => {
      if (data.success) {
        console.log(data);
        var odlObj = ELEMENT_DATA_coupon.find(x => x.id === obj.id);
        odlObj = data.data;
        this.dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
        this.dataSource_coupon.paginator = this.paginator_coupon;
        this.dataSource_coupon.sort = this.sort_coupon;
      }
    });
  }
  RemoveCoupon(obj) {
    this.service.Data.ExecuteAPI<any>("Coupon/Remove/" + obj.id, null).then((data: any) => {
      if (data.success) {
        console.log(data);
        const index: number = ELEMENT_DATA_coupon.indexOf(ELEMENT_DATA_coupon.find(x => x.id === obj.id));
        if (index !== -1) {
          ELEMENT_DATA_coupon.splice(index, 1);
        }
        this.dataSource_coupon = new MatTableDataSource<couponTbl>(ELEMENT_DATA_coupon);
        this.dataSource_coupon.paginator = this.paginator_coupon;
        this.dataSource_coupon.sort = this.sort_coupon;
      } else {
        this.service.error("somthing want wrong to do this Opration OR This Coupon is connected somewere")
      }
    });
  }

}

@Component({
  selector: 'couponDialog',
  templateUrl: 'couponDialog.html',
})
export class CouponDialog {
  CouponForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public service: SystemService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<CouponDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm(this.data.obj)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  initForm(dt) {
    if (dt.id == -1) {
      this.CouponForm = this.fb.group({
        coupCode: ["", Validators.required],
        name: ["", Validators.required],
        discountType: ["", Validators.required],
        discountAmount: ["", Validators.required],
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
        description: ["", Validators.required],
      });
    } else {
      this.CouponForm = this.fb.group({
        coupCode: [dt.coupCode, Validators.required],
        name: [dt.name, Validators.required],
        discountType: [dt.discountType, Validators.required],
        discountAmount: [dt.discountAmount, Validators.required],
        startDate: [dt.startDate, Validators.required],
        endDate: [dt.endDate, Validators.required],
        description: [dt.description, Validators.required],
      });
    }
  }
  AddCoup() {
    console.log('The dialog was closed------------------------');
    var _coupCode = this.CouponForm.value.coupCode;
    var _name = this.CouponForm.value.name;
    var _discountType = this.CouponForm.value.discountType;
    var _discountAmount = this.datePipe.transform(this.CouponForm.value.discountAmount);
    var _startDate = this.datePipe.transform(this.CouponForm.value.startDate);
    var _endDate = this.CouponForm.value.endDate;
    var _description = this.CouponForm.value.description;

    let Coup = {
      coupCode: _coupCode,
      name: _name,
      discountType: _discountType,
      discountAmount: _discountAmount,
      startDate: _startDate,
      endDate: _endDate,
      description: _description,
    };

    if (this.data.id == -1) {
      this.service.Data.ExecuteAPI<any>("Coupon/Insert/", Coup).then((data: any) => {
        if (data.success) {
          isdataChange = true;
          this.service.success(data.message);
        } else {
          this.service.error(data.message);
        }

        this.dialogRef.close();
      });


    } else {
      this.service.Data.ExecuteAPI<any>("Coupon/Edit/" + this.data.id, Coup).then((data: any) => {
        if (data.success) {
          isdataChange = true;
          this.service.success(data.message);
        } else {
          this.service.error(data.message);
        }

        this.dialogRef.close();
      });
    }
  }

}


export class couponTbl {
  id: number;
  adminId: number;
  coupCode: string;
  name: string;
  discountType: number;
  discountAmount: number;
  startDate: Date;
  endDate: Date;
  description: string;
}

const ELEMENT_DATA_coupon: couponTbl[] = [];
var isdataChange = false;

// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { SystemService } from '../../../../Shared/SystemService';
import { formatDate } from '@angular/common';


@Component({
  selector: 'kt-today-deals',
  templateUrl: './today-deals.component.html',
  styleUrls: ['./today-deals.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TodayDealsComponent implements OnInit {
  displayedColumns: string[] = ['select','vid','cat', 'sku', 'name','currentRating'];
  dataSource_product = new MatTableDataSource<ProductLs>(ELEMENT_DATA_product);
  selection = new SelectionModel<ProductLs>(true, []);
  @ViewChild('mat_pag_product', {read: MatPaginator, static: true}) paginator_product: MatPaginator;
  @ViewChild('mattbl_product', {read: MatSort, static: true}) sort_product: MatSort;

  
  displayedColumns_deal: string[] = ['discountType', 'discountAmount', 'startDate', 'action'];
  dataSource_deal = new MatTableDataSource<PeriodicElement_DEAL>(ELEMENT_DATA_DEAL);
  @ViewChild('mat_pag_deal', {read: MatPaginator, static: true}) paginator_deal: MatPaginator;
  @ViewChild('mattbl_deal', {read: MatSort, static: true}) sort_deal: MatSort;

  applyFilter_product(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_product.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog,public service: SystemService) { }
  
  getselected(){
    console.log(this.selection.selected);
  }
  applyFilter_deal(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_deal.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource_product.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource_product.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductLs): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  openDialog(): void {
    console.log(this.selection.selected);
    const dialogRef = this.dialog.open(DealDialog, {
      width: '600px',
      data: {dialogtext: "Add New", proList: this.selection.selected,minDate:new Date()}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("--------");
      console.log(result);
      if(result){
        this.InsertDeal(result);
      }
    });
  }
  ngOnInit() {
    this.dataSource_product.paginator = this.paginator_product;
    this.dataSource_product.sort = this.sort_product;
    this.dataSource_deal.paginator = this.paginator_deal;
    this.dataSource_deal.sort = this.sort_deal;
    this.loadProduct();
    this.loadDeal();
  }
  InsertDeal(result:any){
    var deal = {
      discountType: result.discountType,
      discountAmount: result.DiscountAmount,
      startDate: result.StartDate,
      proList:result.proList,
    }; 
    console.log(JSON.stringify(deal));

    this.service.Data.ExecuteAPI<any>("Deal/Insert",deal).then((data:any) =>
		{
      console.log(data);
      if (data.success)
      {
        ELEMENT_DATA_DEAL.push(deal);
        this.dataSource_deal = new MatTableDataSource<PeriodicElement_DEAL>(ELEMENT_DATA_DEAL);
        this.dataSource_deal.paginator = this.paginator_deal;
        this.dataSource_deal.sort = this.sort_deal;
        console.log(ELEMENT_DATA_DEAL);
      }
    });
  }
  loadProduct(){
    this.service.Data.ExecuteAPI_Get<any>("Product/GetAll/Fordeal").then((data:any) =>
		{
      this.dataSource_product = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_product.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_product.push(element); });
        this.dataSource_product = new MatTableDataSource<ProductLs>(ELEMENT_DATA_product);
        this.dataSource_product.paginator = this.paginator_product;
        this.dataSource_product.sort = this.sort_product;
      }
		});
  }
  loadDeal(){
    this.service.Data.ExecuteAPI_Get<any>("Deal/GetAll").then((data:any) =>
		{
      this.dataSource_deal = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_DEAL.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_DEAL.push(element); });
        this.dataSource_deal = new MatTableDataSource<PeriodicElement_DEAL>(ELEMENT_DATA_DEAL);
        this.dataSource_deal.paginator = this.paginator_deal;
        this.dataSource_deal.sort = this.sort_deal;
      }
		});
  }
}

@Component({
  selector: 'newDealDialog',
  templateUrl: 'newDealDialog.html',
  styleUrls:['newDealDialog.scss']
})
export class  DealDialog {
  constructor(
    public dialogRef: MatDialogRef<DealDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  remToSelection(el){
    console.log(this.dialogRef);
    console.log(el);
    var proList = this.dialogRef.componentInstance.data.proList;
    const index: number = proList.indexOf(proList.find(x => x.id === el.id));
    if (index !== -1) {
      proList.splice(index, 1);
    }
    console.log(this.dialogRef.componentInstance.data.proList); 
  }

}


export interface ProductLs {
  id: number;
  vid: number;
  sku:string;
  name: string;
  currentRating:number;
  ratingCount:number;
  cat:string;
}

const ELEMENT_DATA_product: ProductLs[] = [];


export interface PeriodicElement_DEAL {
  discountType: number;
  discountAmount: number;
  startDate: Date;
  proList:ProductLs[];
}

const ELEMENT_DATA_DEAL: PeriodicElement_DEAL[] = [];
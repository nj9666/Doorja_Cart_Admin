// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  displayedColumns: string[] = ['select','id','vid', 'name'];
  dataSource_product = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_product);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild('mat_pag_product', {read: MatPaginator, static: true}) paginator_product: MatPaginator;
  @ViewChild('mattbl_product', {read: MatSort, static: true}) sort_product: MatSort;

  
  displayedColumns_deal: string[] = ['name', 'weight', 'symbol', 'position','action'];
  dataSource_deal = new MatTableDataSource<PeriodicElement_DEAL>(ELEMENT_DATA_DEAL);
  @ViewChild('mat_pag_deal', {read: MatPaginator, static: true}) paginator_deal: MatPaginator;
  @ViewChild('mattbl_deal', {read: MatSort, static: true}) sort_deal: MatSort;

  applyFilter_product(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_product.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog) { }
  
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
  checkboxLabel(row?: PeriodicElement): string {
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
      console.log(result);
    });
  }

  ngOnInit() {
    this.dataSource_product.paginator = this.paginator_product;
    this.dataSource_product.sort = this.sort_product;
    this.dataSource_deal.paginator = this.paginator_deal;
    this.dataSource_deal.sort = this.sort_deal;
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

}


export interface PeriodicElement {
  id: number;
  vid: number;
  name: string;
}

const ELEMENT_DATA_product: PeriodicElement[] = [
  {id: 1, vid: 0, name: 'Hydrogen',},
  {id: 2, vid: 0, name: 'Helium',},
  {id: 3, vid: 0, name: 'Lithium',},
  {id: 4, vid: 0, name: 'Beryllium',},
  {id: 5, vid: 1, name: 'Boron',},
  {id: 6, vid: 1, name: 'Carbon',},
  {id: 7, vid: 1, name: 'Nitrogen',},
  {id: 8, vid: 1, name: 'Oxygen',},
  {id: 9, vid: 2, name: 'Fluorine',},
  {id: 10, vid: 2, name: 'Neon',},
  {id: 11, vid: 2, name: 'Sodium',},
  {id: 12, vid: 2, name: 'Magnesium',},
  {id: 13, vid: 3, name: 'Aluminum',},
  {id: 14, vid: 3, name: 'Silicon',},
  {id: 15, vid: 3, name: 'Phosphorus',},
  {id: 16, vid: 3, name: 'Sulfur',},
  {id: 17, vid: 4, name: 'Chlorine',},
  {id: 18, vid: 4, name: 'Argon',},
  {id: 19, vid: 4, name: 'Potassium',},
  {id: 20, vid: 4, name: 'Calcium',},
];



export interface PeriodicElement_DEAL {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: PeriodicElement[];
}

const ELEMENT_DATA_DEAL: PeriodicElement_DEAL[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description:[ 
      {id: 5, vid: 1, name: 'Boron',},
      {id: 6, vid: 1, name: 'Carbon',},
      {id: 7, vid: 1, name: 'Nitrogen',}
    ]
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: [
      {id: 5, vid: 1, name: 'Boron',},
      {id: 6, vid: 1, name: 'Carbon',},
      {id: 7, vid: 1, name: 'Nitrogen',}
    ]
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description:[ 
      {id: 5, vid: 1, name: 'Boron',},
      {id: 6, vid: 1, name: 'Carbon',},
      {id: 7, vid: 1, name: 'Nitrogen',}
    ]
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: [ 
      {id: 5, vid: 1, name: 'Boron',},
      {id: 6, vid: 1, name: 'Carbon',},
      {id: 7, vid: 1, name: 'Nitrogen',}
    ]
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: [ 
      {id: 5, vid: 1, name: 'Boron',},
      {id: 6, vid: 1, name: 'Carbon',},
      {id: 7, vid: 1, name: 'Nitrogen',}
    ]
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: [ 
      {id: 5, vid: 1, name: 'Boron',},
      {id: 6, vid: 1, name: 'Carbon',},
      {id: 7, vid: 1, name: 'Nitrogen',}
    ]
  },
];
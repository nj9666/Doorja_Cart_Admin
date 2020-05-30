// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SystemService } from '../../../Shared/SystemService';

@Component({
  selector: 'kt-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['select','id','pCatId', 'name','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  catname: string;
  pcats: PeriodicElement[];
  pcatid:number;

  constructor( public dialog: MatDialog,public service: SystemService) { }

  openDialog(): void {
    console.log(this.pcats);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {dialogtext: "Add New", catname: this.catname, pcats:this.pcats, pcatid:this.pcatid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  editelement(el){
    console.log(el);
    this.catname = el.name;
    this.pcatid = el.pCatId;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {dialogtext: "Edit this", catname: this.catname, pcats:this.pcats, pcatid:this.pcatid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  getselected(){
    console.log(this.selection.selected.length);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadCats();
    
  }

  loadCats(){
    this.service.Data.ExecuteAPI_Get<any>("Category/GetAll").then((data:any) =>
		{
      this.dataSource = new MatTableDataSource<any>([]);
      if (data.success)
      {
        console.log(data.data);
        ELEMENT_DATA.length = 0;
        data.data.forEach(element => { ELEMENT_DATA.push(element); });
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pcats = ELEMENT_DATA.filter(ispcat);
      console.log(this.pcats);
      }
		});
  }
  

}
function ispcat(element, index, array) { 
  return (element.pCatId == null); 
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class  DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface PeriodicElement {
  id: number;
  pCatId: number;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

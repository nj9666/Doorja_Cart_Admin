// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['select','id','pid', 'name','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  catname: string;
  pcats: PeriodicElement[];
  pcatid:number;

  constructor( public dialog: MatDialog) { }

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
    this.pcatid = el.pid;
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
    this.pcats = ELEMENT_DATA.filter(ispcat)
  }

  

}
function ispcat(element, index, array) { 
  return (element.pid == 0); 
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
  pid: number;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, pid: 0, name: 'Hydrogen',},
  {id: 2, pid: 0, name: 'Helium',},
  {id: 3, pid: 0, name: 'Lithium',},
  {id: 4, pid: 0, name: 'Beryllium',},
  {id: 5, pid: 1, name: 'Boron',},
  {id: 6, pid: 1, name: 'Carbon',},
  {id: 7, pid: 1, name: 'Nitrogen',},
  {id: 8, pid: 1, name: 'Oxygen',},
  {id: 9, pid: 2, name: 'Fluorine',},
  {id: 10, pid: 2, name: 'Neon',},
  {id: 11, pid: 2, name: 'Sodium',},
  {id: 12, pid: 2, name: 'Magnesium',},
  {id: 13, pid: 3, name: 'Aluminum',},
  {id: 14, pid: 3, name: 'Silicon',},
  {id: 15, pid: 3, name: 'Phosphorus',},
  {id: 16, pid: 3, name: 'Sulfur',},
  {id: 17, pid: 4, name: 'Chlorine',},
  {id: 18, pid: 4, name: 'Argon',},
  {id: 19, pid: 4, name: 'Potassium',},
  {id: 20, pid: 4, name: 'Calcium',},
];

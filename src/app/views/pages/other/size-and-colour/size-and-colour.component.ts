import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'kt-size-and-colour',
  templateUrl: './size-and-colour.component.html',
  styleUrls: ['./size-and-colour.component.scss']
})
export class SizeAndColourComponent implements OnInit {
  displayedColumns_Size: string[] = ['id','vid', 'name','actions'];
  dataSource_size = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_size);
  dataSource_colour = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_size);
  @ViewChild('mat_pag_size', {read: MatPaginator, static: true}) paginator_size: MatPaginator;
  @ViewChild('mattbl_size', {read: MatSort, static: true}) sort_size: MatSort;
  @ViewChild('mat_pag_colour', {read: MatPaginator, static: true}) paginator_colour: MatPaginator;
  @ViewChild('mattbl_colour', {read: MatSort, static: true}) sort_colour: MatSort;


  
  constructor(public dialog: MatDialog) { }
  
  openDialog(f:number): void {
    if (f == 1) {
      const dialogRef = this.dialog.open(SizeDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      });   
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      }); 
    }else{
      const dialogRef = this.dialog.open(colourDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      }); 
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
    
  }
  editelement(el,f:number){
    console.log(el);
    if (f == 1) {
      const dialogRef = this.dialog.open(SizeDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }else{
      const dialogRef = this.dialog.open(colourDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
  }

  applyFilter_size(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_size.filter = filterValue.trim().toLowerCase();
  }
  applyFilter_colour(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_colour.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource_size.paginator = this.paginator_size;
    this.dataSource_size.sort = this.sort_size;
    this.dataSource_colour.paginator = this.paginator_colour;
    this.dataSource_colour.sort = this.sort_colour;
  }

}

@Component({
  selector: 'SizeDialog',
  templateUrl: 'SizeDialog.html',
})
export class  SizeDialog {

  constructor(
    public dialogRef: MatDialogRef<SizeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'colourDialog',
  templateUrl: 'colourDialog.html',
})
export class  colourDialog {

  constructor(
    public dialogRef: MatDialogRef<colourDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export interface DialogData {
  catname: string;
  name: string;
}

export interface PeriodicElement {
  id: number;
  vid: number;
  name: string;
}

const ELEMENT_DATA_size: PeriodicElement[] = [
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


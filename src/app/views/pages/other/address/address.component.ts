import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  displayedColumns: string[] = ['name','actions'];
  
  Citys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Citys);
  States = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_States);
  Countrys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Countrys);

  @ViewChild('mat_pag_Citys', {read: MatPaginator, static: true}) paginator_Citys: MatPaginator;
  @ViewChild('mattbl_Citys', {read: MatSort, static: true}) sort_Citys: MatSort;
  @ViewChild('mat_pag_States', {read: MatPaginator, static: true}) paginator_States: MatPaginator;
  @ViewChild('mattbl_States', {read: MatSort, static: true}) sort_States: MatSort;
  @ViewChild('mat_pag_Countrys', {read: MatPaginator, static: true}) paginator_Countrys: MatPaginator;
  @ViewChild('mattbl_Countrys', {read: MatSort, static: true}) sort_Countrys: MatSort;

  constructor(public dialog: MatDialog) { }

  applyFilter_Citys(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Citys.filter = filterValue.trim().toLowerCase();
  }
  applyFilter_States(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.States.filter = filterValue.trim().toLowerCase();
  }
  applyFilter_Countrys(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Countrys.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.Citys.paginator = this.paginator_Citys;
    this.Citys.sort = this.sort_Citys;
    this.States.paginator = this.paginator_States;
    this.States.sort = this.sort_States;
    this.Countrys.paginator = this.paginator_Countrys;
    this.Countrys.sort = this.sort_Countrys;
  }
  openDialog(f:number): void {
    if (f == 1) {
      const dialogRef = this.dialog.open(CitysDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      });   
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      }); 
    }else if (f == 2) {
      const dialogRef = this.dialog.open(StatesDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      });   
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      }); 
    }else{
      const dialogRef = this.dialog.open(CountrysDialog, {
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
      const dialogRef = this.dialog.open(CitysDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }else if(f == 2){
      const dialogRef = this.dialog.open(StatesDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }else{
      const dialogRef = this.dialog.open(CountrysDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
  }

}

@Component({
  selector: 'CitysDialog',
  templateUrl: 'CitysDialog.html',
})
export class  CitysDialog {

  constructor(
    public dialogRef: MatDialogRef<CitysDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'StatesDialog',
  templateUrl: 'StatesDialog.html',
})
export class  StatesDialog {

  constructor(
    public dialogRef: MatDialogRef<StatesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'CountrysDialog',
  templateUrl: 'CountrysDialog.html',
})
export class  CountrysDialog {

  constructor(
    public dialogRef: MatDialogRef<CountrysDialog>,
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
  name: string;
}

const ELEMENT_DATA_Citys: PeriodicElement[] = [
  {id: 1, name: 'C_Hydrogen',},
  {id: 2, name: 'C_Helium',},
  {id: 3, name: 'C_Lithium',},
  {id: 4, name: 'C_Beryllium',},
  {id: 5, name: 'C_Boron',},
  {id: 6, name: 'C_Carbon',},
  {id: 7, name: 'C_Nitrogen',},
  {id: 8, name: 'C_Oxygen',},
  {id: 9, name: 'C_Fluorine',},
  {id: 10, name: 'C_Neon',},
  {id: 11, name: 'C_Sodium',},
  {id: 12, name: 'C_Magnesium',},
  {id: 13, name: 'C_Aluminum',},
  {id: 14, name: 'C_Silicon',},
  {id: 15, name: 'C_Phosphorus',},
  {id: 16, name: 'C_Sulfur',},
  {id: 17, name: 'C_Chlorine',},
  {id: 18, name: 'C_Argon',},
  {id: 19, name: 'C_Potassium',},
  {id: 20, name: 'C_Calcium',},
];
const ELEMENT_DATA_States: PeriodicElement[] = [
  {id: 1, name: 'S_Hydrogen',},
  {id: 2, name: 'S_Helium',},
  {id: 3, name: 'S_Lithium',},
  {id: 4, name: 'S_Beryllium',},
  {id: 5, name: 'S_Boron',},
  {id: 6, name: 'S_Carbon',},
  {id: 7, name: 'S_Nitrogen',},
  {id: 8, name: 'S_Oxygen',},
  {id: 9, name: 'S_Fluorine',},
  {id: 10, name: 'S_Neon',},
  {id: 11, name: 'S_Sodium',},
  {id: 12, name: 'S_Magnesium',},
  {id: 13, name: 'S_Aluminum',},
  {id: 14, name: 'S_Silicon',},
  {id: 15, name: 'S_Phosphorus',},
  {id: 16, name: 'S_Sulfur',},
  {id: 17, name: 'S_Chlorine',},
  {id: 18, name: 'S_Argon',},
  {id: 19, name: 'S_Potassium',},
  {id: 20, name: 'S_Calcium',},
];
const ELEMENT_DATA_Countrys: PeriodicElement[] = [
  {id: 1, name: 'CO_Hydrogen',},
  {id: 2, name: 'CO_Helium',},
  {id: 3, name: 'CO_Lithium',},
  {id: 4, name: 'CO_Beryllium',},
  {id: 5, name: 'CO_Boron',},
  {id: 6, name: 'CO_Carbon',},
  {id: 7, name: 'CO_Nitrogen',},
  {id: 8, name: 'CO_Oxygen',},
  {id: 9, name: 'CO_Fluorine',},
  {id: 10, name: 'CO_Neon',},
  {id: 11, name: 'CO_Sodium',},
  {id: 12, name: 'CO_Magnesium',},
  {id: 13, name: 'CO_Aluminum',},
  {id: 14, name: 'CO_Silicon',},
  {id: 15, name: 'CO_Phosphorus',},
  {id: 16, name: 'CO_Sulfur',},
  {id: 17, name: 'CO_Chlorine',},
  {id: 18, name: 'CO_Argon',},
  {id: 19, name: 'CO_Potassium',},
  {id: 20, name: 'CO_Calcium',},
];
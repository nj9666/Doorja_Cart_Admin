import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SystemService } from '../../../../Shared/SystemService';

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

  constructor(public dialog: MatDialog, public service: SystemService) { }

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
    this.loadCitys();
    this.loadStates();
    this.loadCountrys();
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
        this.InsertCity(result.catname);
      }); 
    }else if (f == 2) {
      const dialogRef = this.dialog.open(StatesDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      });   
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        this.InsertState(result.catname);
      }); 
    }else{
      const dialogRef = this.dialog.open(CountrysDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      }); 
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        this.InsertCountry(result.catname);
      });
    }
    
  }
  editelement(el,f:number){
    console.log(el);
    if (f == 1) {
      const dialogRef = this.dialog.open(CitysDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name, id:el.id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        this.EditCity(result.id,result.catname);
        // if(this.EditCity(result.id,result.catname)){
        //   el.name = result.catname;
        // }

      });
    }else if(f == 2){
      const dialogRef = this.dialog.open(StatesDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name, id:el.id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        this.EditState(result.id,result.catname);
      });
    }else{
      const dialogRef = this.dialog.open(CountrysDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name, id:el.id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        this.EditCountry(result.id,result.catname);
      });
    }
  }

  loadCitys(){
    this.service.Data.ExecuteAPI_Get<any>("City/GetAll").then((data:any) =>
		{
      this.Citys = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_Citys.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_Citys.push(element); });
        this.Citys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Citys);
        this.Citys.paginator = this.paginator_Citys;
        this.Citys.sort = this.sort_Citys;
      }
		});
  }
  loadStates(){
    this.service.Data.ExecuteAPI_Get<any>("State/GetAll").then((data:any) =>
		{
      this.States = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_States.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_States.push(element); });
        this.States = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_States);
        this.States.paginator = this.paginator_States;
        this.States.sort = this.sort_States;
      }
		});
  }
  loadCountrys(){
    this.service.Data.ExecuteAPI_Get<any>("Country/GetAll").then((data:any) =>
		{
      this.Countrys = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_Countrys.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_Countrys.push(element); });
        this.Countrys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Countrys);
        this.Countrys.paginator = this.paginator_Countrys;
        this.Countrys.sort = this.sort_Countrys;
      }
		});
  }
  EditCity(_id:number,_name:string){
      let city = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("City/Edit/"+_id,city).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       ELEMENT_DATA_Citys.find(x => x.id === _id).name = _name;
        this.Citys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Citys);
        this.Citys.paginator = this.paginator_Citys;
        this.Citys.sort = this.sort_Citys;
      }
    });
  }
  EditState(_id:number,_name:string){
      let State = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("State/Edit/"+_id,State).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       ELEMENT_DATA_States.find(x => x.id === _id).name = _name;
       this.States = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_States);
       this.States.paginator = this.paginator_States;
       this.States.sort = this.sort_States;
       
      }
    });
  }
  EditCountry(_id:number,_name:string){
      let Country = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("Country/Edit/"+_id,Country).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       ELEMENT_DATA_Countrys.find(x => x.id === _id).name = _name;
       this.Countrys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Countrys);
       this.Countrys.paginator = this.paginator_Countrys;
       this.Countrys.sort = this.sort_Countrys;
      }
    });
  }
  InsertCity(_name:string){
      let city = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("City/Insert/",city).then((data:any) =>
		{
      console.log(data);
      if (data.success)
      {
       ELEMENT_DATA_Citys.push(data.data);
       this.Citys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Citys);
        this.Citys.paginator = this.paginator_Citys;
        this.Citys.sort = this.sort_Citys;
      }
    });
  }
  InsertState(_name:string){
      let State = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("State/Insert/",State).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       ELEMENT_DATA_States.push(data.data);
       this.States = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_States);
       this.States.paginator = this.paginator_States;
       this.States.sort = this.sort_States;
      }
    });
  }
  InsertCountry(_name:string){
      let Country = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("Country/Insert/",Country).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       ELEMENT_DATA_Countrys.push(data.data);
       this.Countrys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Countrys);
       this.Countrys.paginator = this.paginator_Countrys;
       this.Countrys.sort = this.sort_Countrys;
      }
    });
  }
  RemoveCity(el){
    this.service.Data.ExecuteAPI<any>("City/Remove/"+el.id,null).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       const index: number = ELEMENT_DATA_Citys.indexOf(ELEMENT_DATA_Citys.find(x => x.id === el.id));
      if (index !== -1) {
       ELEMENT_DATA_Citys.splice(index, 1);
      } 
      this.Citys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Citys);
        this.Citys.paginator = this.paginator_Citys;
        this.Citys.sort = this.sort_Citys;
      }
    });
  }
  RemoveState(el){
    this.service.Data.ExecuteAPI<any>("State/Remove/"+el.id,null).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       const index: number = ELEMENT_DATA_States.indexOf(ELEMENT_DATA_States.find(x => x.id === el.id));
      if (index !== -1) {
       ELEMENT_DATA_States.splice(index, 1);
      } 
      this.States = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_States);
      this.States.paginator = this.paginator_States;
      this.States.sort = this.sort_States;
      }
    });
  }
  RemoveCountry(el){
    this.service.Data.ExecuteAPI<any>("Country/Remove/"+el.id,null).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       const index: number = ELEMENT_DATA_Countrys.indexOf(ELEMENT_DATA_Countrys.find(x => x.id === el.id));
      if (index !== -1) {
       ELEMENT_DATA_Countrys.splice(index, 1);
      } 
      this.Countrys = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_Countrys);
      this.Countrys.paginator = this.paginator_Countrys;
      this.Countrys.sort = this.sort_Countrys;
      }
    });
  }
 

}

@Component({
  selector: 'CitysDialog',
  templateUrl: 'CitysDialog.html',
})
export class  CitysDialog {

  constructor(
    public dialogRef: MatDialogRef<CitysDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export class PeriodicElement {
  id: number;
  name: string;
}

export class InputData
{
  isedit : boolean;
  AuthToken : string;
  status : string;
  success : boolean;
  message : string;
  timestamp : Date;
  Data : any;
  id : string;
  ProductId : string;
}
const ELEMENT_DATA_Citys: PeriodicElement[] = [];
const ELEMENT_DATA_States: PeriodicElement[] = [];
const ELEMENT_DATA_Countrys: PeriodicElement[] = [];
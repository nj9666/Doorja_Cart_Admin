import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-size-and-colour',
  templateUrl: './size-and-colour.component.html',
  styleUrls: ['./size-and-colour.component.scss']
})
export class SizeAndColourComponent implements OnInit {
  displayedColumns_Size: string[] = ['id','venderId', 'name','actions'];
  dataSource_size = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_size);
  dataSource_colour = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_colour);
  @ViewChild('mat_pag_size', {read: MatPaginator, static: true}) paginator_size: MatPaginator;
  @ViewChild('mattbl_size', {read: MatSort, static: true}) sort_size: MatSort;
  @ViewChild('mat_pag_colour', {read: MatPaginator, static: true}) paginator_colour: MatPaginator;
  @ViewChild('mattbl_colour', {read: MatSort, static: true}) sort_colour: MatSort;


  
  constructor(public dialog: MatDialog,public service: SystemService) { }
  
  openDialog(f:number): void {
    if (f == 1) {
      const dialogRef = this.dialog.open(SizeDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      });   
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if(result.catname){
          this.InsertSize(result.catname);
        }
      }); 
    }else{
      const dialogRef = this.dialog.open(colourDialog, {
        width: '250px',
        data: {dialogtext: "Add New"}
      }); 
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if(result.catname){
          this.InsertColour(result.catname);
        }
      });
    }
    
  }
  editelement(el,f:number){
    console.log(el);
    if (f == 1) {
      const dialogRef = this.dialog.open(SizeDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name,id:el.id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if(result){
          console.log(result);
          this.EditSize(result.id,result.catname)
        }
      });
    }else{
      const dialogRef = this.dialog.open(colourDialog, {
        width: '250px',
        data: {dialogtext: "Edit this", catname: el.name,id:el.id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if(result){
          console.log(result);
          this.EditColour(result.id,result.catname)
        }
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
    this.loadSize();
    this.loadColour();
  }
  loadSize(){
    this.service.Data.ExecuteAPI_Get<any>("Sizes/GetAll").then((data:any) =>
		{
      this.dataSource_size = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_size.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_size.push(element); });
        this.dataSource_size = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_size);
        this.dataSource_size.paginator = this.paginator_size;
        this.dataSource_size.sort = this.sort_size;
      }
		});
  }
  loadColour(){
    this.service.Data.ExecuteAPI_Get<any>("Colours/GetAll").then((data:any) =>
		{
      this.dataSource_colour = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_colour.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_colour.push(element); });
        this.dataSource_colour = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_colour);
        this.dataSource_colour.paginator = this.paginator_colour;
        this.dataSource_colour.sort = this.sort_colour;
      }
		});
  }
  InsertSize(_name:string){
    let Size = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("Sizes/Insert/",Size).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {
      ELEMENT_DATA_size.push(data.data);
      this.dataSource_size = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_size);
        this.dataSource_size.paginator = this.paginator_size;
        this.dataSource_size.sort = this.sort_size;
      }
    });
  }
  InsertColour(_name:string){
    let Colour = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("Colours/Insert/",Colour).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {
      ELEMENT_DATA_colour.push(data.data);
      this.dataSource_colour = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_colour);
        this.dataSource_colour.paginator = this.paginator_colour;
        this.dataSource_colour.sort = this.sort_colour;
      }
    });
  }
  EditSize(_id:number,_name:string){
    let Size = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("Sizes/Edit/"+_id,Size).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {      
        ELEMENT_DATA_size.find(x => x.id === _id).name = _name;
        this.dataSource_size = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_size);
        this.dataSource_size.paginator = this.paginator_size;
        this.dataSource_size.sort = this.sort_size;
      }
    });
  }
  EditColour(_id:number,_name:string){
    let Colour = {
      name : _name,
    }; 
    this.service.Data.ExecuteAPI<any>("Colours/Edit/"+_id,Colour).then((data:any) =>
    {
      console.log(data);
      if (data.success)
      {
        ELEMENT_DATA_colour.find(x => x.id === _id).name = _name;
        this.dataSource_colour = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_colour);
        this.dataSource_colour.paginator = this.paginator_colour;
        this.dataSource_colour.sort = this.sort_colour;
      }
    });
  }
  RemoveSizes(el){
    this.service.Data.ExecuteAPI<any>("Sizes/Remove/"+el.id,null).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       const index: number = ELEMENT_DATA_size.indexOf(ELEMENT_DATA_size.find(x => x.id === el.id));
      if (index !== -1) {
       ELEMENT_DATA_size.splice(index, 1);
      } 
      this.dataSource_size = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_size);
      this.dataSource_size.paginator = this.paginator_size;
      this.dataSource_size.sort = this.sort_size;
      }
    });
  }
  RemoveColours(el){
    this.service.Data.ExecuteAPI<any>("Colours/Remove/"+el.id,null).then((data:any) =>
		{
      if (data.success)
      {
       console.log(data);
       const index: number = ELEMENT_DATA_colour.indexOf(ELEMENT_DATA_colour.find(x => x.id === el.id));
      if (index !== -1) {
       ELEMENT_DATA_colour.splice(index, 1);
      } 
      this.dataSource_colour = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_colour);
      this.dataSource_colour.paginator = this.paginator_size;
      this.dataSource_colour.sort = this.sort_size;
      }
    });
  }
 

}

@Component({
  selector: 'SizeDialog',
  templateUrl: 'SizeDialog.html',
})
export class  SizeDialog {

  constructor(
    public dialogRef: MatDialogRef<SizeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface PeriodicElement {
  id: number;
  venderId: number;
  name: string;
}

const ELEMENT_DATA_size: PeriodicElement[] = [];
const ELEMENT_DATA_colour: PeriodicElement[] = [];


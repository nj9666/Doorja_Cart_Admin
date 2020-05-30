import { Component, OnInit,  ViewChild, Inject, Output, EventEmitter} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { SystemService } from '../../../../Shared/SystemService';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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


  
  constructor(public dialog: MatDialog,public service: SystemService) { 
    isdataChange = true;
  }
  
  openDialog(f:number): void {
    if (f == 1) {
      const dialogRef = this.dialog.open(SizeDialog, {
        width: '250px',
        data: {dialogtext: "Add New",id:-1}
      });   
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed ++');
        console.log(result);
        console.log(isdataChange);
        if(isdataChange){
          this.loadSize();
        }
      }); 
    }else{
      const dialogRef = this.dialog.open(colourDialog, {
        width: '250px',
        data: {dialogtext: "Add New",id:-1}
      }); 
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        if(isdataChange){
          this.loadColour();
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
        if(isdataChange){
          this.loadSize();
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
        if(isdataChange){
          this.loadColour();
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
        isdataChange = false;
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
        isdataChange = false;
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
  SizeForm:FormGroup;
  constructor(
    public fb: FormBuilder,
    public service: SystemService,
  public dialogRef: MatDialogRef<SizeDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  initForm(dt){
    if(dt.id == -1){
      this.SizeForm = this.fb.group({
        SizeName:["",Validators.required]
      });
    }else{
      this.SizeForm = this.fb.group({
        SizeName:[dt.catname,Validators.required]
      });
    }
    
  }
  
  Addsize(){
      console.log('The dialog was closed------------------------');
      console.log(this.SizeForm.value.SizeName);
      var _name = this.SizeForm.value.SizeName;
      let Size = {
        name : _name,
      }; 
      
      if(this.data.id == -1){
        this.service.Data.ExecuteAPI<any>("Sizes/Insert/",Size).then((data:any) =>
        {
          console.log(data);
          if (data.success)
          {
            isdataChange = true;
            this.service.success(data.message);
          }else{
            this.service.error(data.message);
          }
          
          this.dialogRef.close();
        });
      }else{
        this.service.Data.ExecuteAPI<any>("Sizes/Edit/"+this.data.id,Size).then((data:any) =>
        {
          console.log(data);
          if (data.success)
          {      
            isdataChange = true;
            this.service.success(data.message);
          }else{
            this.service.error(data.message);
          }
          
          this.dialogRef.close();
        });
      }
       
  }



  

}
@Component({
  selector: 'colourDialog',
  templateUrl: 'colourDialog.html',
})
export class  colourDialog {
  ColorForm:FormGroup;
  constructor(
    public fb: FormBuilder,
    public service: SystemService,
    public dialogRef: MatDialogRef<colourDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.initForm(this.data);
    }
    initForm(dt){
      if(dt.id == -1){
        this.ColorForm = this.fb.group({
          ColorName:["",Validators.required]
        });
      }else{
        this.ColorForm = this.fb.group({
          ColorName:[dt.catname,Validators.required]
        });
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  AddColor(){
    console.log('The dialog was closed------------------------');
    console.log(this.ColorForm.value.ColorName);
    var _name = this.ColorForm.value.ColorName;
    let Size = {
      name : _name,
    };
    
    if(this.data.id == -1){
      this.service.Data.ExecuteAPI<any>("Colours/Insert/",Size).then((data:any) =>
      {
        console.log(data);
        if (data.success)
        {
          isdataChange = true;
          this.service.success(data.message);
        }else{
          this.service.error(data.message);
        }
        
        this.dialogRef.close();
      });
    }else{
      this.service.Data.ExecuteAPI<any>("Colours/Edit/"+this.data.id,Size).then((data:any) =>
      {
        console.log(data);
        if (data.success)
        {      
          isdataChange = true;
          this.service.success(data.message);
        }else{
          this.service.error(data.message);
        }
        
        this.dialogRef.close();
      });
    } 

  }

}

export interface PeriodicElement {
  id: number;
  venderId: number;
  name: string;
}

const ELEMENT_DATA_size: PeriodicElement[] = [];
const ELEMENT_DATA_colour: PeriodicElement[] = [];

var isdataChange = false;


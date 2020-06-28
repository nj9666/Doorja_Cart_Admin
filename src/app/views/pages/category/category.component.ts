// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SystemService } from '../../../Shared/SystemService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'kt-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['pCatId', 'name','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  catname: string;
  pcats: PeriodicElement[];
  pcatid:number;

  constructor( public dialog: MatDialog,public service: SystemService) { 
    isdataChange = true;
  }

  openDialog(): void {
    console.log(this.pcats);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {dialogtext: "Add New", catname: this.catname, pcats:this.pcats, pcatid:this.pcatid,id:-1}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      console.log(isdataChange);
        if(isdataChange){
          this.loadCats();
        }
    });
  }
  editelement(el){
    console.log(el);
    this.catname = el.name;
    this.pcatid = el.pCatId;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {dialogtext: "Edit this", catname: this.catname, pcats:this.pcats, pcatid:this.pcatid,id:el.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(isdataChange){
        this.loadCats();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        isdataChange = false;
      console.log(this.pcats);
      }
		});
  }

  RemoveCats(el){
    this.service.Data.ExecuteAPI<any>("Category/Remove/"+el.id,null).then((data:any) =>
		{
      if (data.success)
      {
        this.service.success("item Deleted successfully ")
       console.log(data);
       const index: number = ELEMENT_DATA.indexOf(ELEMENT_DATA.find(x => x.id === el.id));
      if (index !== -1) {
       ELEMENT_DATA.splice(index, 1);
      } 

      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }else{
        this.service.error("somthing want wrong to do this Opration OR This Catagory is connected somewere")
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

  CatForm:FormGroup;
  constructor(
    public fb: FormBuilder,
    public service: SystemService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.initForm(this.data)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  initForm(dt){
    if(dt.id == -1){
      this.CatForm = this.fb.group({
        catname:["",Validators.required],
        pcatid:[""],
      });
    }else{
      this.CatForm = this.fb.group({
        catname:[dt.catname,Validators.required],
        pcatid:[dt.pcatid],
      });
    }
  }
  AddCats(){
    console.log('The dialog was closed------------------------');
    console.log(this.CatForm.value.catname);
    var _name = this.CatForm.value.catname;
    var _pcatid = this.CatForm.value.pcatid;
    let Cats = {
      pCatId : _pcatid,
      name : _name,
    }; 
    
    if(this.data.id == -1){
      this.service.Data.ExecuteAPI<any>("Category/Insert/",Cats).then((data:any) =>
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
      this.service.Data.ExecuteAPI<any>("Category/Edit/"+this.data.id,Cats).then((data:any) =>
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
  pCatId: number;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
var isdataChange = false;
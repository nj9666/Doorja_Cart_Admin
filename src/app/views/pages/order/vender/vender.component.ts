// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {
  displayedColumns: string[] = ['displayBusinessName','venderFullName','totalCount', 'totalAmount'];
  dataSource_by_vender = new MatTableDataSource<by_venderTbl>(ELEMENT_DATA_by_vender);
  @ViewChild('mat_pag_by_vender', {read: MatPaginator, static: true}) paginator_by_vender: MatPaginator;
  @ViewChild('mattbl_by_vender', {read: MatSort, static: true}) sort_by_vender: MatSort;

  applyFilter_by_vender(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_by_vender.filter = filterValue.trim().toLowerCase();
  }
  constructor(public service: SystemService) { }
  ngOnInit() {
    this.dataSource_by_vender.paginator = this.paginator_by_vender;
    this.dataSource_by_vender.sort = this.sort_by_vender;
    this.loadVendors();
  }

  loadVendors(){
    this.service.Data.ExecuteAPI_Get<any>("Order/ByVender/GetAll").then((data:any) =>
		{
      this.dataSource_by_vender = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_by_vender.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_by_vender.push(element); });
        this.dataSource_by_vender = new MatTableDataSource<by_venderTbl>(ELEMENT_DATA_by_vender);
        this.dataSource_by_vender.paginator = this.paginator_by_vender;
        this.dataSource_by_vender.sort = this.sort_by_vender;
      }
		});
  }

}
export class by_venderTbl {
  displayBusinessName: string;
  venderFullName: string;
  totalCount: number;
  totalAmount: number;
}

const ELEMENT_DATA_by_vender: by_venderTbl[] = [ ];
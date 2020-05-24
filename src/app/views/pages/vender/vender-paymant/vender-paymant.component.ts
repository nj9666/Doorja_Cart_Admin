// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import { SystemService } from '../../../../Shared/SystemService';


@Component({
  selector: 'kt-vender-paymant',
  templateUrl: './vender-paymant.component.html',
  styleUrls: ['./vender-paymant.component.scss']
})
export class VenderPaymantComponent implements OnInit {
  displayedColumns: string[] = ['displayBusinessName','venderFullName','bankAccount', 'transid', 'paymantDate', 'paymantAmount'];
  dataSource_vender_paymant = new MatTableDataSource<vender_paymantTbl>(ELEMENT_DATA_vender_paymant);
  @ViewChild('mat_pag_vender_paymant', {read: MatPaginator, static: true}) paginator_vender_paymant: MatPaginator;
  @ViewChild('mattbl_vender_paymant', {read: MatSort, static: true}) sort_vender_paymant: MatSort;

  applyFilter_vender_paymant(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_vender_paymant.filter = filterValue.trim().toLowerCase();
  }
  constructor(public service: SystemService) { }
  ngOnInit() {
    this.dataSource_vender_paymant.paginator = this.paginator_vender_paymant;
    this.dataSource_vender_paymant.sort = this.sort_vender_paymant;
    this.loadVender_p();
  }
  loadVender_p(){
    this.service.Data.ExecuteAPI_Get<any>("Vender/PayGetAll").then((data:any) =>
		{
      this.dataSource_vender_paymant = new MatTableDataSource<any>([]);
      if (data.success)
      {
        ELEMENT_DATA_vender_paymant.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_vender_paymant.push(element); });
        this.dataSource_vender_paymant = new MatTableDataSource<vender_paymantTbl>(ELEMENT_DATA_vender_paymant);
        this.dataSource_vender_paymant.paginator = this.paginator_vender_paymant;
        this.dataSource_vender_paymant.sort = this.sort_vender_paymant;
      }
		});
  }
}

export class vender_paymantTbl {
  id: number;
  displayBusinessName: string;
  venderFullName: string;
  bankAccount: number;
  transid: number;
  paymantAmount: number;
  paymantDate:string;
}

const ELEMENT_DATA_vender_paymant: vender_paymantTbl[] = [];
// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';

@Component({
  selector: 'kt-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {
  displayedColumns: string[] = ['DisplayBusinessName','VenderFullName','TotalCount', 'TotalAmount'];
  dataSource_by_vender = new MatTableDataSource<by_venderTbl>(ELEMENT_DATA_by_vender);
  @ViewChild('mat_pag_by_vender', {read: MatPaginator, static: true}) paginator_by_vender: MatPaginator;
  @ViewChild('mattbl_by_vender', {read: MatSort, static: true}) sort_by_vender: MatSort;

  applyFilter_by_vender(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_by_vender.filter = filterValue.trim().toLowerCase();
  }
  constructor() { }
  ngOnInit() {
    this.dataSource_by_vender.paginator = this.paginator_by_vender;
    this.dataSource_by_vender.sort = this.sort_by_vender;
  }

}
export class by_venderTbl {
  Id: number;
  DisplayBusinessName: string;
  VenderFullName: string;
  TotalCount: number;
  TotalAmount: number;
}

const ELEMENT_DATA_by_vender: by_venderTbl[] = [
  { Id:1, DisplayBusinessName:"Youspan", VenderFullName:"Patsy Corbie", TotalCount:4108, TotalAmount:88463},
  { Id:2, DisplayBusinessName:"Wordify", VenderFullName:"Karine Culleton", TotalCount:2180, TotalAmount:88726},
  { Id:3, DisplayBusinessName:"Dynazzy", VenderFullName:"Adrian Joice", TotalCount:361, TotalAmount:92012},
  { Id:4, DisplayBusinessName:"Flashpoint", VenderFullName:"Locke Camoys", TotalCount:2344, TotalAmount:80700},
  { Id:5, DisplayBusinessName:"Twimm", VenderFullName:"Rachel Tellesson", TotalCount:2838, TotalAmount:81194},
  { Id:6, DisplayBusinessName:"Latz", VenderFullName:"Cole Racine", TotalCount:518, TotalAmount:66772},
  { Id:7, DisplayBusinessName:"Dynazzy", VenderFullName:"Ursa Troy", TotalCount:486, TotalAmount:136},
  { Id:8, DisplayBusinessName:"Flashpoint", VenderFullName:"Xylia Tonn", TotalCount:1380, TotalAmount:12426},
  { Id:9, DisplayBusinessName:"Camimbo", VenderFullName:"Iormina Livingston", TotalCount:4154, TotalAmount:86776},
  { Id:10, DisplayBusinessName:"Agimba", VenderFullName:"Harwilll Geratasch", TotalCount:1348, TotalAmount:65182},
  { Id:11, DisplayBusinessName:"Quatz", VenderFullName:"Elane Eburah", TotalCount:69, TotalAmount:53511},
  { Id:12, DisplayBusinessName:"Realcube", VenderFullName:"Laverne Jowling", TotalCount:976, TotalAmount:13962},
  { Id:13, DisplayBusinessName:"Dynabox", VenderFullName:"Jerrold Cribbott", TotalCount:2715, TotalAmount:79580},
  { Id:14, DisplayBusinessName:"Skyble", VenderFullName:"Stacey Harle", TotalCount:548, TotalAmount:12520},
  { Id:15, DisplayBusinessName:"Feedfish", VenderFullName:"Nefen Jinkins", TotalCount:1419, TotalAmount:54612},
  { Id:16, DisplayBusinessName:"Thoughtmix", VenderFullName:"Vernen Hurrell", TotalCount:3357, TotalAmount:62941},
  { Id:17, DisplayBusinessName:"Fliptune", VenderFullName:"Ram Kringe", TotalCount:3393, TotalAmount:58022},
  { Id:18, DisplayBusinessName:"Agimba", VenderFullName:"Newton Durnell", TotalCount:1843, TotalAmount:18215},
  { Id:19, DisplayBusinessName:"Feedmix", VenderFullName:"Dorisa Girhard", TotalCount:4739, TotalAmount:26860},
  { Id:20, DisplayBusinessName:"Yacero", VenderFullName:"Winnie Liddel", TotalCount:3532, TotalAmount:40539},
];
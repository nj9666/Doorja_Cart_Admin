// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';


@Component({
  selector: 'kt-vender-paymant',
  templateUrl: './vender-paymant.component.html',
  styleUrls: ['./vender-paymant.component.scss']
})
export class VenderPaymantComponent implements OnInit {
  displayedColumns: string[] = ['DisplayBusinessName','VenderFullName','BankAccount', 'NeftId', 'PaymantAmount', 'PaymantDate'];
  dataSource_vender_paymant = new MatTableDataSource<vender_paymantTbl>(ELEMENT_DATA_vender_paymant);
  @ViewChild('mat_pag_vender_paymant', {read: MatPaginator, static: true}) paginator_vender_paymant: MatPaginator;
  @ViewChild('mattbl_vender_paymant', {read: MatSort, static: true}) sort_vender_paymant: MatSort;

  applyFilter_vender_paymant(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_vender_paymant.filter = filterValue.trim().toLowerCase();
  }
  constructor() { }
  ngOnInit() {
    this.dataSource_vender_paymant.paginator = this.paginator_vender_paymant;
    this.dataSource_vender_paymant.sort = this.sort_vender_paymant;
  }

}

export class vender_paymantTbl {
  Id: number;
  DisplayBusinessName: string;
  VenderFullName: string;
  BankAccount: number;
  NeftId: number;
  PaymantAmount: number;
  PaymantDate:string;
}

const ELEMENT_DATA_vender_paymant: vender_paymantTbl[] = [
  {Id:1, DisplayBusinessName:"Topicstorm", VenderFullName:"Forster Currington", BankAccount:138409974, NeftId:52201, PaymantAmount:389149, PaymantDate:"12/12/2019"},
  {Id:2, DisplayBusinessName:"Realcube", VenderFullName:"Mitch Tommis", BankAccount:555410080, NeftId:16301, PaymantAmount:411149, PaymantDate:"12/02/2019"},
  {Id:3, DisplayBusinessName:"Fadeo", VenderFullName:"Eugenie Teacy", BankAccount:584727651, NeftId:67768, PaymantAmount:187619, PaymantDate:"01/08/2020"},
  {Id:4, DisplayBusinessName:"Wikizz", VenderFullName:"Brigham Oakenfull", BankAccount:608929309, NeftId:17632, PaymantAmount:54988, PaymantDate:"03/26/2020"},
  {Id:5, DisplayBusinessName:"Twitterwire", VenderFullName:"Bill Snowding", BankAccount:429067148, NeftId:28581, PaymantAmount:666485, PaymantDate:"12/01/2019"},
  {Id:6, DisplayBusinessName:"Innojam", VenderFullName:"Mae O'Fihillie", BankAccount:321650186, NeftId:66549, PaymantAmount:609435, PaymantDate:"06/15/2019"},
  {Id:7, DisplayBusinessName:"Jayo", VenderFullName:"Missie Truluck", BankAccount:450327126, NeftId:10681, PaymantAmount:381286, PaymantDate:"11/20/2019"},
  {Id:8, DisplayBusinessName:"Katz", VenderFullName:"Tyne Adamov", BankAccount:805488643, NeftId:66016, PaymantAmount:208111, PaymantDate:"03/08/2020"},
  {Id:9, DisplayBusinessName:"Yadel", VenderFullName:"Clarabelle Cristofori", BankAccount:571793912, NeftId:23085, PaymantAmount:400522, PaymantDate:"09/20/2019"},
  {Id:10, DisplayBusinessName:"Flipstorm", VenderFullName:"Courtenay Bluschke", BankAccount:440693203, NeftId:90244, PaymantAmount:341270, PaymantDate:"04/12/2020"},
  {Id:11, DisplayBusinessName:"Wordware", VenderFullName:"Raimondo Whibley", BankAccount:162852455, NeftId:97642, PaymantAmount:945111, PaymantDate:"02/03/2020"},
  {Id:12, DisplayBusinessName:"Skimia", VenderFullName:"Rolph Fosher", BankAccount:471425873, NeftId:15774, PaymantAmount:511386, PaymantDate:"03/26/2020"},
  {Id:13, DisplayBusinessName:"Skipstorm", VenderFullName:"Florance Cleugher", BankAccount:610034703, NeftId:81864, PaymantAmount:116032, PaymantDate:"11/12/2019"},
  {Id:14, DisplayBusinessName:"Jaxworks", VenderFullName:"Beret Paybody", BankAccount:603364666, NeftId:32342, PaymantAmount:140386, PaymantDate:"03/31/2020"},
  {Id:15, DisplayBusinessName:"Oyonder", VenderFullName:"Clive Zuker", BankAccount:524210611, NeftId:71384, PaymantAmount:951979, PaymantDate:"12/16/2019"},
  {Id:16, DisplayBusinessName:"Ailane", VenderFullName:"Giacinta Gomes", BankAccount:533345602, NeftId:89462, PaymantAmount:415528, PaymantDate:"06/05/2019"},
  {Id:17, DisplayBusinessName:"Realbridge", VenderFullName:"Wyatt Skipton", BankAccount:574472274, NeftId:75902, PaymantAmount:998737, PaymantDate:"01/26/2020"},
  {Id:18, DisplayBusinessName:"Skilith", VenderFullName:"Ade Whatham", BankAccount:287812740, NeftId:86112, PaymantAmount:772622, PaymantDate:"03/20/2020"},
  {Id:19, DisplayBusinessName:"Jabberbean", VenderFullName:"Jackquelin Reckless", BankAccount:821268784, NeftId:43824, PaymantAmount:748496, PaymantDate:"11/28/2019"},
  {Id:20, DisplayBusinessName:"Riffpath", VenderFullName:"Zerk Badder", BankAccount:533343273, NeftId:1640, PaymantAmount:709147, PaymantDate:"01/06/2020"},
];
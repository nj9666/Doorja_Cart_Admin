// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'kt-venders',
  templateUrl: './venders.component.html',
  styleUrls: ['./venders.component.scss']
})
export class VendersComponent implements OnInit {
  displayedColumns: string[] = ['DisplayBusinessName','VenderFullName','MobileNumber', 'Email', 'PinCode', 'Paymant', 'PaymantAmount','actions'];
  dataSource_vender = new MatTableDataSource<venderTbl>(ELEMENT_DATA_vender);
  @ViewChild('mat_pag_vender', {read: MatPaginator, static: true}) paginator_vender: MatPaginator;
  @ViewChild('mattbl_vender', {read: MatSort, static: true}) sort_vender: MatSort;

  editelement(el){
    console.log(el);
    const dialogRef = this.dialog.open(venderPayDialog, {
      width: '500px',
      data: {dialogtext: "Edit this", obj: el}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  applyFilter_vender(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_vender.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource_vender.paginator = this.paginator_vender;
    this.dataSource_vender.sort = this.sort_vender;
  }

}


@Component({
  selector: 'venderPayDialog',
  templateUrl: 'venderPayDialog.html',
})
export class  venderPayDialog {

  constructor(
    public dialogRef: MatDialogRef<venderPayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export class venderTbl {
  Id: number;
  DisplayBusinessName: string;
  VenderFullName: string;
  MobileNumber: number;
  Email: string;
  PinCode: number;
  Paymant:number;
  PaymantAmount:number;
}
const ELEMENT_DATA_vender: venderTbl[] = [
  { Id:1, DisplayBusinessName:"Voonyx", VenderFullName:"Tabatha Spratling", MobileNumber:2871131559, Email:"tspratling0@netlog.com", PinCode:771351, Paymant:2, PaymantAmount:12854},
{ Id:2, DisplayBusinessName:"Npath", VenderFullName:"Ilka Arntzen", MobileNumber:5209096001, Email:"iarntzen1@ask.com", PinCode:884106, Paymant:3, PaymantAmount:33842},
{ Id:3, DisplayBusinessName:"Youspan", VenderFullName:"Fabian Olexa", MobileNumber:1837736383, Email:"folexa2@foxnews.com", PinCode:440403, Paymant:1, PaymantAmount:34313},
{ Id:4, DisplayBusinessName:"Eare", VenderFullName:"Artie Rembrant", MobileNumber:2762078869, Email:"arembrant3@jigsy.com", PinCode:187355, Paymant:4, PaymantAmount:2816},
{ Id:5, DisplayBusinessName:"Skiba", VenderFullName:"Aeriel Janko", MobileNumber:2315858329, Email:"ajanko4@oaic.gov.au", PinCode:174610, Paymant:4, PaymantAmount:93289},
{ Id:6, DisplayBusinessName:"Oyope", VenderFullName:"Berk Mayfield", MobileNumber:4115177720, Email:"bmayfield5@nydailynews.com", PinCode:434868, Paymant:1, PaymantAmount:80964},
{ Id:7, DisplayBusinessName:"Wordpedia", VenderFullName:"Olvan Yearnsley", MobileNumber:7084023982, Email:"oyearnsley6@ocn.ne.jp", PinCode:366766, Paymant:1, PaymantAmount:1286},
{ Id:8, DisplayBusinessName:"Trunyx", VenderFullName:"Tann Lark", MobileNumber:3891430764, Email:"tlark7@newyorker.com", PinCode:84721, Paymant:1, PaymantAmount:49266},
{ Id:9, DisplayBusinessName:"Skynoodle", VenderFullName:"Maryl Sandbach", MobileNumber:8601295759, Email:"msandbach8@yellowpages.com", PinCode:725963, Paymant:2, PaymantAmount:43626},
{ Id:10, DisplayBusinessName:"Midel", VenderFullName:"Thaine Pahler", MobileNumber:3317442962, Email:"tpahler9@technorati.com", PinCode:997666, Paymant:2, PaymantAmount:5390},
{ Id:11, DisplayBusinessName:"Mudo", VenderFullName:"Jackie Boulder", MobileNumber:9744744140, Email:"jbouldera@dot.gov", PinCode:438416, Paymant:4, PaymantAmount:82970},
{ Id:12, DisplayBusinessName:"Plajo", VenderFullName:"Homer McConigal", MobileNumber:5395210731, Email:"hmcconigalb@addthis.com", PinCode:523912, Paymant:2, PaymantAmount:52081},
{ Id:13, DisplayBusinessName:"Twitterlist", VenderFullName:"Daryn Dacca", MobileNumber:5836892962, Email:"ddaccac@wikipedia.org", PinCode:644519, Paymant:1, PaymantAmount:75843},
{ Id:14, DisplayBusinessName:"Chatterpoint", VenderFullName:"Gibby Humbee", MobileNumber:7815043899, Email:"ghumbeed@1688.com", PinCode:349927, Paymant:1, PaymantAmount:670},
{ Id:15, DisplayBusinessName:"Zoombeat", VenderFullName:"Patrizia Duckinfield", MobileNumber:6869660805, Email:"pduckinfielde@apple.com", PinCode:644787, Paymant:2, PaymantAmount:5722},
{ Id:16, DisplayBusinessName:"Voolia", VenderFullName:"Belva Abdon", MobileNumber:4419930858, Email:"babdonf@google.ru", PinCode:17437, Paymant:4, PaymantAmount:34628},
{ Id:17, DisplayBusinessName:"Wordpedia", VenderFullName:"Hermia Marion", MobileNumber:3654050168, Email:"hmariong@discuz.net", PinCode:101667, Paymant:1, PaymantAmount:48949},
{ Id:18, DisplayBusinessName:"LiveZ", VenderFullName:"Sherwood Rubinsky", MobileNumber:1741268762, Email:"srubinskyh@hp.com", PinCode:198036, Paymant:1, PaymantAmount:78298},
{ Id:19, DisplayBusinessName:"Twiyo", VenderFullName:"Raquela Tewelson", MobileNumber:9244248000, Email:"rtewelsoni@apache.org", PinCode:829576, Paymant:4, PaymantAmount:98149},
{ Id:20, DisplayBusinessName:"Youopia", VenderFullName:"Tami Cazin", MobileNumber:8952504297, Email:"tcazinj@chicagotribune.com", PinCode:35249, Paymant:2, PaymantAmount:31805},
];
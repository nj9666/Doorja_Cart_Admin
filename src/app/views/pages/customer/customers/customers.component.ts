// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['UserName','FirstName','LastName', 'Gender', 'ContactNumber', 'Email', 'Dob'];
  dataSource_user = new MatTableDataSource<userTbl>(ELEMENT_DATA_user);
  @ViewChild('mat_pag_user', {read: MatPaginator, static: true}) paginator_user: MatPaginator;
  @ViewChild('mattbl_user', {read: MatSort, static: true}) sort_user: MatSort;
  applyFilter_user(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_user.filter = filterValue.trim().toLowerCase();
  }
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource_user.paginator = this.paginator_user;
    this.dataSource_user.sort = this.sort_user;
  }

}

export class userTbl {
  Id: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  Gender: boolean;
  ContactNumber: number;
  Email: string;
  Dob: string;
}
const ELEMENT_DATA_user: userTbl[] = [
  {Id:1, UserName:"tjakobssen0", FirstName:"Tanny", LastName:"Jakobssen", Gender:false, ContactNumber:4021874801, Email:"tjakobssen0@nyu.edu", Dob:"03/13/2020"},
{Id:2, UserName:"rmcvittie1", FirstName:"Rosene", LastName:"McVittie", Gender:true, ContactNumber:1175522180, Email:"rmcvittie1@amazonaws.com", Dob:"01/17/2020"},
{Id:3, UserName:"gblakebrough2", FirstName:"Gabriellia", LastName:"Blakebrough", Gender:true, ContactNumber:5247859214, Email:"gblakebrough2@ucsd.edu", Dob:"12/20/2019"},
{Id:4, UserName:"abeggi3", FirstName:"Alysia", LastName:"Beggi", Gender:false, ContactNumber:5555703099, Email:"abeggi3@twitpic.com", Dob:"01/30/2020"},
{Id:5, UserName:"bgaskal4", FirstName:"Belle", LastName:"Gaskal", Gender:true, ContactNumber:5964805458, Email:"bgaskal4@pcworld.com", Dob:"04/16/2020"},
{Id:6, UserName:"bhymas5", FirstName:"Bobine", LastName:"Hymas", Gender:false, ContactNumber:5997537092, Email:"bhymas5@cyberchimps.com", Dob:"02/25/2020"},
{Id:7, UserName:"elerhinan6", FirstName:"Enid", LastName:"Lerhinan", Gender:false, ContactNumber:5192615655, Email:"elerhinan6@fotki.com", Dob:"02/19/2020"},
{Id:8, UserName:"rgasperi7", FirstName:"Rolf", LastName:"Gasperi", Gender:true, ContactNumber:4993223045, Email:"rgasperi7@dmoz.org", Dob:"07/10/2019"},
{Id:9, UserName:"ahenriques8", FirstName:"Andrej", LastName:"Henriques", Gender:false, ContactNumber:6312223465, Email:"ahenriques8@tiny.cc", Dob:"12/05/2019"},
{Id:10, UserName:"cbirtley9", FirstName:"Chicky", LastName:"Birtley", Gender:false, ContactNumber:2715592862, Email:"cbirtley9@tmall.com", Dob:"10/06/2019"},
{Id:11, UserName:"lcrombleholmea", FirstName:"Lena", LastName:"Crombleholme", Gender:false, ContactNumber:7877782907, Email:"lcrombleholmea@archive.org", Dob:"03/22/2020"},
{Id:12, UserName:"ibroseniusb", FirstName:"Isa", LastName:"Brosenius", Gender:false, ContactNumber:5266427527, Email:"ibroseniusb@vinaora.com", Dob:"03/16/2020"},
{Id:13, UserName:"msamwellc", FirstName:"Minna", LastName:"Samwell", Gender:true, ContactNumber:8412819997, Email:"msamwellc@ezinearticles.com", Dob:"02/13/2020"},
{Id:14, UserName:"smichelled", FirstName:"Salomi", LastName:"Michelle", Gender:false, ContactNumber:1962250151, Email:"smichelled@census.gov", Dob:"01/04/2020"},
{Id:15, UserName:"blinckee", FirstName:"Blanch", LastName:"Lincke", Gender:false, ContactNumber:7147109411, Email:"blinckee@europa.eu", Dob:"05/18/2019"},
{Id:16, UserName:"apetheridgef", FirstName:"Andrei", LastName:"Petheridge", Gender:true, ContactNumber:1591080103, Email:"apetheridgef@list-manage.com", Dob:"09/05/19"},
{Id:17, UserName:"aapplewhaiteg", FirstName:"Aurelea", LastName:"Applewhaite", Gender:false, ContactNumber:1505282760, Email:"aapplewhaiteg@is.gd", Dob:"05/23/2019"},
{Id:18, UserName:"vgileh", FirstName:"Vinny", LastName:"Gile", Gender:true, ContactNumber:5631844854, Email:"vgileh@npr.org", Dob:"01/08/2020"},
{Id:19, UserName:"jnewcomi", FirstName:"Joane", LastName:"Newcom", Gender:false, ContactNumber:1163174924, Email:"jnewcomi@nps.gov", Dob:"07/28/2019"},
];
// Angular
import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { MatSort,MatPaginator,MatTableDataSource} from '@angular/material';
import { SystemService } from '../../../../Shared/SystemService';

@Component({
  selector: 'kt-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['pic','name','sku','price', 'color', 'size', 'totalCount','totalAmount'];
  dataSource_by_product = new MatTableDataSource<by_productTbl>(ELEMENT_DATA_by_product);
  @ViewChild('mat_pag_by_product', {read: MatPaginator, static: true}) paginator_by_product: MatPaginator;
  @ViewChild('mattbl_by_product', {read: MatSort, static: true}) sort_by_product: MatSort;

  filltype:boolean = false;
  applyFilter_by_product(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_by_product.filter = filterValue.trim().toLowerCase();
  }
  constructor( public service: SystemService) { }
  ngOnInit() {
    this.dataSource_by_product.paginator = this.paginator_by_product;
    this.dataSource_by_product.sort = this.sort_by_product;
    this.loadproduct();
  }
  loadproduct(){
    this.service.Data.ExecuteAPI_Get<any>("Order/ByProduct/GetAll").then((data:any) =>
		{
      this.dataSource_by_product = new MatTableDataSource<any>([]);
      if (data.success)
      {
        this.filltype = false; 
        ELEMENT_DATA_by_product.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_by_product.push(element); });
        this.dataSource_by_product = new MatTableDataSource<by_productTbl>(ELEMENT_DATA_by_product);
        this.dataSource_by_product.paginator = this.paginator_by_product;
        this.dataSource_by_product.sort = this.sort_by_product;
      }
		});
  }
  loadnewproduct(){
    this.service.Data.ExecuteAPI_Get<any>("Order/ByProduct/latest").then((data:any) =>
		{
      this.dataSource_by_product = new MatTableDataSource<any>([]);
      if (data.success)
      {
        this.filltype = true;
        ELEMENT_DATA_by_product.length = 0;
        data.data.forEach(element => { ELEMENT_DATA_by_product.push(element); });
        this.dataSource_by_product = new MatTableDataSource<by_productTbl>(ELEMENT_DATA_by_product);
        this.dataSource_by_product.paginator = this.paginator_by_product;
        this.dataSource_by_product.sort = this.sort_by_product;
      }
		});
  }
}
export class by_productTbl {
  id: number;
  pic:string;
  name: string;
  sku: string;
  price: number;
  color: string;
  size: string;
  totalCount: number;
  totalAmount: number;
}

const ELEMENT_DATA_by_product: by_productTbl[] = [
  // { Id:1, Name:"Yata", Sku:"CNY", VenderFullName:"Ulric Vedenyapin", Price:66124, Color:"Khaki", Size:"XS", TotalCount:1211, TotalAmount:26492},
  // { Id:2, Name:"Skynoodle", Sku:"USD", VenderFullName:"Erik Dovidian", Price:83417, Color:"Green", Size:"S", TotalCount:1193, TotalAmount:61709},
  // { Id:3, Name:"Quinu", Sku:"IDR", VenderFullName:"Tanya Follis", Price:51372, Color:"Crimson", Size:"3XL", TotalCount:2278, TotalAmount:79356},
  // { Id:4, Name:"Snaptags", Sku:"NIO", VenderFullName:"Currie Carbine", Price:11285, Color:"Yellow", Size:"XS", TotalCount:99, TotalAmount:18311},
  // { Id:5, Name:"Skyble", Sku:"VEF", VenderFullName:"Seana Skewis", Price:76390, Color:"Crimson", Size:"XL", TotalCount:1966, TotalAmount:24670},
  // { Id:6, Name:"Aivee", Sku:"IDR", VenderFullName:"Kassey Orfeur", Price:60827, Color:"Blue", Size:"M", TotalCount:739, TotalAmount:57318},
  // { Id:7, Name:"Skippad", Sku:"NGN", VenderFullName:"Ely Truesdale", Price:21816, Color:"Crimson", Size:"XS", TotalCount:1242, TotalAmount:15217},
  // { Id:8, Name:"Voonte", Sku:"ZAR", VenderFullName:"Pavia Krammer", Price:44189, Color:"Fuscia", Size:"2XL", TotalCount:285, TotalAmount:16369},
  // { Id:9, Name:"Bluezoom", Sku:"EUR", VenderFullName:"Dorette Dahle", Price:40291, Color:"Yellow", Size:"3XL", TotalCount:136, TotalAmount:63792},
  // { Id:10, Name:"Skaboo", Sku:"CDF", VenderFullName:"Forbes Rofe", Price:69873, Color:"Pink", Size:"L", TotalCount:581, TotalAmount:17523},
  // { Id:11, Name:"Fanoodle", Sku:"JOD", VenderFullName:"Modesta Furber", Price:1180, Color:"Goldenrod", Size:"M", TotalCount:590, TotalAmount:67924},
  // { Id:12, Name:"Realblab", Sku:"IDR", VenderFullName:"Feodor Mattusov", Price:99909, Color:"Khaki", Size:"XL", TotalCount:1071, TotalAmount:24364},
  // { Id:13, Name:"Mydo", Sku:"VEF", VenderFullName:"Floria Rawlings", Price:52034, Color:"Pink", Size:"XL", TotalCount:1926, TotalAmount:65561},
  // { Id:14, Name:"Jabbercube", Sku:"PHP", VenderFullName:"Eugine Duffan", Price:85607, Color:"Purple", Size:"M", TotalCount:2425, TotalAmount:260},
  // { Id:15, Name:"Tazz", Sku:"CNY", VenderFullName:"Brew Sutliff", Price:66728, Color:"Purple", Size:"3XL", TotalCount:1732, TotalAmount:98664},
  // { Id:16, Name:"Izio", Sku:"CNY", VenderFullName:"Heath Dunton", Price:21829, Color:"Yellow", Size:"XL", TotalCount:2225, TotalAmount:31361},
  // { Id:17, Name:"Zazio", Sku:"LYD", VenderFullName:"Nicole Culbard", Price:78893, Color:"Puce", Size:"2XL", TotalCount:306, TotalAmount:29884},
  // { Id:18, Name:"Lazzy", Sku:"CNY", VenderFullName:"Kippar Hulatt", Price:89490, Color:"Pink", Size:"S", TotalCount:1850, TotalAmount:99869},
  // { Id:19, Name:"Mudo", Sku:"SSP", VenderFullName:"Maye Ondrak", Price:34422, Color:"Khaki", Size:"2XL", TotalCount:1769, TotalAmount:35896},
  // { Id:20, Name:"Shufflester", Sku:"RUB", VenderFullName:"Wilie Wasmer", Price:6501, Color:"Khaki", Size:"XS", TotalCount:356, TotalAmount:14378},
  
];
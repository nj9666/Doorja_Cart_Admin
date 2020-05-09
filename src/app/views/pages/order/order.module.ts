import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';


import { OrderComponent } from './order.component';
import { ProductComponent } from './product/product.component';
import { VenderComponent } from './vender/vender.component';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [OrderComponent, ProductComponent, VenderComponent],
  imports: [
	MaterialModule,
	FormsModule, 
	ReactiveFormsModule,
    CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: OrderComponent,
				children: [
					{
						path: 'byporduct',
						component: ProductComponent
					},
					{
						path: 'byvender',
						component: VenderComponent
					},
					
				]
			},
			
		]),
  ]
})
export class OrderModule { }

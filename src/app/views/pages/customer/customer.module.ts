import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CustomerComponent } from './customer.component';
import { CustomersComponent } from './customers/customers.component';



@NgModule({
  declarations: [CustomerComponent, CustomersComponent],
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
			component: CustomerComponent,
			children: [
				{
					path: 'customers',
					component: CustomersComponent
				},
				
			]
		},
		
	]),
  ]
})
export class CustomerModule { }

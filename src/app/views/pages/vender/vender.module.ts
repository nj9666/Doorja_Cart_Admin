import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { VenderComponent } from './vender.component';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { VenderPaymantComponent } from './vender-paymant/vender-paymant.component';
import { VendersComponent,venderPayDialog } from './venders/venders.component';

@NgModule({
  declarations: [VenderPaymantComponent, VenderComponent, VendersComponent,venderPayDialog],
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
			component: VenderComponent,
			children: [
				{
					path: 'venders',
					component: VendersComponent
				},
				{
					path: 'paymant',
					component: VenderPaymantComponent
				},
			]
		},
		
	]),
  ], 
  entryComponents: [venderPayDialog]
})
export class VenderModule { }

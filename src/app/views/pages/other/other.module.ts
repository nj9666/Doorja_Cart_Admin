import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { RouterModule } from '@angular/router';

import { OtherComponent } from './other.component';
import { AddressComponent,CitysDialog,StatesDialog,CountrysDialog } from './address/address.component';
import { SizeAndColourComponent,SizeDialog,colourDialog } from './size-and-colour/size-and-colour.component';



@NgModule({
  declarations: [
	OtherComponent,
	AddressComponent, CitysDialog, StatesDialog, CountrysDialog,
	SizeAndColourComponent, SizeDialog, colourDialog
],
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
			component: OtherComponent,
			children: [
				{
					path: 'sandc',
					component: SizeAndColourComponent
				},
				{
					path: 'addess',
					component: AddressComponent
				},
			]
		},
	]),
  ],
entryComponents: [
	OtherComponent,SizeDialog,colourDialog,
	AddressComponent, CitysDialog, StatesDialog, CountrysDialog,

]

},
)
export class OtherModule { }

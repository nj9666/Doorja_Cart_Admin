import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent, DialogOverviewExampleDialog} from './category.component';

import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';

@NgModule({
  declarations: [CategoryComponent,DialogOverviewExampleDialog],
  imports: [
	MaterialModule,
	CommonModule,
	PartialsModule,
	CoreModule,
	FormsModule,
	ReactiveFormsModule,
	RouterModule.forChild([
		{
			path: '',
			component: CategoryComponent
		},
	]),
  ],
  entryComponents: [CategoryComponent,DialogOverviewExampleDialog]

})
export class CategoryModule { }

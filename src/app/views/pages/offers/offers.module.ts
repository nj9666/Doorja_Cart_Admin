import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';

import { OffersComponent } from './offers.component';
import { CouponComponent,CouponDialog } from './coupon/coupon.component';
import { TodayDealsComponent,DealDialog } from './today-deals/today-deals.component';


import { MaterialModule } from '../../../../material-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import {
	MAT_MOMENT_DATE_FORMATS,
  } from '@angular/material-moment-adapter';
@NgModule({
  declarations: [OffersComponent, CouponComponent, TodayDealsComponent,DealDialog,CouponDialog],
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
			component: OffersComponent,
			children: [
				{
					path: 'deals',
					component: TodayDealsComponent
				},
				{
					path: 'coupons',
					component: CouponComponent
				},
			]
		},
		
	]),
  ],
  providers: [DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  entryComponents: [TodayDealsComponent,DealDialog,CouponDialog]
})
export class OffersModule { }

// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)},

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'category',
				loadChildren: () => import('app/views/pages/category/category.module').then(m => m.CategoryModule)
			},
			{
				path: 'vender',
				loadChildren: () => import('app/views/pages/vender/vender.module').then(m => m.VenderModule)
			},
			{
				path: 'offers',
				loadChildren: () => import('app/views/pages/offers/offers.module').then(m => m.OffersModule)
			},
			{
				path: 'customer',
				loadChildren: () => import('app/views/pages/customer/customer.module').then(m => m.CustomerModule)
			},
			{
				path: 'orders',
				loadChildren: () => import('app/views/pages/order/order.module').then(m => m.OrderModule)
			},
			{
				path: 'other',
				loadChildren: () => import('app/views/pages/other/other.module').then(m => m.OtherModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

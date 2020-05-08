export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Category',
					root: true,
					alignment: 'left',
					page: '/category',
				},
				{
					title: 'Orders',
					root: true,
					alignment: 'left',
					submenu: [
						{
							title: 'By Product',
							page: '/orders/byporduct',
						},
						{
							title: 'By Vender',
							page: '/orders/byvender',
						},
					]
				},
				{
					title: 'Vender',
					root: true,
					alignment: 'left',
					submenu: [
						{
							title: 'Venders',
							page: '/vender/venders',
						},
						{
							title: 'Vender Paymant',
							page: '/vender/paymant',
						},
					]
				},
				{
					title: 'Offers',
					root: true,
					alignment: 'left',
					submenu: [
						{
							title: 'Today\'s deals',
							page: '/offers/deals',
						},
						{
							title: 'Coupons',
							page: '/offers/coupons',
						},
					]
				},
				{
					title: 'Customers',
					root: true,
					alignment: 'left',
					page: '/customer/customers',
					
				},
				{
					title: 'Other',
					root: true,
					alignment: 'left',
					submenu: [
						{
							title: 'Size & Colous',
							page: '/other/sandc',
						},
						{
							title: 'Address config',
							page: '/other/addess',
						},
					]
				},
				
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Layout Builder',
					root: true,
					icon: 'flaticon2-expand',
					page: '/builder'
				},
				{section: 'Components'},
				
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}

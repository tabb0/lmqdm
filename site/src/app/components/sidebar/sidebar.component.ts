import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}
export const ROUTES: RouteInfo[] = [
	// { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
	// { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
	// { path: '/maps', title: 'Maps', icon: 'location_map-big', class: '' },
	// { path: '/notifications', title: 'Notifications', icon: 'ui-1_bell-53', class: '' },

	// { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
	{ path: '/table-list', title: 'Ranking', icon: 'sport_trophy', class: '' },
	{ path: '/matches', title: 'Matches', icon: 'sport_trophy', class: '' },
	// { path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' }
];

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	menuItems: any[];

	constructor() { }

	ngOnInit() {
		this.menuItems = ROUTES.filter(menuItem => menuItem);
	}
	isMobileMenu() {
		if (window.innerWidth > 991) {
			return false;
		}
		return true;
	};
}

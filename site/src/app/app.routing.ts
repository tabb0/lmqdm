import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
	{
		path: 'matches',
		redirectTo: 'matches',
		pathMatch: 'full',
	},
	{
		path: '',
		redirectTo: 'table-list',
		pathMatch: 'full',
	}, 
	{
		path: '',
		component: AdminLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
			}]
	},
	{
		path: '**',
		redirectTo: 'table-list'
	}
];

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	exports: [
	],
})
export class AppRoutingModule { }

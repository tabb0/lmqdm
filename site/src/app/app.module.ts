import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionModule } from "ngx-accordion";

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
@NgModule({
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		ComponentsModule,
		RouterModule,
		AppRoutingModule,
		HttpClientModule,
		NgbModule.forRoot(),
		AccordionModule,
		MatButtonModule, MatCheckboxModule, MatDialogModule
	],
	declarations: [
		AppComponent,
		AdminLayoutComponent,

	],
	providers: [
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

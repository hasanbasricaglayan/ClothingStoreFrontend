import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
  		ProductListComponent,
    DetailProductComponent,
    LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

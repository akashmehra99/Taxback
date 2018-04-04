import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchTransactionsComponent } from './search-transactions/search-transactions.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchTransactionsComponent,
    NewTransactionComponent,
    DetailsTransactionComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

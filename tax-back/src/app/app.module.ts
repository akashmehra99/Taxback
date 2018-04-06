import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchTransactionsComponent } from './search-transactions/search-transactions.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonServiceService } from './common-service.service';
import { HttpModule } from '@angular/http';
import { SuccessFailureComponent } from './success-failure/success-failure.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchTransactionsComponent,
    NewTransactionComponent,
    DetailsTransactionComponent,
    HeaderComponent,
    HomePageComponent,
    SuccessFailureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  providers: [CommonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

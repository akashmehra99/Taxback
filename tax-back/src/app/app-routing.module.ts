import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTransactionsComponent } from './search-transactions/search-transactions.component';
import { DetailsTransactionComponent } from './details-transaction/details-transaction.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SuccessFailureComponent } from './success-failure/success-failure.component';

const routes: Routes = [
  { path: 'home',        component: HomePageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'search', component: SearchTransactionsComponent },
  { path: 'details', component: DetailsTransactionComponent },
  { path: 'new-transaction', component: NewTransactionComponent },
  { path: 'result', component: SuccessFailureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

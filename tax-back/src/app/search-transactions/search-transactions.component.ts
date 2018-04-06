import { CommonServiceService } from './../common-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-transactions',
  templateUrl: './search-transactions.component.html',
  styleUrls: ['./search-transactions.component.css']
})
export class SearchTransactionsComponent implements OnInit {

  emailID: String;
  transactionID = '';
  v_transactionID = true;
  v_emailID = true;
  v_email = true;
  noOfRecords;
  records = [];

  constructor(private commServ: CommonServiceService) { }

  ngOnInit() {
  }

  validateEmail(): void {
    if (this.emailID !== undefined || this.emailID !== '') {
      this.v_emailID = true;
      this.v_email = this.emailValidation(this.emailID);
    } else {
      this.v_emailID = false;
    }
  }

  emailValidation(email): boolean {
    const  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    }
    return true;
  }

  validateTranId(): void {
    if (this.transactionID === '' || this.transactionID === null) {
      this.v_transactionID = false;
    } else {
      this.v_transactionID = true;
    }
  }

  getTransactionDetails(): void {
    const self = this;
    this.validateEmail();
    this.validateTranId();
    if (this.v_email && this.v_emailID && this.v_transactionID) {
      this.commServ.request = this.emailID + '/' + this.transactionID;
      this.commServ.getTransactions().subscribe(
        data => {
          self.setData(data);
        },
        error => {
          console.log(error);
          this.noOfRecords = 0;
        }
      );
    }
  }

  setData(transactions): void {
    this.noOfRecords = transactions.length;
    this.records = [transactions];
  }

  updateError(): void {
    this.noOfRecords = 1;
  }
}


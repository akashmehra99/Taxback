import { CommonServiceService } from './../common-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-transaction',
  templateUrl: './details-transaction.component.html',
  styleUrls: ['./details-transaction.component.css']
})
export class DetailsTransactionComponent implements OnInit {

  emailID: String;
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

  getTransactionDetails(): void {
    const self = this;
    this.validateEmail();
    if (this.v_email && this.v_emailID) {
      this.commServ.request = this.emailID;
      this.commServ.getTransactions().subscribe(
        data => {
          self.setData(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setData(transactions): void {
    this.noOfRecords = transactions.length;
    this.records = transactions;
  }

  updateError(): void {
    this.noOfRecords = 1;
  }
}

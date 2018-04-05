import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonServiceService } from './../common-service.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {

  date: NgbDateStruct;
  transactionID: Number;
  emailID: String;
  amount: Number;
  currency = 'Select Currency';
  v_date = true;
  inv_date = true;
  v_transactionID = true;
  v_emailID = true;
  v_email = true;
  v_amount = true;
  v_currency = true;
  errMsg = 'This field is required.';
  formattedDate: String;
  isFormValid = true;

  constructor(private commServ: CommonServiceService) { }

  ngOnInit() {
  }

  onDateSelection() {
    this.validateFields('date');
  }

  validateFields(param): void {
    if (param === 'transactionID') {
      this.v_transactionID = this.validation(this.transactionID);
    } else if (param === 'emailID') {
      this.v_emailID = this.validation(this.emailID);
      if (this.v_emailID) {
        this.v_email = this.emailValidation(this.emailID);
      }
    } else if (param === 'amount') {
      this.v_amount = this.validation(this.amount);
    } else if (param === 'currency') {
      this.v_currency = this.validation(this.currency);
    } else if (param === 'date') {
      this.v_date = this.validation(this.date);
      if (this.v_date) {
        if (typeof this.date !== 'object') {
          this.inv_date = false;
          this.isFormValid = false;
        } else {
          this.inv_date = true;
          this.isFormValid = true;
          this.formatDate();
        }
      }
    }
  }

  formatDate(): void {
    this.formattedDate = this.date.year + '-' + this.date.month + '-' + this.date.day;
  }

  emailValidation(email): boolean {
    const  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      this.isFormValid = false;
      return false;
    }
    this.isFormValid = true;
    return true;
  }

  validation(value): boolean {
    if (value === undefined || value === null || value === '' || value === 'Select Currency') {
      this.isFormValid = false;
      return false;
    }
    this.isFormValid = true;
    return true;
  }

  getTransactionDetails() {
    const params = ['transactionID', 'emailID', 'amount', 'currency', 'date'];
    for (let x = 0; x < params.length; x++) {
      this.validateFields(params[x]);
      if (!this.isFormValid) {
        return false;
      }
    }
    console.log('Form Valid : ', this.isFormValid);
    const request = [{
      'id': this.transactionID,
      'user': this.emailID,
      'amount': this.amount,
      'currency': this.currency,
      'txn_date':  this.formattedDate
    }];
    this.commServ.request = request;
    this.commServ.createTransaction().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

  }


}

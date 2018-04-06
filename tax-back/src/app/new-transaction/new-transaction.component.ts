import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonServiceService } from './../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {

  date: NgbDateStruct;
  emailID: String;
  disableEmail = false;
  amount: Number;
  currency = 'Select Currency';
  v_date = true;
  inv_date = true;
  v_emailID = true;
  v_email = true;
  v_amount = true;
  v_currency = true;
  errMsg = 'This field is required.';
  formattedDate: String;
  isFormValid = true;

  constructor(private commServ: CommonServiceService, private router: Router) { }

  ngOnInit() {
    if (this.commServ.updateDetails.user !== '' && this.commServ.updateDetails.id !== '' && 
      this.commServ.updateDetails.txn_date !== undefined) {
      this.disableEmail = true;
      this.emailID = this.commServ.updateDetails.user;
      this.amount = Number(this.commServ.updateDetails.amount);
      this.currency = this.commServ.updateDetails.currency;
      this.date = this.getDate(this.commServ.updateDetails.txn_date);
    } else {
        this.disableEmail = false;
        this.emailID = '';
        this.amount = Number();
        this.currency = '';
        this.date = {
          year: Number(),
          month: Number(),
          day: Number()
        };
    }
  }

  getDate(date): NgbDateStruct {
    const d = date.split('-');
    return {
      year: Number(d[0]),
      month: Number(d[1]),
      day: Number(d[2])
    };
  }

  onDateSelection() {
    console.log(this.date);
    this.validateFields('date');
  }

  validateFields(param): void {
    if (param === 'emailID') {
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
    let month = '0', day = '0';
    if (this.date.month < 10) {
      month = month + (this.date.month).toString();
    } else {
      month = (this.date.month).toString();
    }
    if (this.date.day < 10) {
      day = day + (this.date.day).toString();
    } else {
      day = (this.date.day).toString();
    }
    this.formattedDate = this.date.year + '-' + month + '-' + day;
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
    const request = {
      'user': this.emailID,
      'amount': this.amount,
      'currency': this.currency,
      'txn_date':  this.formattedDate
    };
    this.commServ.request = request;
    if (!this.commServ.updateTrans) {
      this.commServ.createTransaction().subscribe(
        data => {
          this.commServ.result = 'Created new transaction with transacion ID: ' + data.id;
          this.commServ.serviceSuccess = true;
          this.router.navigate(['result']);
        },
        error => {
          this.commServ.result = 'Unable to create new transaction. Try again later.';
          this.commServ.serviceSuccess = false;
          this.router.navigate(['result']);
        }
      );
    } else {
      this.commServ.updateTransaction().subscribe(
        data => {
          this.commServ.result = 'Update new transaction with transacion ID: ' + data.id;
          this.commServ.serviceSuccess = true;
          this.commServ.updateTrans = false;
          this.commServ.resetUpdateDetails();
          this.router.navigate(['result']);
        },
        error => {
          this.commServ.result = 'Unable to create new transaction. Try again later.';
          this.commServ.serviceSuccess = false;
          this.router.navigate(['result']);
        }
      );
    }

  }


}

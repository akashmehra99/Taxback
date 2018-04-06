import { Router } from '@angular/router';
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

  constructor(private commServ: CommonServiceService, private router: Router) { }

  ngOnInit() {
    this.commServ.resetUpdateDetails();
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

  deleteTrans(user, id): void {
    this.commServ.request = user + '/' + id;
    this.commServ.deleteTransation().subscribe(
      data => {
        this.commServ.result = 'Transaction Deleted for ' + user + ' with transaction id ' + id;
        this.commServ.serviceSuccess = true;
        this.router.navigate(['result']);
      },
      error => {
        this.commServ.result = 'Could not delete transaction for ' + user + ' with transaction id ' + id;
        this.commServ.serviceSuccess = false;
        this.router.navigate(['result']);
      }
    );
  }

  updateTrans(record): void {
    this.commServ.updateTrans = true;
    this.commServ.updateDetails = record;
    this.router.navigate(['update']);
  }
}
